var config = require('../config');
class RadarChartPolygon {
  constructor(data, field, index) {
    this.data = data;
    this.field = field;
    this.index = index;
  }

  render($container) {
    var self = this;
    this.$container = $container;
    this.$polygons = $container.append('svg:polygon');
    this.$polygons
        .attr('class', 'polygon')
        .attr('points', this._toPoints())
        .style(config.style.polygon[this.index - 1]);
  }

  _toPoints() {
    var self = this;
    return this.data.rows.map((d, i)=>{
      return self.field.getPointWithAxisIndex(i, d[self.index]).toArray().join(',');
    }).join(' ');
  }
}

module.exports = RadarChartPolygon;
