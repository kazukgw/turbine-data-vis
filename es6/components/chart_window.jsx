var _ = require('lodash');
var React = require('react');
var Reflux = require('reflux');
var OverlayMixin = require('react-bootstrap').OverlayMixin;
var ConfigModal = require('components/config_modal');
var Button = require('react-bootstrap').Button;
var interact = require('interact.js');
var IntermediateDataActions = require('actions/intermediate_data_actions');

var ChartWindow = React.createClass({
  mixins: [OverlayMixin],

  propTypes: {
    data: React.PropTypes.object.isRequired,
    component: React.PropTypes.object.isRequired
  },

  componentDidMount() {
    this.interactize();
  },

  render() {
    var View = this.props.component.view;
    return (
      <div className='chart-window' ref='chartWindow' style={this.state.style}>
        <div className='file-name'>
          <div className='pull-left'>{this.props.data.key}</div>
          <div className='pull-right'
            onClick={this.handleClickRemoveButton}
            style={{ padding: '0 2px', cursor: 'pointer' }} >
            <i className="fa fa-times"></i>
          </div>
          <div className='pull-right'
            style={{ padding: '0 2px', cursor: 'pointer', marginRight: '5px' }}
            onClick={this.handleModalToggle} >
            <i className="fa fa-cog"></i>
          </div>
        </div>
        <div style={{width: this.state.chartOffset.width + 'px',
                     height: this.state.chartOffset.height + 'px'}} >
          <View
            ref='view'
            {...this.state.configStore.config}
            data={this.props.data}
            configStore={this.state.configStore}
            configActions={this.state.configActions}
            outerWidth={this.state.chartOffset.width}
            outerHeight={this.state.chartOffset.height}
          />
        </div>
      </div>
    );
  },

  renderOverlay() {
    if (!this.state.isModalOpen) { return <span/>; }

    return (
      <ConfigModal
        title={this.props.data.key}
        {...this.state.configStore.config}
        configComponent={this.props.component.config}
        configStore={this.state.configStore}
        configActions={this.state.configActions}
        handleModalToggle={this.handleModalToggle}
        handleClickDownloadAsImg={this.handleClickDownloadAsImg}
      />
    );
  },

  handleModalToggle() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  },

  handleClickDownloadAsImg() {
    var svg = React.findDOMNode(this.refs.view);
    var svgStr = (new XMLSerializer()).serializeToString(svg);
    var svgBlob = new Blob([decodeURIComponent(svgStr)],
                           { type: "image/svg+xml;charset=utf-8" });
    var svgURL = URL.createObjectURL(svgBlob);

    var canvas = document.createElement('canvas');
    canvas.setAttribute('width', svg.getAttribute('width'))
    canvas.setAttribute('height', svg.getAttribute('height'))

    var dummyLink = document.createElement('a');
    var img = new Image();
    img.onload = ()=>{
      canvas.getContext("2d").drawImage(img, 0, 0);
      dummyLink.setAttribute('href', canvas.toDataURL('image/png'));
      dummyLink.setAttribute('download', 'chart.png');
      dummyLink.click();
      URL.revokeObjectURL(svgURL);
    };
    img.src = svgURL;
  },

  handleClickRemoveButton() {
    IntermediateDataActions.remove(this.props.data.key);
  },

  initConfigActionAndStore() {
    var action = {
      change: Reflux.createAction('change'),
      reset: Reflux.createAction('reset')
    };
    var store = Reflux.createStore({
      listenables: action,
      onChange(config) {
        this.config = config;
        this.trigger(this.config);
      },
      config: this.getDefaultConfig(this.props.data)
    });
    return { action, store };
  },

  getDefaultConfig(data) {
    return this.props.component.config.getDefaultConfig(data);
  },

  getInitialState() {
    var [width, height] = [700, 500];
    var actionAndStore = this.initConfigActionAndStore();
    return {
      width,
      height,
      fileNameHeight: 25,
      chartOffset: {
        x: 0,
        y: 0,
        width: width,
        height: height - 25
      },
      style: {
        width,
        height,
        position: 'absolute'
      },
      isModalOpen: false,
      configStore: actionAndStore.store,
      configActions: actionAndStore.action
    };
  },

  setSize(w, h) {
    this.setState((previous, props)=>{
      previous.width = w;
      previous.height = h;
      previous.style.width = w;
      previous.style.height = h;
      previous.chartOffset.width = w;
      previous.chartOffset.height = h - 25;
      return previous;
    });
  },

  interactize() {
    var self = this;
    interact(React.findDOMNode(this.refs.chartWindow))
      .draggable({
        autoScroll: true,
        restrict: {
          restriction: "parent",
          elementRect: { top: 0, left: 0, bottom: 0, right: 1 }
        },
        onmove: (e)=>{
          var target = e.target,
          x = (parseFloat(target.getAttribute('data-x')) || 0) + e.dx,
          y = (parseFloat(target.getAttribute('data-y')) || 0) + e.dy;
          target.style.webkitTransform =
          target.style.transform = `translate(${x}px, ${y}px)`;
          target.setAttribute('data-x', x);
          target.setAttribute('data-y', y);
        }
      })
      .resizable({
        inertia: true,
        edges: {
          top   : false,
          left  : false,
          bottom: true,
          right : true
        }
      })
      .on('resizemove', (e)=>{
        var target = e.target;
        var width = (e.rect.width < 200) ? 200 : e.rect.width;
        var height = (e.rect.height < 200) ? 200 : e.rect.height;
        target.style.width  = width + 'px';
        target.style.height = height + 'px';
        self.setSize(width, height);
      });
  }
});

module.exports = ChartWindow;
