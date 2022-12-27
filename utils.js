function rhythmCheckboxesOnInstrumentChange(newInstrumentValue){
    for (let cb of document.querySelectorAll(".rhythm-checkbox")){
        let position = cb.getAttribute("data-position")
        cb.checked = (instrumentsInButtons[MACHINE.subBeat][position].includes(newInstrumentValue));
    }
}