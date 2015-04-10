var _ = require('lodash');
var Vector = require('objects/vector');
class RadarChartField {
  constructor(data, size) {
    this.size = size;
    this.center = new Vector();
    this.data = data;
    this.degrees = data.getDegrees();
    this.dataRange = data.getMax();
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

  setDataRange(range) {
    this.dataRange = range;
  }

  getPointWithAxisIndex(axisIndex, value) {
    var degree = this.degrees[axisIndex];
    var x = Math.cos(this._toRadian(degree));
    var y = Math.sin(this._toRadian(degree));
    var vec = new Vector(y, - x);
    var scalar = parseInt(value) / parseInt(this.dataRange) * parseInt(this.size) / 2;
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
