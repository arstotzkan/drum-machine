let toggle_light_timeout;
let subBeat;

function toggleCheckbox(rhythm_button){
    let rhythm_checkbox = rhythm_button.querySelector("input[type='checkbox']");
    rhythmCheckboxOnClick(rhythm_checkbox);
}

function rhythmCheckboxOnClick(rhythm_checkbox){
    rhythm_checkbox.checked = !rhythm_checkbox.checked;
    
    (rhythm_checkbox.checked)
    ? rhythm_checkbox.setAttribute(`data-checked-${subBeat}`, rhythm_checkbox.checked)
    : rhythm_checkbox.removeAttribute(`data-checked-${subBeat}`);

    (rhythm_checkbox.checked)
    ? rhythm_checkbox.setAttribute(`selected-instrument-${subBeat}`, getInstrument())
    : rhythm_checkbox.removeAttribute(`selected-instrument-${subBeat}`);
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
        console.log("VAS", subBeat);

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

            let selected_instrument = cbs[index].getAttribute(`selected-instrument-${subBeat}`);

            let audio = new Audio(getAudioPath(selected_instrument));
            audio.volume = getVolume();
            audio.play();
        }

        (cbs[index + 1])
        ? toggle_light_timeout = setTimeout(toggle_light, tempo, index + 1)//NEED TO PUT TEMPO INTO ACCOUNT HERE
        : toggle_light_timeout = setTimeout(toggle_light, tempo, 0);
    }
}