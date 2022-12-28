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

const _startingPartsPerBeat = _getPartsPerBeat(2);
const _startingTempo = _calcTempo(10.0, _startingPartsPerBeat);
const _startingMasterVolume = _calcMasterVolume(5);
const _startingBasicVariation = _getBasicVariation(1);
const _startingButtonIndex = 0

const MACHINE = {
    //all values are the default ones
    hasStarted : false, //obvious

    toggle_light_timeout: undefined, //this exists only to be able to kill the MACHINE
    killMachine: function(){ clearTimeout(this.toggle_light_timeout)}, //no need to write anything here

    tempo: _startingTempo,
    setTempo: function(value) { this.tempo =  _calcTempo(value, this.partsPerBeat) },
    tempoToInputValue: function(){return _tempoToInputValue(this.tempo, this.partsPerBeat)},

    partsPerBeat: _startingPartsPerBeat,
    setPartsPerBeat: function(newVal){ this.partsPerBeat = _getPartsPerBeat(newVal)},
    partsPerBeatToInputValue: function(){return _partsPerBeatToInputValue(this.partsPerBeat)},


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
function _calcTempo(value, partsPerBeat){
    return 1000 / ( value * 16 / (6 * partsPerBeat)  )
}

function _getPartsPerBeat(inputVal){
    let map = [8,4,6,3] //[3,6,4,8];
    return map[inputVal];
}

function _tempoToInputValue(tempo, partsPerBeat){
    return (1000 * 6 * partsPerBeat) / (tempo * 16)
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

function _partsPerBeatToInputValue(value){
    switch(value){
        case 3:
            return 3;
        case 6:
            return 2;       
        case 4:
            return 1;
        case 8:
            return 0;  
    }
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