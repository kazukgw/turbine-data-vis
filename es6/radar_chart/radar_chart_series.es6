var config = require('../config');
class RadarChartSeries {
  constructor(data, point, polygon, index) {
    this.index = index;
    this.data = data;
    this.seriesName = this.data.getSeriesName(index);
    this.point = point;
    this.polygon = polygon;
    this.color = config.color[index];
  }

  render($container) {
    this.$container = $container;

    this.$pointContainer = $container
                             .append('g')
                             .attr('data-series-index', this.index)
                             .attr('class', 'point-container');
    this.point.render(this.$pointContainer);

    this.$polygonContainer = $container
                               .append('g')
                               .attr('data-series-index', this.index)
                               .attr('class', 'polygon-container');
    this.polygon.render(this.$polygonContainer);
  }
}

module.exports = RadarChartSeries;
