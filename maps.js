let valsToInstruments = [
    "AC",
    "BD",
    "SD",
    "LT",
    "MT",
    "HT",
    "RS",
    "CP",
    "CB",
    "CY",
    "OH",
    "CH"
]

let instrumentsToPaths = {
    "AC": "",
    "BD": "TR808WAV/BD/BD1000.WAV",
    "SD": "TR808WAV/SD/SD1000.WAV",
    "LT": "TR808WAV/LT/LT10.WAV",
    "MT": "TR808WAV/MT/MT10.WAV",
    "HT": "TR808WAV/HT/HT10.WAV",
    "RS": "TR808WAV/RS/RS.WAV",
    "CP": "TR808WAV/CP/CP.WAV",
    "CB": "TR808WAV/CB/CB.WAV",
    "CY": "TR808WAV/CY/CY1000.WAV",
    "OH": "TR808WAV/OH/OH10.WAV",
    "CH": "TR808WAV/CH/CH.WAV",
    //MA, MC, LC, HC, CL UNUSED AS OF NOW
    "MA": "TR808WAV/MA/MA.WAV",
    "LC": "TR808WAV/LC/LC10.WAV",
    "MC": "TR808WAV/MC/MC10.WAV",
    "HC": "TR808WAV/HC/HC10.WAV",
    "CL": "TR808WAV/CL/CL.WAV",
}

function getInstrument(){
    let inputVal = document.getElementById("instrument-select").value;
    return valsToInstruments[inputVal];
}

function getAudioPath(instrument){
    return instrumentsToPaths[instrument]
}

function getVolume(){
    return (document.getElementById("master-volume").value / 10)
}

function getTempo(){
    return 1000 - ( 90 * Number(document.getElementById("tempo1").value));
}

function getBasicVariation(){
    let values = ["A", "AB", "B"];
    let key = Number(document.getElementById("variation-input").value) - 1;
    return values[key];
}

function getStartingSubBeat(basic_var){
    return (basic_var === "B")
    ? "B"
    : "A"
}

function getOtherSubBeat(sb){
    return (sb === "A")
    ? "B"
    : "A"
}