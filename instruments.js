const _startingInstrumentIndex = 1

const INSTRUMENT_CONTROLLER = {
    /*An array of all possible instruments, and a way to store all relevant Data */
    instruments : [
        {
            name: "AC",
            volumeControlID: "AC-level",
            pitchControlID: "AC-pitch",
            getVolume: function(){ return _getInstrumentVolume(this.volumeControlID); },
            getPitch: function(){ return _getInstrumentPitch(this.pitchControlID); },
            getPath: function(){return ""}
        },
        {
            name: "BD",
            volumeControlID: "BD-level",
            pitchControlID: "BD-pitch",
            toneControlID: "BD-tone",
            decayControlID: "BD-decay",
            getVolume: function(){ return _getInstrumentVolume(this.volumeControlID);},
            getPitch: function(){ return _getInstrumentPitch(this.pitchControlID); },
            getTone: function(){ return _getAudioParameterValue(this.toneControlID);},
            getDecay: function(){ return _getAudioParameterValue(this.decayControlID); },
            getPath: function(){return _getSamplePath(this.name, this.getTone(), this.getDecay())}
        },
        {
            name: "SD",
            volumeControlID: "SD-level",
            pitchControlID: "SD-pitch",
            toneControlID: "SD-tone",
            snappyControlID: "SD-snappy",
            getVolume: function(){ return _getInstrumentVolume(this.volumeControlID);},
            getPitch: function(){ return _getInstrumentPitch(this.pitchControlID); },
            getTone: function(){ return _getAudioParameterValue(this.toneControlID);},
            getSnappy: function(){ return _getAudioParameterValue(this.snappyControlID); },
            getPath: function(){return _getSamplePath(this.name, this.getTone(), this.getSnappy())}
        },
        //from now on
        {
            name: "LC",
            volumeControlID: "LC-level",
            pitchControlID: "LC-pitch",
            tuningControlID: "LC-tuning",
            getVolume: function(){ return _getInstrumentVolume(this.volumeControlID);},
            getPitch: function(){ return _getInstrumentPitch(this.pitchControlID); },
            getTuning: function(){ return _getAudioParameterValue(this.tuningControlID);},
            getPath: function(){return _getSamplePath(this.name, this.getTuning())}
        },
        {
            name: "MC",
            volumeControlID: "MC-level",
            pitchControlID: "MC-pitch",
            tuningControlID: "MC-tuning",
            getVolume: function(){ return _getInstrumentVolume(this.volumeControlID);},
            getPitch: function(){ return _getInstrumentPitch(this.pitchControlID); },
            getTuning: function(){ return _getAudioParameterValue(this.tuningControlID);},
            getPath: function(){return _getSamplePath(this.name, this.getTuning())}
        },
        {
            name: "HC",
            volumeControlID: "HC-level",
            pitchControlID: "HC-pitch",
            tuningControlID: "HC-tuning",
            getVolume: function(){ return _getInstrumentVolume(this.volumeControlID);},
            getPitch: function(){ return _getInstrumentPitch(this.pitchControlID); },
            getTuning: function(){ return _getAudioParameterValue(this.tuningControlID);},
            getPath: function(){return _getSamplePath(this.name, this.getTuning())}
        },
        {
            name: "CL",
            volumeControlID: "CL-level",
            pitchControlID: "CL-pitch",
            getVolume: function(){ return _getInstrumentVolume(this.volumeControlID); },
            getPitch: function(){ return _getInstrumentPitch(this.pitchControlID); },
            getPath: function(){return _getSamplePath(this.name)}
        },    
        {
            name: "MA",
            volumeControlID: "MA-level",
            pitchControlID: "MA-pitch",
            getVolume: function(){ return _getInstrumentVolume(this.volumeControlID); },
            getPitch: function(){ return _getInstrumentPitch(this.pitchControlID); },
            getPath: function(){return _getSamplePath(this.name)}},
        // to now
        {
            name: "CB",
            volumeControlID: "CB-level",
            pitchControlID: "CB-pitch",
            getVolume: function(){ return _getInstrumentVolume(this.volumeControlID); },
            getPitch: function(){ return _getInstrumentPitch(this.pitchControlID); },
            getPath: function(){return _getSamplePath(this.name)}
        },
        {
            name: "CY",
            volumeControlID: "CY-level",
            pitchControlID: "CY-pitch",
            toneControlID: "CY-tone",
            decayControlID: "CY-decay",
            getVolume: function(){ return _getInstrumentVolume(this.volumeControlID);},
            getPitch: function(){ return _getInstrumentPitch(this.pitchControlID); },
            getTone: function(){ return _getAudioParameterValue(this.toneControlID);},
            getDecay: function(){ return _getAudioParameterValue(this.decayControlID); },
            getPath: function(){return _getSamplePath(this.name, this.getTone(), this.getDecay())}
        },
        {
            name: "OH",
            volumeControlID: "OH-level",
            pitchControlID: "OH-pitch",
            decayControlID: "OH-decay",
            getVolume: function(){ return _getInstrumentVolume(this.volumeControlID); },
            getPitch: function(){ return _getInstrumentPitch(this.pitchControlID); },
            getDecay: function(){ return _getAudioParameterValue(this.decayControlID); }, 
            getPath: function(){return _getSamplePath(this.name, this.getDecay())}
        },
        {
            name: "CH",
            volumeControlID: "CH-level",
            pitchControlID: "CH-pitch",
            getVolume: function(){ return _getInstrumentVolume(this.volumeControlID); },
            getPitch: function(){ return _getInstrumentPitch(this.pitchControlID); },
            getPath: function(){return _getSamplePath(this.name)}
        },
    
        {
            name: "LT",
            volumeControlID: "LC-level",
            pitchControlID: "LC-pitch",
            tuningControlID: "LC-tuning",
            getVolume: function(){ return _getInstrumentVolume(this.volumeControlID);},
            getPitch: function(){ return _getInstrumentPitch(this.pitchControlID); },
            getTuning: function(){ return _getAudioParameterValue(this.tuningControlID);},
            getPath: function(){return _getSamplePath(this.name, this.getTuning())}
        },
        {
            name: "MT",
            volumeControlID: "MC-level",
            pitchControlID: "MC-pitch",
            tuningControlID: "MC-tuning",
            getVolume: function(){ return _getInstrumentVolume(this.volumeControlID);},
            getPitch: function(){ return _getInstrumentPitch(this.pitchControlID); },
            getTuning: function(){ return _getAudioParameterValue(this.tuningControlID);},
            getPath: function(){return _getSamplePath(this.name, this.getTuning())}

        },
        {
            name: "HT",
            volumeControlID: "HC-level",
            pitchControlID: "HC-pitch",
            tuningControlID: "HC-tuning",
            getVolume: function(){ return _getInstrumentVolume(this.volumeControlID);},
            getPitch: function(){ return _getInstrumentPitch(this.pitchControlID); },
            getTuning: function(){ return _getAudioParameterValue(this.tuningControlID);},
            getPath: function(){return _getSamplePath(this.name, this.getTuning())}
        },
        {
            name: "RS",
            volumeControlID: "CL-level",
            pitchControlID: "CL-pitch",
            getVolume: function(){ return _getInstrumentVolume(this.volumeControlID); },
            getPitch: function(){ return _getInstrumentPitch(this.pitchControlID); },
            getPath: function(){return _getSamplePath(this.name)}

        },    
        {
            name: "CP",
            volumeControlID: "MA-level",
            pitchControlID: "MA-pitch",
            getVolume: function(){ return _getInstrumentVolume(this.volumeControlID); },
            getPitch: function(){ return _getInstrumentPitch(this.pitchControlID); },
            getPath: function(){return _getSamplePath(this.name)}
        }
    ],

    currentInstrumentIndex: _startingInstrumentIndex, //current instrument selected
    setCurrentInstrument: function (value){this.currentInstrumentIndex = value;},
    getCurrentInstrument: function(){return this.instruments[this.currentInstrumentIndex];}, //returns the instrument object from the array
    getInstrumentFromIndex: function(index){return this.instruments[index];},

    reset: function(){
        this.setCurrentInstrument(_startingInstrumentIndex)
    }
}

function _getInstrumentVolume(instrumentVolumeControl){ //helper private function
    let instrumentLevel = document.getElementById(instrumentVolumeControl);
    return (instrumentLevel.value / 10)
}


function _getSamplePath( instrumentName, param1= "", param2 =""){
    return `TR808WAV/${instrumentName}/${instrumentName}${param1}${param2}.WAV`
}

//helper function 
function _getAudioParameterValue(inputId){
    let val = document.getElementById(inputId)?.value

    switch(Number(val)){
        case 0:
            return "00";
        case 2.5:
            return "25";
        case 5:
            return "50";
        case 7.5:
            return "75";
        case 10:
            return "10";
    }
        
}

function _getInstrumentPitch(instrumentPitchID){
    let pitchElem = document.getElementById(instrumentPitchID);
    //return ((( Number(pitchElem.value) + 1)*0.35)+0.1) // the range of values ends up being ([0.45 - 3.95] for x=[0, 10]) 
    let pitches = [ 0.25 ,0.40, 0.55, 0.70, 0.85, 1, 1.5 , 2, 2.5, 3, 3.5]
    return (pitches[pitchElem.value])
}