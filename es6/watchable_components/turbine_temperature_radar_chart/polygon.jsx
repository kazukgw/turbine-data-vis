var _ = require('lodash');
var React = require('react');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var RadarChartPolygon = React.createClass({
  mixins: [PureRenderMixin],
  propTypes: {
    data: React.PropTypes.array.isRequired,
    field: React.PropTypes.object.isRequired,
    seriesIndex: React.PropTypes.number.isRequired,
    style: React.PropTypes.object.isRequired
  },

  getPoints() {
    var self = this;
    return this.props.data.rows.map((d, i)=>{
      return self.props.field.getPointWithAxisIndex(i, d[self.props.seriesIndex + 1]).toArray().join(',');
    }).join(' ');
  },

  render() {
    return (
      <polygon
        className='polygon'
        points={this.getPoints()}
        style={this.props.style}
      />
    );
  }
});

module.exports = RadarChartPolygon;
