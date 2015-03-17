class RadarChartPoint {
  constructor(data, field) {
    this.data = data;
    this.field = field;
  }

  render($container) {
    var self = this;
    this.$points = $container.selectAll('.point');
    this.$points.data(this.data.rows)
      .enter()
      .append('svg:circle')
      .attr('r', 10)
      .attr('alt', (d)=>{ return d.temp })
      .attr('cx', (d, i)=>{
        return self.field.getPointWithAxisIndex(i, d.value).x;
      })
      .attr('cy', (d, i)=>{
        return self.field.getPointWithAxisIndex(i, d.value).y;
      })
      .attr('class', '.node')
      .style('fill', '#ff00ff')
      .style('fill-opacity', 0.9);
  }
}

module.exports = RadarChartPoint;
