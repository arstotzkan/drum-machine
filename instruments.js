const _startingInstrumentIndex = 1

const INSTRUMENT_CONTROLLER = {
    /*An array of all possible instruments, and a way to store all relevant Data */
    instruments : [
        {
            name: "AC",
            path: "",
            volumeControlID: "AC-level",
            getVolume: function(){ return _getInstrumentVolume(this.volumeControlID); }
        },
        {
            name: "BD",
            path:  "TR808WAV/BD/BD1000.WAV",
            volumeControlID: "BD-level",
            toneControlID: "BD-tone",
            decayControlID: "BD-decay",
            getVolume: function(){ return _getInstrumentVolume(this.volumeControlID);},
            getTone: function(){ return _getInstrumentTone(this.toneControlID);},
            getDecay: function(){ return _getInstrumentDecay(this.decayControlID); } 
        },
        {
            name: "SD",
            path: "TR808WAV/SD/SD1000.WAV",
            volumeControlID: "SD-level",
            toneControlID: "SD-tone",
            getVolume: function(){ return _getInstrumentVolume(this.volumeControlID);},
            getTone: function(){ return _getInstrumentTone(this.toneControlID);}
        },
        //from now on
        {
            name: "LC",
            path: "TR808WAV/LC/LC10.WAV",
            volumeControlID: "LC-level",
            toneControlID: "LC-tone",
            getVolume: function(){ return _getInstrumentVolume(this.volumeControlID);},
            getTone: function(){ return _getInstrumentTone(this.toneControlID);}
        },
        {
            name: "MC",
            path: "TR808WAV/MC/MC10.WAV",
            volumeControlID: "MC-level",
            toneControlID: "MC-tone",
            getVolume: function(){ return _getInstrumentVolume(this.volumeControlID);},
            getTone: function(){ return _getInstrumentTone(this.toneControlID);}
        },
        {
            name: "HC",
            path: "TR808WAV/HC/HC10.WAV",
            volumeControlID: "HC-level",
            toneControlID: "HC-tone",
            getVolume: function(){ return _getInstrumentVolume(this.volumeControlID);},
            getTone: function(){ return _getInstrumentTone(this.toneControlID);}
        },
        {
            name: "CL",
            path: "TR808WAV/CL/CL.WAV",
            volumeControlID: "CL-level",
            getVolume: function(){ return _getInstrumentVolume(this.volumeControlID); }
        },    
        {
            name: "MA",
            path: "TR808WAV/MA/MA.WAV",
            volumeControlID: "MA-level",
            getVolume: function(){ return _getInstrumentVolume(this.volumeControlID); }
        },
        // to now
        {
            name: "CB",
            path: "TR808WAV/CB/CB.WAV",
            volumeControlID: "CB-level",
            getVolume: function(){ return _getInstrumentVolume(this.volumeControlID); }
        },
        {
            name: "CY",
            path: "TR808WAV/CY/CY1000.WAV",
            volumeControlID: "CY-level",
            toneControlID: "CY-tone",
            decayControlID: "CY-decay",
            getVolume: function(){ return _getInstrumentVolume(this.volumeControlID);},
            getTone: function(){ return _getInstrumentTone(this.toneControlID);},
            getDecay: function(){ return _getInstrumentDecay(this.decayControlID); } 
        },
        {
            name: "OH",
            path: "TR808WAV/OH/OH10.WAV",
            volumeControlID: "OH-level",
            decayControlID: "OH-decay",
            getVolume: function(){ return _getInstrumentVolume(this.volumeControlID); },
            getDecay: function(){ return _getInstrumentDecay(this.decayControlID); } 
        },
        {
            name: "CH",
            path: "TR808WAV/CH/CH.WAV",
            volumeControlID: "CH-level",
            getVolume: function(){ return _getInstrumentVolume(this.volumeControlID); }
        },
    
        //UNUSED INSTRUMENTS AS OF NOW
        {
            name: "LT",
            path: "TR808WAV/LT/LT10.WAV",
            volumeControlID: "LC-level",
            toneControlID: "LC-tone",
            getVolume: function(){ return _getInstrumentVolume(this.volumeControlID);},
            getTone: function(){ return _getInstrumentTone(this.toneControlID);}
        },
        {
            name: "MT",
            path: "TR808WAV/MT/MT10.WAV",
            volumeControlID: "MC-level",
            toneControlID: "MC-tone",
            getVolume: function(){ return _getInstrumentVolume(this.volumeControlID);},
            getTone: function(){ return _getInstrumentTone(this.toneControlID);}
        },
        {
            name: "HT",
            path: "TR808WAV/HT/HT10.WAV",
            volumeControlID: "HC-level",
            toneControlID: "HC-tone",
            getVolume: function(){ return _getInstrumentVolume(this.volumeControlID);},
            getTone: function(){ return _getInstrumentTone(this.toneControlID);}
        },
        {
            name: "RS",
            path: "TR808WAV/RS/RS.WAV",
            volumeControlID: "CL-level",
            getVolume: function(){ return _getInstrumentVolume(this.volumeControlID); }
        },    
        {
            name: "CP",
            path: "TR808WAV/CP/CP.WAV",
            volumeControlID: "MA-level",
            getVolume: function(){ return _getInstrumentVolume(this.volumeControlID); }
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

function _getInstrumentDecay(instrumentDecayControl){
    let instrumentDecay = document.getElementById(instrumentDecayControl);
    return (instrumentDecay.value)
}

function _getInstrumentTone(instrumentToneControl){
    let instrumentTone = document.getElementById(instrumentToneControl);
    return ((instrumentTone.value*0.35)+0.1) // the range of values ends up being ([0.45 - 3.95] for x=[1, 11]) 
}