var _ = require('lodash');
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
    this.$axisLines = $container.selectAll('.axis');

    this.$axisLines
      .data(this.data.getDegrees())
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
      .style('stroke', 'grey')
      .style('stroke-opacity', '0.75')
      .style('stroke-width', '0.3px');
  }

  defaultConfig(){
    return {
      //
    };
  }
}

module.exports = RadarChartAxis;
