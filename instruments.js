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
            getVolume: function(){ return _getInstrumentVolume(this.volumeControlID); }
        },
        {
            name: "SD",
            path: "TR808WAV/SD/SD1000.WAV",
            volumeControlID: "SD-level",
            getVolume: function(){ return _getInstrumentVolume(this.volumeControlID); }
        },
        {
            name: "LT",
            path: "TR808WAV/LT/LT10.WAV",
            volumeControlID: "LC-level",
            getVolume: function(){ return _getInstrumentVolume(this.volumeControlID); }
        },
        {
            name: "MT",
            path: "TR808WAV/MT/MT10.WAV",
            volumeControlID: "MC-level",
            getVolume: function(){ return _getInstrumentVolume(this.volumeControlID); }
        },
        {
            name: "HT",
            path: "TR808WAV/HT/HT10.WAV",
            volumeControlID: "HC-level",
            getVolume: function(){ return _getInstrumentVolume(this.volumeControlID); }
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
        },
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
            getVolume: function(){ return _getInstrumentVolume(this.volumeControlID); }
        },
        {
            name: "OH",
            path: "TR808WAV/OH/OH10.WAV",
            volumeControlID: "OH-level",
            getVolume: function(){ return _getInstrumentVolume(this.volumeControlID); }
        },
        {
            name: "CH",
            path: "TR808WAV/CH/CH.WAV",
            volumeControlID: "CH-level",
            getVolume: function(){ return _getInstrumentVolume(this.volumeControlID); }
        },
    
        //UNUSED INSTRUMENTS AS OF NOW
        {
            name: "LC",
            path: "TR808WAV/LC/LC10.WAV",
            volumeControlID: "LC-level",
            getVolume: function(){ return _getInstrumentVolume(this.volumeControlID); }
        },
        {
            name: "MC",
            path: "TR808WAV/MC/MC10.WAV",
            volumeControlID: "MC-level",
            getVolume: function(){ return _getInstrumentVolume(this.volumeControlID); }
        },
        {
            name: "HC",
            path: "TR808WAV/HC/HC10.WAV",
            volumeControlID: "HC-level",
            getVolume: function(){ return _getInstrumentVolume(this.volumeControlID); }
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
        }
    ],

    currentInstrumentIndex: 2, //current instrument selected
    setCurrentInstrument: function (value){this.currentInstrumentIndex = value;},
    getCurrentInstrument: function(){return this.instruments[this.currentInstrumentIndex];}, //returns the instrument object from the array
    getInstrumentFromIndex: function(index){return this.instruments[index];}
}

function _getInstrumentVolume(instrumentVolumeControl){ //helper private function
    let instrumentLevel = document.getElementById(instrumentVolumeControl);
    return (instrumentLevel.value / 10)
}