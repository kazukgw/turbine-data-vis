var Field = require('./radar_chart_field');
var Axis = require('./radar_chart_axis');
var Point = require('./radar_chart_point');
var Polygon = require('./radar_chart_polygon');
class RadarChart {
  constructor(data, $container, size) {
    this.data = data;
    this.size = size;
    this._container = $container;
    this.$container = d3.select($container);

    this.$chartBox =
      this.$container.append('svg')
      .attr('width', size)
      .attr('height', size)
      .attr('class', 'chart-box');

    this.field = new Field(data, size);
    this.field.setCenter(size/2, size/2);

    this.axis = new Axis(this.data, this.field);
    this.$axisBox = this.$chartBox.append('g').attr('class', 'axis-box');

    this.point = new Point(this.data, this.field, 1);
    this.$pointsBox = this.$chartBox.append('g').attr('class', 'points-box');

    this.polygon = new Polygon(this.data, this.field, 1);
    this.$polygonBox = this.$chartBox.append('g').attr('class', 'polygon-box');
  }

  render() {
    this.axis.render(this.$axisBox);
    this.polygon.render(this.$polygonBox);
    this.point.render(this.$pointsBox);
  }
}

module.exports = RadarChart;
