var _ = require('lodash');
var React = require('react');

var RadarChartPolygon = React.createClass({
  propTypes: {
    data: React.PropTypes.object.isRequired,
    field: React.PropTypes.object.isRequired,
    seriesIndex: React.PropTypes.number.isRequired,
    style: React.PropTypes.object.isRequired
  },

  getPoints() {
    var self = this;
    var data = this.props.data.rows.map((d, i)=>{ return d[this.props.seriesIndex + 1]; });
    var lt180 = 180 > parseInt(this.props.data.getMaxDegrees());
    if(lt180) {
      data.push(this.props.field.getDataRangeMin());
    }
    return data.map((d, i)=>{
      if( lt180 && data.length - 1 === i) { i -= 1; }
      return self.props.field.getPointWithAxisIndex(i, d).toArray().join(',');
    }).join(' ');
  },

  getStyle() {
    var style = this.props.style;
    return style;
  },

  render() {
    return (
      <polygon
        className='polygon'
        points={this.getPoints()}
        style={this.getStyle()}
      />
    );
  }
});

module.exports = RadarChartPolygon;
