function rhythmCheckboxesOnInstrumentChange(newInstrumentValue){
    for (let cb of document.querySelectorAll(".rhythm-checkbox")){
        let position = cb.getAttribute("data-position")
                
        cb.checked = (instrumentsInButtons[MACHINE.subBeat][position].includes(Number(newInstrumentValue)));
    }
}

function drumMachineReset(){
    for (let attr in instrumentsInButtons){
        for (let inst in instrumentsInButtons[attr]){
            instrumentsInButtons[attr][inst] = [];
        }
    }

    INSTRUMENT_CONTROLLER.currentInstrumentIndex = 1;
    MACHINE.reset();
    INSTRUMENT_CONTROLLER.reset();
}

function deep_copy(obj, msg){ //testing shit
    console.log(JSON.parse(JSON.stringify(obj)), msg)
}