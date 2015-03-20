class RadarChartCaption {
  constructor(seriesArr) {
    this.seriesArr = seriesArr;
  }

  render($container) {
    var $enteredCaptions = $container.selectAll('g')
                                     .data(this.seriesArr)
                                     .enter();
    $enteredCaptions
      .append('svg:line')
      .style('stroke-width', '2px')
      .style('stroke', (d) => d.color[0])
      .attr('x1', 0)
      .attr('y1', (d, i) => 20 * i)
      .attr('x2', 20)
      .attr('y2', (d, i) => 20 * i);

    $enteredCaptions
      .append('svg:text')
      .attr('x', 25)
      .attr('y', (d, i) => 20 * i)
      .attr('transform', 'translate(0,5)')
      .text((d)=> d.seriesName);
  }
}

module.exports = RadarChartCaption;
