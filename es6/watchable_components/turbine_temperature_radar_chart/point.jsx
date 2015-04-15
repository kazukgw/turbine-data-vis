var _ = require('lodash');
var React = require('react');

var RadarChartPointCircle = React.createClass({
  propTypes: {
    r: React.PropTypes.number.isRequired,
    cx: React.PropTypes.number.isRequired,
    cy: React.PropTypes.number.isRequired,
    style: React.PropTypes.object.isRequired
  },

  render() {
    var p = this.props;
    return (
      <circle r={p.r} cx={p.cx} cy={p.cy} className={'point'} style={p.style} />
    );
  }
})

var RadarChartPoint = React.createClass({
  propTypes: {
    data: React.PropTypes.object.isRequired,
    field: React.PropTypes.object.isRequired,
    seriesIndex: React.PropTypes.number.isRequired,
    attr: React.PropTypes.object.isRequired,
    style: React.PropTypes.object.isRequired
  },

  render() {
    var p = this.props;
    return (
      <g>
        {p.data.rows.map((d, i)=>{
          return (
            <RadarChartPointCircle
              key={`radar-chart-circle-${i}`}
              {...p.attr}
              cx={p.field.getPointWithAxisIndex(i, d[this.props.seriesIndex + 1]).x}
              cy={p.field.getPointWithAxisIndex(i, d[this.props.seriesIndex + 1]).y}
              style={p.style}
            />
          );
        })}
      </g>
    );
  }
});

module.exports = RadarChartPoint;
