//
// Dependencies
//

// Library
var is = require('is_js');
var _ = require('lodash');
// Views
var FileDropZone = require('../views/file_drop_zone');
var RadarChart = require('../radar_chart/radar_chart');
// Models
var TemperatureData = require('../models/temperature_data');

//////////////
class ApplicationController {
  constructor() {
    this.eventDispatchTable = {
      'FileSelect': 'loadDataAndRenderChart'
    };

    this.fileDropZone = new FileDropZone('#file-drop-zone', this);
  }

  loadDataAndRenderChart(file) {
    var self = this;
    TemperatureData.load(file).then((data)=>{
      self.$chartsContainer = document.querySelector('#charts-wrapper')
      var chart = new RadarChart(data);
      chart.render(self.$chartsContainer, 500);
    }).catch((e)=>{
      throw e;
    });
  }

  dispatch(eventName, ...args) {
    var functionName = this._getFunctionName(eventName);
    this[functionName].apply(this, args);
  }

  _getFunctionName(eventName) {
    var functionName = this.eventDispatchTable[eventName];
    return is.falsy(functionName) ? 'functionNotFound' : functionName;
  }
}

module.exports = ApplicationController;
