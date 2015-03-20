var _ = require('lodash');
var config = require('../config');
class RadarChartAxis {
  constructor(data, field, config) {
    this.data = data;
    this.field = field;
    this.config = {
      auxAxisCount: 5
    };
    _.assign(this.config, config);
    this.size = field.getSize();
    this.center = field.getCenter();
  }

  render($container) {
    var self = this;
    this.$container = $container;
    var degrees = this.data.getDegrees();

    this.$axisLines = $container.selectAll('.axis');
    this.$axisLines
        .data(degrees)
        .enter()
        .append('svg:line')
        .attr('x1', this.center.x)
        .attr('y1', this.center.y)
        .attr('x2', (_d, i) => self.field.getPointWithAxisIndex(i, self.field.dataRange).x)
        .attr('y2', (_d, i) => self.field.getPointWithAxisIndex(i, self.field.dataRange).y)
        .attr('class', 'axis-line')
        .style(config.style.axisLine);

    this.$axisTitle = $container.selectAll('.axis-title');
    this.$axisTitle
        .data(degrees)
        .enter()
        .append('svg:text')
        .attr('text-anchor', 'middle')
        // 中心から軸の長さの1.1倍の位置に文字を置く
        .attr('x', (d, i) => self.field.getPointWithAxisIndex(i, self.field.dataRange * 1.1 ).x)
        .attr('y', (d, i) => self.field.getPointWithAxisIndex(i, self.field.dataRange * 1.1 ).y)
        .text((d) => d )
        .style(config.style.axisTitle);

    this.$auxAxis = $container.selectAll('.aux-axis');
    var _degrees = degrees.slice(0, -1);
    _.times(this.config.auxAxisCount, (i)=>{
      var range = self.field.dataRange / self.config.auxAxisCount * i;
      var textPosition = [];
      self.$auxAxis
          .data(_degrees)
          .enter()
          .append('svg:line')
          .attr('x1', (_d, j)=>{
            var x = self.field.getPointWithAxisIndex(j, range).x;
            textPosition.push({x});
            return x;
          })
          .attr('y1', (_d, j)=>{
            var y = self.field.getPointWithAxisIndex(j, range).y;
            textPosition[j].y = y;
            return y;
          })
          .attr('x2', (_d, j) => self.field.getPointWithAxisIndex(j + 1, range).x)
          .attr('y2', (_d, j) => self.field.getPointWithAxisIndex(j + 1, range).y)
          .attr('class', 'axis-aux-line')
          .style(config.style.axisLine);

      self.$auxAxis
          .data(_degrees)
          .enter()
          .append('svg:text')
          .attr('text-anchor', 'start')
          .attr('x', (_d,i) => textPosition[i].x)
          .attr('y', (_d,i) => textPosition[i].y)
          .text((_d, i) => i%3 === 0 ? range : '')
          .style(config.style.axisText);
    });
  }
}

module.exports = RadarChartAxis;
