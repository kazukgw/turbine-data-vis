class RadarChartPoint {
  constructor(data, field, index) {
    this.data = data;
    this.field = field;
    this.index = index || 1;
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
        return self.field.getPointWithAxisIndex(i, d[self.index]).x;
      })
      .attr('cy', (d, i)=>{
        return self.field.getPointWithAxisIndex(i, d[self.index]).y;
      })
      .attr('class', '.node')
      .style('fill', '#ff00ff')
      .style('fill-opacity', 0.9);
  }
}

module.exports = RadarChartPoint;
