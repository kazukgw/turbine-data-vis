var _ = require('lodash');
var config = require('../config');
class RadarChartAxis {
  constructor(data, field, config) {
    this.data = data;
    this.field = field;
    this.config = _.assign(this.defaultConfig(), config);
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
      .attr('x2', (_d, i)=>{
        return self.field.getPointWithAxisIndex(i, self.field.dataRange).x;
      })
      .attr('y2', (_d, i)=>{
        return self.field.getPointWithAxisIndex(i, self.field.dataRange).y;
      })
      .attr('class', 'axis-line')
      .style(config.style.axisLine);

    this.$axisTitle = $container.selectAll('.axis-title');
    this.$axisTitle
      .data(degrees)
      .enter()
      .append('svg:text')
      .attr('text-anchor', 'middle')
      .attr('x', (d, i)=>{
        return self.field.getPointWithAxisIndex(i,  self.field.dataRange * 1.1 ).x;
      })
      .attr('y', (d, i)=>{
        return self.field.getPointWithAxisIndex(i,  self.field.dataRange * 1.1 ).y;
      })
      .text((d)=>{ return d })
      .style(config.style.axisTitle);

    this.$auxAxis = $container.selectAll('.aux-axis');
    this.auxCount = 5;
    var _degrees = degrees.slice(0, -1);
    _.times(this.auxCount, (i)=>{
      var range = self.field.dataRange / self.auxCount * i;
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
        .attr('x2', (_d, j)=>{
          return self.field.getPointWithAxisIndex(j + 1, range).x;
        })
        .attr('y2', (_d, j)=>{
          return self.field.getPointWithAxisIndex(j + 1, range).y;
        })
        .attr('class', 'axis-aux-line')
        .style(config.style.axisLine);

      self.$auxAxis
        .data(_degrees)
        .enter()
        .append('svg:text')
        .attr('text-anchor', 'start')
        .attr('x', (_d,i)=>{ return textPosition[i].x })
        .attr('y', (_d,i)=>{ return textPosition[i].y })
        .text((_d, i)=>{ return i%3 === 0 ? range : '' })
        .style(config.style.axisText);
    });

  }

  defaultConfig(){
    return {
      //
    };
  }
}

module.exports = RadarChartAxis;
