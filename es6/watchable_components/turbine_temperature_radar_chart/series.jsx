var _ = require('lodash');
var React = require('react');
var Point = require('./point');
var Polygon = require('./polygon');

var RadarChartSeries = React.createClass({
  propTypes: {
    index: React.PropTypes.number.isRequired,
    data: React.PropTypes.array.isRequired,
    field: React.PropTypes.object.isRequired,
    color: React.PropTypes.array.isRequired,
    config: React.PropTypes.object.isRequired
  },

  getPointStyle() {
    return _.assign(this.props.config.point.style, {
      stroke: this.props.color,
      fill: this.props.color
    });
  },

  getPolygonStyle() {
    return _.assign(this.props.config.polygon.style, {
      stroke: this.props.color,
      fill: this.props.color
    });
  },

  getSeriesName() {
    return this.props.data.getSeriesName(this.props.index);
  },

  render() {
    var p = this.props;
    return (
      <g className='series-container' dataSeriesIndex={p.index}>
        <g dataSeriesName={this.getSeriesName()} dataSeriesIndex={p.index}
           className='point-container'>
          <Point
            data={p.data} field={p.field}
            seriesIndex={p.index} attr={p.config.point.attr}
            style={this.getPointStyle()}
          />
        </g>
        <g dataSeriesName={this.getSeriesName()} dataSeriesIndex={p.index}
           className='polygon-container'>
          <Polygon
            data={p.data} field={p.field}
            seriesIndex={p.index}
            style={this.getPolygonStyle()}
          />
        </g>
      </g>
    );
  }
});

module.exports = RadarChartSeries;
