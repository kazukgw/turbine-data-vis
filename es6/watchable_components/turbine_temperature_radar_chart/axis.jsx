var _ = require('lodash');
var React = require('react');

var RadarChartAxis = React.createClass({
  propTypes: {
    data: React.PropTypes.object.isRequired,
    field: React.PropTypes.object.isRequired,
    config: React.PropTypes.object.isRequired
  },

  getSize() {
    return this.props.field.getSize();
  },

  getCenter() {
    return this.props.field.getCenter();
  },

  render() {
    var self = this;
    var p = this.props;
    var degrees = p.data.getDegrees();
    var _degrees = degrees.slice(0, -1);
    var center = this.getCenter();
    var size = this.getSize();
    return (
      <g className='axis-container' style={{zIndex: 50}}>
        <g className='axis-line'>
          {degrees.map((d, i)=>{
            var pos2 = p.field.getPointWithAxisIndex(i, p.field.getDataRangeMax(), 1.1);
            return (
              <line
                key={i}
                className='axis-line-line' style={p.config.axisLine.style}
                x1={center.x} y1={center.y} x2={pos2.x} y2={pos2.y} />
            );
          })}
        </g>

        <g className='axis-title'>
          {degrees.map((deg, i)=>{
            var pos = p.field.getPointWithAxisIndex(i, p.field.getDataRangeMax(), 1.2);
            // pos = pos.multiplyScalar(1.2);
            return(
              <text key={i} style={p.config.axisTitle.style}
                textAnchor='middle' x={pos.x} y={pos.y}>
                {deg + '[deg]'}
              </text>
            );
          })}
        </g>

        <g className='axis-auxAxis'>
          {_.range(p.config.auxAxisCount + 1).map((axisIndex)=>{
            var max = p.field.getDataRangeMax();
            var min = p.field.getDataRangeMin();
            var sub = max - min;
            var d = sub / p.config.auxAxisCount;
            var range =  min + (d * axisIndex);

            var center = p.field.getCenter();
            var r = p.field.getLengthWithValue(range);
            var axisAuxLines = (
              <circle
                key={axisIndex}
                className='axis-auxAxis-axis-line'
                style={p.config.auxAxisLine.style}
                cx={center.x} cy={center.y}
                r={r}
              />
            );

            var textPosition = _degrees.map((d, i)=>{
              return p.field.getPointWithAxisIndex(i, range);
            });

            var axisAuxText = _degrees.map((d, i)=>{
              return (
                <text
                  key={axisIndex + '-' + i}
                  style={{fontSize: '12px', fill: '#000000', 'fillOpacity': 1}}
                  className='axis-auxAxis-axis-text'
                  textAnchor='start'
                  x={textPosition[i].x} y={textPosition[i].y} >
                  {i%3 === 0 ? range : ''}
                </text>
              );
            });

            return (
              <g key={axisIndex} className='axis-auxAxis-axis'>
                <g>
                  {axisAuxLines}
                </g>
                <g>
                  {axisAuxText}
                </g>
              </g>
            );
          })}
        </g>
      </g>
    );
  }
});

module.exports = RadarChartAxis;
