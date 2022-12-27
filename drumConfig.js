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

const _startingTempo = _calcTempo(10);
const _startingMasterVolume = _calcMasterVolume(5);
const _startingBasicVariation = _getBasicVariation(1);
const _startingButtonIndex = 0

const MACHINE = {
    //all values are the default ones
    hasStarted : false, //obvious

    toggle_light_timeout: undefined, //this exists only to be able to kill the MACHINE
    killMachine: function(){ clearTimeout(this.toggle_light_timeout)}, //no need to write anything here

    tempo: _startingTempo,
    setTempo: function(value) { this.tempo =  _calcTempo(value) },
    tempoToInputValue: function(){return _tempoToInputValue(this.tempo)},

    masterVolume: _startingMasterVolume,
    setMasterVolume: function(value) {this.masterVolume = _calcMasterVolume(value)},
    masterVolumeToInputValue: function(){return _masterVolumeToInputValue(this.masterVolume)},

    basicVariation: _startingBasicVariation,
    setBasicVariation: function(value) {this.basicVariation = _getBasicVariation(value)},
    basicVariationToInputValue: function(){return _basicVariationToInputValue(this.basicVariation)},

    subBeat: _startingBasicVariation,
    changeSubBeat: function() {this.subBeat = _getOtherSubBeat(this.subBeat) }, 
    currentButtonIndex : _startingButtonIndex,

    reset: function(){
        this.hasStarted = false
        this.toggle_light_timeout = undefined
        this.tempo = _startingTempo
        this.masterVolume = _startingMasterVolume
        this.basicVariation = _startingBasicVariation
        this.subBeat = _startingBasicVariation
        this.currentButtonIndex = _startingButtonIndex
    }
} 

//PRIVATE FUNCTIONS, THEY HELP US CALCULATE STUFF
function _calcTempo(value){
    return 1000 - ( 90 * value);
}

function _tempoToInputValue(tempo){
    return (1000 - tempo ) / 90
}

function _calcMasterVolume(value){
    return value / 10;
}

function _masterVolumeToInputValue(value){
    return value * 10;
}

function _getBasicVariation(value){
    return ["A", "AB", "B"][value - 1];
}

function _basicVariationToInputValue(value){
    switch(value){
        case "A":
            return 0;
        case "AB":
            return 1;
        case "B":
            return 2;
    }
}

function _getOtherSubBeat(currentSubBeat){
    return (currentSubBeat === "A")
    ? "B"
    : "A"
}