let toggle_light_timeout;
let subBeat;

function toggleCheckbox(rhythm_button){
    let rhythm_checkbox = rhythm_button.querySelector("input[type='checkbox']");
    rhythmCheckboxOnClick(rhythm_checkbox);
}

function rhythmCheckboxOnClick(rhythm_checkbox){
    let index = Number(rhythm_checkbox.getAttribute("data-position")) - 1;

    (getInstrument() in instrumentsInButtons[subBeat][index])
    ? instrumentsInButtons[subBeat][index] = instrumentsInButtons[subBeat][index].filter(val => val !== getInstrument())
    : instrumentsInButtons[subBeat][index].push(getInstrument());

    (instrumentsInButtons[subBeat][index].length)
    ? rhythm_checkbox.setAttribute(`data-checked-${subBeat}`, rhythm_checkbox.checked)
    : rhythm_checkbox.removeAttribute(`data-checked-${subBeat}`);

    rhythm_checkbox.checked = (instrumentsInButtons[subBeat][index].length > 0)
}

function toggleDrum(){
    hasStarted
    ? stop_drum()
    : start_drum();

    hasStarted = !hasStarted;
}


function start_drum(){
    button_lights();
}

function stop_drum(){
    clearTimeout(toggle_light_timeout);

    for (let cb of document.querySelectorAll(".rhythm-checkbox")){
        cb.checked = cb.getAttribute(`data-checked-${subBeat}`);
    }
}

function button_lights(){
    let cbs = document.querySelectorAll(".rhythm-checkbox");
    subBeat = getStartingSubBeat(getBasicVariation());
    toggle_light(0)

    function toggle_light(index){
        let tempo = getTempo();

        if (index > 0)
            cbs[index-1].checked = cbs[index-1].getAttribute(`data-checked-${subBeat}`)
        else{
            cbs[15].checked = cbs[15].getAttribute(`data-checked-${subBeat}`);

            if (getBasicVariation() === "AB"){
                subBeat = getOtherSubBeat(subBeat);

                for (let cb of cbs)
                    cb.checked = cb.getAttribute(`data-checked-${subBeat}`);
            }

            else{
                subBeat = getBasicVariation();
            }
                
        }

        for (let sb of document.querySelectorAll(".subbeat"))
            sb.checked = (sb.id === `subbeat-checkbox-${subBeat}`) //to show correct subbeat
        
        cbs[index].checked = true; //for lights

        if (cbs[index].getAttribute(`data-checked-${subBeat}`)){

            let promises = []
            for (let instrument of instrumentsInButtons[subBeat][index])
                promises.push(fetch(getAudioPath(instrument)));

            Promise.all(promises) //THE FOLLOWING CODE NEEDS *SOME* REFACTORING
                .then(
                    (data) => {
                        let buffers = [];
                        for (let datum of data){
                            
                            buffers.push(datum.arrayBuffer());
                        }
                            
                        return Promise.all(buffers);
                    }
                ).then(
                    (buffers) => {
                        let samples = [];
                        for (let buffer of buffers){
                            samples.push(drumAudioContext.decodeAudioData(buffer))
                        }
                        return Promise.all(samples);
                    }
                ).then(
                    (audioSamples) => {
                        const masterGainNode = drumAudioContext.createGain();
                        masterGainNode.gain.value = getVolume();        

                        let sample_nodes = []

                        for (let audioIndex in audioSamples){

                            let instrument = instrumentsInButtons[subBeat][index][audioIndex]

                            let audio = audioSamples[audioIndex];

                            let track = drumAudioContext.createBufferSource();
                            track.buffer = audio;

                            let instrumentGainNode = drumAudioContext.createGain();
                            instrumentGainNode.gain.value = getInstrumentVolume(instrument);

                            track.connect(instrumentGainNode)
                            instrumentGainNode.connect(masterGainNode);
                            sample_nodes.push(track);
                        }

                        masterGainNode.connect(drumAudioContext.destination);

                        for (let beat of sample_nodes){
                            console.log(beat)
                            beat.start();
                        }
                            
                    }
                )
        }

        (cbs[index + 1])
        ? toggle_light_timeout = setTimeout(toggle_light, tempo, index + 1)//NEED TO PUT TEMPO INTO ACCOUNT HERE
        : toggle_light_timeout = setTimeout(toggle_light, tempo, 0);
    }
}


function deep_copy(obj, msg){
    console.log(JSON.parse(JSON.stringify(obj)), msg)
}