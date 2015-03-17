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
    var data = TemperatureData.load(file);
    this.$chartsBox = document.querySelector('#charts-box')
    var chart = new RadarChart(data, this.$chartsBox, 600);
    chart.render();
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
