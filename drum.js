

function toggleCheckboxByButton(rhythm_button){
    //we can toggle the checkbox via the neighbouring button
    let rhythm_checkbox = rhythm_button.querySelector("input[type='checkbox']");
    rhythmCheckboxOnClick(rhythm_checkbox);
}

function rhythmCheckboxOnClick(rhythm_checkbox){
    let index = Number(rhythm_checkbox.getAttribute("data-position")); //position in the array where we store which instruements should be playes

    (instrumentsInButtons[MACHINE.subBeat][index].includes(INSTRUMENT_CONTROLLER.currentInstrumentIndex)) //if instrument is already played in the button
    ? instrumentsInButtons[MACHINE.subBeat][index] = instrumentsInButtons[MACHINE.subBeat][index].filter(val => val !== INSTRUMENT_CONTROLLER.currentInstrumentIndex) //remove from instrument list
    : instrumentsInButtons[MACHINE.subBeat][index].push(INSTRUMENT_CONTROLLER.currentInstrumentIndex); //add to instrument list

    rhythm_checkbox.checked = (instrumentsInButtons[MACHINE.subBeat][index].includes(INSTRUMENT_CONTROLLER.currentInstrumentIndex))
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
        cb.checked = false; //return buttons to original state
    }
}

function reset(){
    stop_drum()
    drumMachineReset()
}

function circle_lights(){
    let cbs = document.querySelectorAll(".rhythm-checkbox"); //we get all checkboxes
    toggle_light(0) //we begin from first button 

    function toggle_light(index){
        MACHINE.currentButtonIndex = index;

        if (index > 0) //if the circle has not yet ended
            cbs[index-1].checked = (instrumentsInButtons[MACHINE.subBeat][index - 1].includes(INSTRUMENT_CONTROLLER.currentInstrumentIndex)) //we leave the previous button on its "normal" state
        else{
            cbs[15].checked = (instrumentsInButtons[MACHINE.subBeat][15].includes(INSTRUMENT_CONTROLLER.currentInstrumentIndex)); //we leave the last button on its "normal" state

            if (MACHINE.basicVariation === "AB"){
                //change variation
                MACHINE.changeSubBeat();

                //set up checkboxes according to the new subbeat
                for (let cb of cbs)
                    cb.checked = (instrumentsInButtons[MACHINE.subBeat][index].includes(INSTRUMENT_CONTROLLER.currentInstrumentIndex))
            }
        }

        for (let sb of document.querySelectorAll(".subbeat"))
            sb.checked = (sb.id === `subbeat-checkbox-${MACHINE.subBeat}`) //subbeat lights
        
        cbs[index].checked = !(cbs[index].checked); //this is the button whose samples we will play

        if (instrumentsInButtons[MACHINE.subBeat][index].length) //if there are instruments that have to be played here
            playButtonSound(index);

       MACHINE.toggle_light_timeout = 
       (cbs[index + 1]) //if we have not reached the final button
        ? setTimeout(toggle_light, MACHINE.tempo, index + 1)//we continue to the next one
        : setTimeout(toggle_light, MACHINE.tempo, 0); //we start from the beggining
    }
}

function playButtonSound(index){
    let promises = [] //here we put the requests for the samples

    for (let instrumentIndex of instrumentsInButtons[MACHINE.subBeat][index]){
        let correspondingInstrument = INSTRUMENT_CONTROLLER.getInstrumentFromIndex(instrumentIndex)
        promises.push(fetch(correspondingInstrument.getPath())); //we put a fetch request for each instrument
    }
        

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

                    let instrumentIndex = instrumentsInButtons[MACHINE.subBeat][index][audioIndex] //WIP, we get instrument
                    let instrument = INSTRUMENT_CONTROLLER.getInstrumentFromIndex(instrumentIndex);

                    let audio = audioSamples[audioIndex]; //specific piece
                    let track = drumAudioContext.createBufferSource(); //we create the track that will be played
                    track.buffer = audio;

                    let instrumentGainNode = drumAudioContext.createGain(); //instrument gain mode
                    
                    // if (instrument.getTone){
                    //     track.playbackRate.value = instrument.getTone();
                    // }

                    // if(instrument.getDecay){
                    //     track.detune.value = instrument.getDecay();
                    // }

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
