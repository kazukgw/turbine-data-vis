//
// Dependencies
//

// Library
var is = require('is_js');
var _ = require('lodash');
// Views
var FileDropZone = require('../views/file_drop_zone');
var RadarChart = require('../radar_chart/radar_chart');
var FileListView = require('../views/file_list_view');
// Models
var TemperatureData = require('../models/temperature_data');
var FileList = require('../models/file_list');

//////////////
class ApplicationController {
  constructor() {
    this.eventDispatchTable = {
      'FileSelect': 'loadDataAndRenderChart'
    };

    this.fileDropZone = new FileDropZone('.file-drop-zone', this);
    this.fileList = new FileListView('.file-list', FileList);
  }

  loadDataAndRenderChart(file) {
    var self = this;
    FileList.addFile(file);
    TemperatureData.load(file).then((data)=>{
      self.$chartsContainer = document.querySelector('#charts-wrapper')
      var chart = new RadarChart(data, { fileName: file.name });
      chart.render(self.$chartsContainer, 400);
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

