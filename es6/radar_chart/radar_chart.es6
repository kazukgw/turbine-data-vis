var _ = require('lodash');
var Field = require('./radar_chart_field');
var Axis = require('./radar_chart_axis');
var Point = require('./radar_chart_point');
var Polygon = require('./radar_chart_polygon');
var Series = require('./radar_chart_series');
var Caption = require('./radar_chart_caption');
class RadarChart {
  constructor(data, config) {
    this.data = data;
    this.config = config || {};

    this.size = this.config.size || 400;
    this.topBottomPadding = this.config.topBottomPadding || 50;
    this.leftRightPadding = this.config.leftRightPadding || 150;
    this.width = this.size+(this.leftRightPadding*2);
    this.height = this.size+(this.topBottomPadding*2);
    this.center = {
      x: this.size/2 + this.leftRightPadding,
      y: this.size/2 + this.topBottomPadding
    };
  }

  render(chartWindow) {
    var self = this;
    this.chartWindow = chartWindow;
    this.d3$chartWindow = this.chartWindow.d3$chartWindow;
    var bWidth =  this.chartWindow.chartOffset.width;
    var bHeight = this.chartWindow.chartOffset.height;

    this._setField();
    this._setAxis();
    this._setSeries();

    this.d3$chartContainer = this.d3$chartWindow
                               .append('svg')
                               .attr('width', bWidth)
                               .attr('height', bHeight)
                               .attr('viewBox', `0 0 ${this.width} ${this.height}`)
                               .attr('class', 'chart-container');

    this.d3$axisContainer = this.d3$chartContainer
                              .append('g').attr('class', 'axis-container');
    this.axis.render(this.d3$axisContainer);

    this.seriesArr.forEach((s)=>{
      var d3$seriesContainer = self.d3$chartContainer
                                 .append('g')
                                 .attr('data-series-index', s.index)
                                 .attr('class', 'series-container');
      s.render(d3$seriesContainer);
    });

    var captionX = this.size + this.leftRightPadding;
    var captionY = this.topBottomPadding;
    this.caption = new Caption(this.seriesArr);
    this.d3$captionContainer = this.d3$chartContainer
                               .append('g')
                               .attr('class', 'caption')
                               .attr('transform', `translate(${captionX},${captionY})`);

    this.caption.render(this.d3$captionContainer);
  }

  resetSize() {
    var bWidth =  this.chartWindow.chartOffset.width;
    var bHeight = this.chartWindow.chartOffset.height;
    this.d3$chartContainer.attr({ width: bWidth, height: bHeight });
  }

  _setSeries() {
    this.seriesArr = [];
    var self = this;
    _.times(this.data.getSeriesCount(), (index)=>{
      var realIndex = index + 1;
      var point = new Point(self.data, self.field, realIndex);
      var polygon = new Polygon(self.data, self.field, realIndex);
      self.seriesArr.push(new Series(self.data, point, polygon, index));
    });
  }

  _setAxis() {
    this.axis = new Axis(this.data, this.field);
  }

  _setField() {
    this.field = new Field(this.data, this.size);
    this.field.setCenter(this.center.x, this.center.y);
  }
}

module.exports = RadarChart;
