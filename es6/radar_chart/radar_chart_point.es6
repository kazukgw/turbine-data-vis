var config = require('../config');
class RadarChartPoint {
  constructor(data, field, index) {
    this.data = data;
    this.field = field;
    this.index = index || 1;
  }

  render($container) {
    var self = this;
    this.$container = $container;
    this.$points = $container.selectAll('.point');
    this.$points.data(this.data.rows)
      .enter()
      .append('svg:circle')
      .attr('r', config.point.r)
      .attr('cx', (d, i) => self.field.getPointWithAxisIndex(i, d[self.index]).x)
      .attr('cy', (d, i) => self.field.getPointWithAxisIndex(i, d[self.index]).y)
      .attr('class', 'point')
      .style(config.style.point[this.index - 1]);
  }
}

module.exports = RadarChartPoint;
