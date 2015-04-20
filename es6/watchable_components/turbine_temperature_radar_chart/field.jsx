var _ = require('lodash');
var Vector = require('objects/vector');
class RadarChartField {
  constructor(data, size) {
    this.size = size;
    this.center = new Vector();
    this.data = data;
    this.degrees = data.getDegrees();
    var max = parseInt(data.getMax());
    var min = parseInt(data.getMin());
    var sub = max - min;
    this.dataRange = [min - sub, max + sub/2];
  }

  setCenter(x, y) {
    this.center = new Vector(x, y);
  }

  setSize(size) {
    this.size = size;
  }

  getSize() {
    return this.size;
  }

  getCenter() {
    return this.center;
  }

  setDataRange(min, max) {
    var _min = parseInt(this.data.getMin());
    var _max = parseInt(this.data.getMax());
    var _sub = _max - _min;

    if(min == null) {
      min = _min - _sub;
    }
    if(max == null) {
      max = _max + _sub/2;
    }

    this.dataRange = [min, max];
  }

  getDataRangeMax() {
    return parseFloat(this.dataRange[1]);
  }

  getDataRangeMin() {
    return parseFloat(this.dataRange[0]);
  }

  getLengthWithValue(value) {
    var _val = (parseInt(value) - parseInt(this.dataRange[0]));
    var _max = (parseInt(this.dataRange[1]) - parseInt(this.dataRange[0]));
    return _val / _max * parseInt(this.size) / 2;
  }

  getPointWithAxisIndex(axisIndex, value, magnif) {
    var degree = this.degrees[axisIndex];
    var x = Math.cos(this._toRadian(degree));
    var y = Math.sin(this._toRadian(degree));
    var vec = new Vector(y, - x);
    var _val = (parseFloat(value) - parseFloat(this.dataRange[0]));
    var _max = (parseFloat(this.dataRange[1]) - parseFloat(this.dataRange[0]));
    var scalar = _val / _max * parseInt(this.size) / 2;
    if(magnif) {
      scalar = scalar * magnif;
    }
    return this.center.clone().add(vec.multiplyScalar(scalar));
  }

  _toRadian(degree) {
    var parsed = parseFloat(degree);
    if(isNaN(parsed)) {
      throw new Error(`${degree} is not Number`);
    }
    return parsed * Math.PI / 180;
  }
}

module.exports = RadarChartField;
