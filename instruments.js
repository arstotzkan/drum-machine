const _startingInstrumentIndex = 1

const INSTRUMENT_CONTROLLER = {
    /*An array of all possible instruments, and a way to store all relevant Data */
    instruments : [
        {
            name: "AC",
            volumeControlID: "AC-level",
            getVolume: function(){ return _getInstrumentVolume(this.volumeControlID); },
            getPath: function(){return ""}
        },
        {
            name: "BD",
            volumeControlID: "BD-level",
            toneControlID: "BD-tone",
            decayControlID: "BD-decay",
            getVolume: function(){ return _getInstrumentVolume(this.volumeControlID);},
            
            getTone: function(){ return _getAudioParameterValue(this.toneControlID);},
            getDecay: function(){ return _getAudioParameterValue(this.decayControlID); },
            getPath: function(){return _getSamplePath(this.name, this.getTone(), this.getDecay())}
        },
        {
            name: "SD",
            volumeControlID: "SD-level",
            toneControlID: "SD-tone",
            snappyControlID: "SD-snappy",
            getVolume: function(){ return _getInstrumentVolume(this.volumeControlID);},

            getTone: function(){ return _getAudioParameterValue(this.toneControlID);},
            getSnappy: function(){ return _getAudioParameterValue(this.snappyControlID); },
            getPath: function(){return _getSamplePath(this.name, this.getTone(), this.getSnappy())}
        },
        //from now on
        {
            name: "LC",
            volumeControlID: "LC-level",
            tuningControlID: "LC-tuning",
            getVolume: function(){ return _getInstrumentVolume(this.volumeControlID);},

            getTuning: function(){ return _getAudioParameterValue(this.tuningControlID);},
            getPath: function(){return _getSamplePath(this.name, this.getTuning())}
        },
        {
            name: "MC",
            volumeControlID: "MC-level",
            tuningControlID: "MC-tuning",
            getVolume: function(){ return _getInstrumentVolume(this.volumeControlID);},

            getTuning: function(){ return _getAudioParameterValue(this.tuningControlID);},
            getPath: function(){return _getSamplePath(this.name, this.getTuning())}
        },
        {
            name: "HC",
            volumeControlID: "HC-level",
            tuningControlID: "HC-tuning",
            getVolume: function(){ return _getInstrumentVolume(this.volumeControlID);},

            getTuning: function(){ return _getAudioParameterValue(this.tuningControlID);},
            getPath: function(){return _getSamplePath(this.name, this.getTuning())}
        },
        {
            name: "CL",
            volumeControlID: "CL-level",
            getVolume: function(){ return _getInstrumentVolume(this.volumeControlID); },
            getPath: function(){return _getSamplePath(this.name)}

        },    
        {
            name: "MA",
            volumeControlID: "MA-level",
            getVolume: function(){ return _getInstrumentVolume(this.volumeControlID); },
            getPath: function(){return _getSamplePath(this.name)}},
        // to now
        {
            name: "CB",
            volumeControlID: "CB-level",
            getVolume: function(){ return _getInstrumentVolume(this.volumeControlID); },
            getPath: function(){return _getSamplePath(this.name)}
        },
        {
            name: "CY",
            volumeControlID: "CY-level",
            toneControlID: "CY-tone",
            decayControlID: "CY-decay",
            getVolume: function(){ return _getInstrumentVolume(this.volumeControlID);},
            
            getTone: function(){ return _getAudioParameterValue(this.toneControlID);},
            getDecay: function(){ return _getAudioParameterValue(this.decayControlID); },
            getPath: function(){return _getSamplePath(this.name, this.getTone(), this.getDecay())}
        },
        {
            name: "OH",
            volumeControlID: "OH-level",
            decayControlID: "OH-decay",
            getVolume: function(){ return _getInstrumentVolume(this.volumeControlID); },

            getDecay: function(){ return _getAudioParameterValue(this.decayControlID); }, 
            getPath: function(){return _getSamplePath(this.name, this.getDecay())}
        },
        {
            name: "CH",
            volumeControlID: "CH-level",
            getVolume: function(){ return _getInstrumentVolume(this.volumeControlID); },

            getPath: function(){return _getSamplePath(this.name)}
        },
    
        {
            name: "LT",
            volumeControlID: "LC-level",
            tuningControlID: "LC-tuning",
            getVolume: function(){ return _getInstrumentVolume(this.volumeControlID);},

            getTuning: function(){ return _getAudioParameterValue(this.tuningControlID);},
            getPath: function(){return _getSamplePath(this.name, this.getTuning())}
        },
        {
            name: "MT",
            volumeControlID: "MC-level",
            tuningControlID: "MC-tuning",
            getVolume: function(){ return _getInstrumentVolume(this.volumeControlID);},

            getTuning: function(){ return _getAudioParameterValue(this.tuningControlID);},
            getPath: function(){return _getSamplePath(this.name, this.getTuning())}

        },
        {
            name: "HT",
            volumeControlID: "HC-level",
            tuningControlID: "HC-tuning",
            getVolume: function(){ return _getInstrumentVolume(this.volumeControlID);},

            getTuning: function(){ return _getAudioParameterValue(this.tuningControlID);},
            getPath: function(){return _getSamplePath(this.name, this.getTuning())}
        },
        {
            name: "RS",
            volumeControlID: "CL-level",
            getVolume: function(){ return _getInstrumentVolume(this.volumeControlID); },

            getPath: function(){return _getSamplePath(this.name)}

        },    
        {
            name: "CP",
            volumeControlID: "MA-level",
            getVolume: function(){ return _getInstrumentVolume(this.volumeControlID); },

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

function _getInstrumentPlaybackRate(instrumentPlaybackRateControl){
    let instrumentTone = document.getElementById(instrumentPlaybackRateControl);
    return ((instrumentTone.value*0.35)+0.1) // the range of values ends up being ([0.45 - 3.95] for x=[1, 11]) 
}