var _ = require('lodash');
var React = require('react');
var Reflux = require('reflux');

var displayActions = Reflux.createActions(['show', 'hide']);
var displayStore = Reflux.createStore({
  listenables: displayActions,
  onShow(props) {
    this.display = props;
    this.trigger(this.display);
  },
  onHide() {
    this.display = {};
    this.trigger(this.display);
  }
});

var PointCircle = React.createClass({
  propTypes: {
    r: React.PropTypes.number.isRequired,
    cx: React.PropTypes.number.isRequired,
    cy: React.PropTypes.number.isRequired,
    seriesIndex: React.PropTypes.number.isRequired,
    degreeIndex: React.PropTypes.number.isRequired,
    style: React.PropTypes.object.isRequired,
    displayActions: React.PropTypes.object.isRequired
  },

  handleMouseEnter(e) {
    var seriesIndex = e.target.getAttribute('data-seriesIndex');
    var degreeIndex = e.target.getAttribute('data-degreeIndex');
    console.log('point mouse enter');
    this.props.displayActions.show(this.props);
  },

  handleMouseOut() {
    console.log('point mouse out');
    this.props.displayActions.hide();
  },

  render() {
    return (
      <circle
        {...this.props}
        className={'point'}
        onMouseEnter={this.handleMouseEnter}
        onMouseOut={this.handleMouseOut}
      />
    );
  }
})

var PointText = React.createClass({
  propTypes: {
    text: React.PropTypes.string.isRequired,
    x: React.PropTypes.number.isRequired,
    y: React.PropTypes.number.isRequired
  },

  render() {
    return (
      <text x={this.props.x} y={this.props.y}>{this.props.text}</text>
    );
  }
});

var PointCaption = React.createClass({
  mixins: [Reflux.connect(displayStore, 'display')],

  getStyle() {
    var _display = 'none';
    if(this.props.seriesIndex === this.state.display.seriesIndex &&
       this.props.degreeIndex === this.state.display.degreeIndex ) {
      _display = 'flex';
    }
    return {
      display: _display,
      backgroundColor: 'rgba(255, 255, 255, 0.5)'
    };
  },

  getInitialState() {
    return { display: {} };
  },

  render() {
    return (
      <g style={this.getStyle()}>
        <text x={this.state.display.cx} y={this.state.display.cy}>
          {this.state.display.value}
        </text>
      </g>
    );
  }
});

var Point = React.createClass({
  propTypes: {
    data: React.PropTypes.object.isRequired,
    field: React.PropTypes.object.isRequired,
    seriesIndex: React.PropTypes.number.isRequired,
    attr: React.PropTypes.object.isRequired,
    style: React.PropTypes.object.isRequired,
    displayActions: React.PropTypes.object.isRequired
  },

    getCxCy(index, data) {
    return this.props.field.getPointWithAxisIndex(index, data);
  },

  render() {
    var p = this.props;
    var self = this;
    return (
      <g>
        {p.data.rows.map((d, i)=>{
          var cxcy = self.getCxCy(i, d[self.props.seriesIndex + 1]);
          return (
            <g>
              <PointCaption
                seriesIndex={self.props.seriesIndex}
                degreeIndex={i}
              />
              <PointCircle
                key={`point-circle-${i}`}
                {...p.attr}
                cx={cxcy.x}
                cy={cxcy.y}
                seriesIndex={self.props.seriesIndex}
                degreeIndex={i}
                value={d[self.props.seriesIndex + 1]}
                style={p.style}
                displayActions={displayActions}
              />
            </g>
          );
        })}
      </g>
    );
  }
});

module.exports = Point;
