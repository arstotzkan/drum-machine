

function toggleCheckboxByButton(rhythm_button){
    //we can toggle the checkbox via the neighbouring button
    let rhythm_checkbox = rhythm_button.querySelector("input[type='checkbox']");
    rhythmCheckboxOnClick(rhythm_checkbox);
}

function rhythmCheckboxOnClick(rhythm_checkbox){
    let index = Number(rhythm_checkbox.getAttribute("data-position")); //position in the array where we store which instruements should be playes

    (INSTRUMENT_CONTROLLER.getCurrentInstrument() in instrumentsInButtons[MACHINE.subBeat][index]) //if instrument is already played in the button
    ? instrumentsInButtons[MACHINE.subBeat][index] = instrumentsInButtons[MACHINE.subBeat][index].filter(val => val !== INSTRUMENT_CONTROLLER.getCurrentInstrument()) //remove from instrument list
    : instrumentsInButtons[MACHINE.subBeat][index].push(INSTRUMENT_CONTROLLER.getCurrentInstrument()); //add to instrument list

    (instrumentsInButtons[MACHINE.subBeat][index].length) //if there are any instruments saved in the position 
    ? rhythm_checkbox.setAttribute(`data-checked-${MACHINE.subBeat}`, rhythm_checkbox.checked) //checkbox is ticked
    : rhythm_checkbox.removeAttribute(`data-checked-${MACHINE.subBeat}`); //otherwise it is not

    rhythm_checkbox.checked = (instrumentsInButtons[MACHINE.subBeat][index].length > 0)
}

//DRUM ONLY STUFF FROM NOW ONWARDS

function toggleDrum(){
    //starts drum machine
    MACHINE.hasStarted 
    ? stop_drum()
    : start_drum();

    MACHINE.hasStarted = !MACHINE.hasStarted;
}

function start_drum(){
    circle_lights();
}

function stop_drum(){
    MACHINE.killMachine();

    for (let cb of document.querySelectorAll(".rhythm-checkbox")){
        cb.checked = cb.getAttribute(`data-checked-${MACHINE.subBeat}`); //return buttons to original state
    }
}

function circle_lights(){
    let cbs = document.querySelectorAll(".rhythm-checkbox"); //we get all checkboxes
    toggle_light(0) //we begin from first button 

    function toggle_light(index){

        if (index > 0) //if the circle has not yet ended
            cbs[index-1].checked = cbs[index-1].getAttribute(`data-checked-${MACHINE.subBeat}`) //we leave the previous button on its "normal" state
        else{
            cbs[15].checked = cbs[15].getAttribute(`data-checked-${MACHINE.subBeat}`); //we leave the last button on its "normal" state

            if (MACHINE.basicVariation === "AB"){
                //change variation
                MACHINE.changeSubBeat();

                //set up checkboxes according to the new subbeat
                for (let cb of cbs)
                    cb.checked = cb.getAttribute(`data-checked-${MACHINE.subBeat}`);
            }
    
        }

        for (let sb of document.querySelectorAll(".subbeat"))
            sb.checked = (sb.id === `subbeat-checkbox-${MACHINE.subBeat}`) //subbeat lights
        
        cbs[index].checked = true; //this is the button whose samples we will play

        if (cbs[index].getAttribute(`data-checked-${MACHINE.subBeat}`)){ //if there are instruments that have to be played here
            let promises = [] //here we put the requests for the samples

            for (let instrument of instrumentsInButtons[MACHINE.subBeat][index])
                promises.push(fetch(instrument.path)); //we put a fetch request for each instrument

            Promise.all(promises) //THE FOLLOWING CODE NEEDS *SOME* REFACTORING
                /*we need thens because each part of the code returns promises */
                .then(
                    //we turn the audio files to buffers
                    (data) => {
                        let buffers = [];
                        for (let datum of data)
                            buffers.push(datum.arrayBuffer());
                        return Promise.all(buffers);
                    }
                ).then(
                    //we decode the buffers
                    (buffers) => {
                        let samples = [];
                        for (let buffer of buffers)
                            samples.push(drumAudioContext.decodeAudioData(buffer))
                        return Promise.all(samples);
                    }
                ).then(
                    //we play the sounds
                    (audioSamples) => {
                        const masterGainNode = drumAudioContext.createGain(); //master gain node
                        masterGainNode.gain.value =MACHINE.masterVolume; //we set master volume here

                        let sample_nodes = []

                        for (let audioIndex in audioSamples){

                            let instrument = instrumentsInButtons[MACHINE.subBeat][index][audioIndex] //WIP, we get instrument

                            let audio = audioSamples[audioIndex]; //specific piece
                            let track = drumAudioContext.createBufferSource(); //we create the track that will be played
                            track.buffer = audio;

                            let instrumentGainNode = drumAudioContext.createGain(); //instrument gain mode
                            instrumentGainNode.gain.value = instrument.getVolume(); //we set instrument volume here

                            track.connect(instrumentGainNode) //putting instrument gain mode in front of track
                            instrumentGainNode.connect(masterGainNode); //putting masternode in front of instrument node 
                            sample_nodes.push(track); //push to sample_node
                        }

                        masterGainNode.connect(drumAudioContext.destination); //connect to audio context

                        for (let beat of sample_nodes)
                            beat.start(); //playing every sample node at the same time, WIP
                    }
                )
        }

       MACHINE.toggle_light_timeout = 
       (cbs[index + 1]) //if we have not reached the final button
        ? setTimeout(toggle_light, MACHINE.tempo, index + 1)//we continue to the next one
        : setTimeout(toggle_light, MACHINE.tempo, 0); //we start from the beggining
    }
}

function deep_copy(obj, msg){ //testing shit
    console.log(JSON.parse(JSON.stringify(obj)), msg)
}