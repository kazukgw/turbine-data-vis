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
    this.topBottomPadding = 50;
    this.leftRightPadding = 150;
  }

  render($container, size) {
    this.center = {
      x: size/2 + this.leftRightPadding,
      y: size/2 + this.topBottomPadding
    };

    this._container = $container;
    this.$container = d3.select($container);

    this.size = size;

    this._setField();
    this._setAxis();
    this._setSeries();

    this.$chartContainer = this.$container
                               .append('svg')
                               .attr('width', this.size+(this.leftRightPadding*2))
                               .attr('height', this.size+(this.topBottomPadding*2))
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

    var captionX = this.size + this.leftRightPadding;
    var captionY = this.topBottomPadding;
    this.caption = new Caption(this.seriesArr);
    this.$captionContainer = this.$chartContainer
                               .append('g')
                               .attr('class', 'caption')
                               .attr('transform', `translate(${captionX},${captionY})`);

    this.caption.render(this.$captionContainer);
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
