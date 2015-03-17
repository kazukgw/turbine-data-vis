var _ = require('lodash');
var Field = require('./radar_chart_field');
var Axis = require('./radar_chart_axis');
var Point = require('./radar_chart_point');
var Polygon = require('./radar_chart_polygon');
var Series = require('./radar_chart_series');
class RadarChart {
  constructor(data) {
    this.data = data;
  }

  render($container, size) {
    this._container = $container;
    this.$container = d3.select($container);

    this.size = size || this.$container.attr('offsetWidth')/2;

    this._setField();
    this._setAxis();
    this._setSeries();

    this.$chartContainer = this.$container
                               .append('svg')
                               .attr('width', size)
                               .attr('height', size)
                               .attr('class', 'chart-container');

    this.$axisContainer = this.$chartContainer
                              .append('g').attr('class', 'axis-container');
    this.axis.render(this.$axisContainer);

    var self = this;
    this.seriesArr.forEach((s)=>{
      var $seriesContainer = self.$chartContainer
                                 .append('g')
                                 .attr('data-series-index', s.index)
                                 .attr('class', 'series-container');
      s.render($seriesContainer);
    });
  }

  _setSeries() {
    this.seriesArr = [];
    var self = this;
    _.times(this.data.getSeriesCount(), (index)=>{
      var realIndex = index + 1;
      var point = new Point(self.data, self.field, realIndex);
      var polygon = new Polygon(self.data, self.field, realIndex);
      self.seriesArr.push(new Series(point, polygon, index));
    });
  }

  _setAxis() {
    this.axis = new Axis(this.data, this.field);
  }

  _setField() {
    this.field = new Field(this.data, this.size);
    this.field.setCenter(this.size/2, this.size/2);
  }
}

module.exports = RadarChart;
