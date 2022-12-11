let toggle_light_timeout;

function toggleCheckbox(rhythm_button){
    let rhythm_checkbox = rhythm_button.querySelector("input[type='checkbox']");
    rhythmCheckboxOnClick(rhythm_checkbox);
}

function rhythmCheckboxOnClick(rhythm_checkbox){
    rhythm_checkbox.checked = !rhythm_checkbox.checked;
    
    (rhythm_checkbox.checked)
    ? rhythm_checkbox.setAttribute("data-checked", rhythm_checkbox.checked)
    : rhythm_checkbox.removeAttribute("data-checked");

    (rhythm_checkbox.checked)
    ? rhythm_checkbox.setAttribute("selected-instrument", getInstrument())
    : rhythm_checkbox.removeAttribute("selected-instrument");
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
        cb.checked = cb.getAttribute("data-checked");
    }
}

function button_lights(){
    let cbs = document.querySelectorAll(".rhythm-checkbox");
    toggle_light(0)

    function toggle_light(index){
        let tempo =  1000 - ( 90 * Number(document.getElementById("tempo1").value));

        (index > 0)
        ? cbs[index-1].checked = cbs[index-1].getAttribute("data-checked")
        : cbs[15].checked = cbs[15].getAttribute("data-checked");
        
        cbs[index].checked = true; //for lights

        if (cbs[index].getAttribute("data-checked")){

            let selected_instrument = cbs[index].getAttribute("selected-instrument")
            console.log(getAudioPath(selected_instrument))
            let audio = new Audio(getAudioPath(selected_instrument));
            audio.play();
        }

        (cbs[index + 1])
        ? toggle_light_timeout = setTimeout(toggle_light, tempo, index + 1)//NEED TO PUT TEMPO INTO ACCOUNT HERE
        : toggle_light_timeout = setTimeout(toggle_light, tempo, 0);
    }
}