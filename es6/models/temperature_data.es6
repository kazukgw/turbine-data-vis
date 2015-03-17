var Loki = require('lokijs');
var CSV = require('papaparse');
var _ = require('lodash');
class TemperatureData {
  static load(fileOrUrl) {
    var data = {};
    return new TemperatureData(data);
  }

  static save() {

  }

  constructor(data) {
    this.rows = data;
    this.rows = [
      {degree: 45, value: 30},
      {degree: 90, value: 60},
      {degree: 135, value: 20},
      {degree: 180, value: 90},
      {degree: 225, value: 45},
      {degree: 270, value: 70}
    ];
  }

  getDegrees() {
    return _.pluck(this.rows, 'degree');
  }

  getMaxDegrees() {
    return _.max(this.getDegrees());
  }

  getMax() {
    return _(this.rows).pluck('value').max();
  }

  static _loadFromFile() {

  }

  static _loadFromUrl() {

  }
}

module.exports = TemperatureData;
