var Loki = require('lokijs');

// global.Papa が定義される
require('../../vendor/papaparse');
var CSV = Papa;
var _ = require('lodash');
var is = require('is_js');
class TemperatureData {
  static load(fileOrUrl) {
    if(is.string(fileOrUrl)) {
      return this._loadFromUrl(fileOrUrl);
    } else {
      return this._loadFromFile(fileOrUrl);
    }
  }

  static save() {

  }

  constructor(data) {
    this.raw = data.data;
    var titleRow, headerRow, dataRow;
    for(let i = 0, l = this.raw.length; i < l; i++){
      console.log(this.raw[i][0]);
      if((/\[title\]/i).test(this.raw[i][0])) {
        titleRow = i+1;
      }
      if((/\[data\]/i).test(this.raw[i][0])) {
        headerRow = i+1;
        dataRow = i+2;
      }

      if(dataRow) break;
    }

    if(!dataRow) {
      throw new Error('データが存在しません');
    }

    this.title = titleRow ? data[titleRow] : (new Date());
    this.header = this.raw[headerRow];
    this.rows = this.raw.slice(dataRow);
  }

  getDegrees() {
    return this.rows.map((row)=>{ return row[0]; });
  }

  getMaxDegrees() {
    return _.max(this.getDegrees());
  }

  getMax(index) {
    return _.max(this.rows.map((row)=>{ return row[index || 1]; }));
  }

  static _loadFromFile(file) {
    return new Promise((resolve, reject)=>{
      var config = {
        skipEmptyLines: true
      };
      config.complete = (data)=>{
        resolve(new TemperatureData(data))
      };

      config.error = ()=>{
        alert('データの読み込みに失敗しました');
        reject('データの読み込みに失敗しました');
      };

      CSV.parse(file, config);
    });
  }

  static _loadFromUrl() {

  }
}

module.exports = TemperatureData;
