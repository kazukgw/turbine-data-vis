// Define `global.Papa`
require('vendor/papaparse');

var CSV = Papa;
var _ = require('lodash');
var is = require('is_js');
class Data {
  static load(fileOrUrl) {
    if(is.string(fileOrUrl)) {
      return this._loadFromUrl(fileOrUrl);
    } else {
      return this._loadFromFile(fileOrUrl);
    }
  }

  constructor(data) {
    this.raw = data.data;
    var titleRow, headerRow, dataRow;
    for(let i = 0, l = this.raw.length; i < l; i++){
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

    if( /[\.\d]+/.test(this.raw[headerRow][0]) ) {
      this.header = ['degree']
      this.header.concat(_.range(this.raw[headerRow].length - 1).map((i)=> `系列${i+1}`));
      dataRow = headerRow;
    } else {
      this.header = this.raw[headerRow];
    }

    this.title = titleRow ? data[titleRow] : (new Date());
    // this.rows = this.raw.slice(dataRow);

    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }

    this.rows = [];
    for (var y = 0; y < 20; y++) {
      this.rows.push([]);
      var row = _.last(this.rows);
      for (var x = 0; x < 20; x++) {
        var magnif = ((10 - Math.abs(10 - y)) / 10 + 1) * ((10 - Math.abs(10 - x)) / 10 + 1);
        console.log(magnif);
        row.push(getRandomArbitrary(100, 100 * magnif));
      }
    }

    this.componentName = 'turbineTemperature3DContour';
  }

  getSeriesCount() {
    return this.rows[0].length - 1;
  }

  getDegrees() {
    return this.rows.map((row) => row[0]);
  }

  getMax() {
    return _(this.rows).map((r) => _.rest(r)).flatten().max();
  }

  getMin() {
    return _(this.rows).map((r) => _.rest(r)).flatten().min();
  }

  getMaxDegrees() {
    return _.max(this.getDegrees().map((d)=> parseInt(d)));
  }

  getMaxInSeries(seriesIndex) {
    return _(this.rows).map((r) => r[seriesIndex || 1]).max();
  }

  getSeriesName(index) {
    return this.header[index+1];
  }

  static _loadFromFile(file) {
    return new Promise((resolve, reject)=>{
      var config = {
        skipEmptyLines: true
      };
      config.complete = (data)=>{
        var _d = new Data(data);
        _d.fileName = file.name;
        resolve(_d);
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


module.exports = Data;
