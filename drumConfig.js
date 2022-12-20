const instrumentsInButtons = {
    "A" : [[],[],[],[],
    [],[],[],[],
    [],[],[],[],
    [],[],[],[]],

    "B" : [[],[],[],[],
    [],[],[],[],
    [],[],[],[],
    [],[],[],[]]
} //PRIMITIVE WAY I KNOW, WIP

const MACHINE = {
    hasStarted : false, //obvious

    toggle_light_timeout: undefined, //this exists only to be able to kill the MACHINE
    killMachine: function(){ clearTimeout(this.toggle_light_timeout)}, //no need to write anything here

    tempo: 910,
    setTempo: function(value) { this.tempo =  _calcTempo(value) },

    masterVolume: 0.5,
    setMasterVolume: function(value) {this.masterVolume = _calcMasterVolume(value)},

    basicVariation: "A",
    setBasicVariation: function(value) {this.basicVariation = _getBasicVariation(value)},

    subBeat: "A",
    changeSubBeat: function() {this.subBeat = _getOtherSubBeat(this.subBeat) }
} 

//PRIVATE FUNCTIONS, THEY HELP US CALCULATE STUFF
function _calcTempo(value){
    return 1000 - ( 90 * value);
}

function _calcMasterVolume(value){
    return value / 10;
}

function _getBasicVariation(value){
    return ["A", "AB", "B"][value - 1];
}

function _getOtherSubBeat(currentSubBeat){
    return (currentSubBeat === "A")
    ? "B"
    : "A"
}