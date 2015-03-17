class RadarChartPolygon {
  constructor(data, field) {
    this.data = data;
    this.field = field;
  }

  render($container) {
    var self = this;
    this.$polygons = $container.append('svg:polygon');
    this.$polygons.attr('class', 'polygon')
      .attr('points', this._toPoints())
      .style('stroke-width', '2px')
      .style('stroke', '#f2faf1')
      .style('fill', '#0a4ed0')
      .style('fill-opacity', 0.6);
  }

  _toPoints() {
    var self = this;
    return this.data.rows.map((d, i)=>{
      return self.field.getPointWithAxisIndex(i, d.value).toArray().join(',');
    }).join(' ');
  }
}

module.exports = RadarChartPolygon;
