const _ = require('lodash');
const React = require('react');
const Reflux = require('reflux');
const OverlayMixin = require('react-bootstrap').OverlayMixin;
const Modal = require('react-bootstrap').Modal;
const Button = require('react-bootstrap').Button;
const interact = require('interact.js');
const IntermediateDataActions = require('actions/intermediate_data_actions');

var ChartWindow = React.createClass({
  mixins: [OverlayMixin],

  propTypes: {
    data: React.PropTypes.object.isRequired,
    component: React.PropTypes.object.isRequired
  },

  getInitialState() {
    var width = 700;
    var height = 500;
    var configActions = {
      change: Reflux.createAction('change'),
      reset: Reflux.createAction('reset')
    };
    var configStore =  Reflux.createStore({
      listenables: configActions,
      onChange(config) {
        console.log('update config ======>', config);
        this.config = config;
        this.trigger(this.config);
      },
      config: {}
    });
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
      configStore: configStore,
      configActions: configActions
    };
  },

  componentDidMount() {
    this._interactize();
    // でモーダルのコンフィグヴューを設定する
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
            data={this.props.data}
            configStore={this.state.configStore}
            configActions={this.state.configActions}
            outerWidth={this.state.chartOffset.width}
            outerHeight={this.state.chartOffset.height}
            {...this.state.configStore.config}
          />
        </div>
      </div>
    );
  },

  renderOverlay() {
    if (!this.state.isModalOpen) {
      return <span/>;
    }

    var Config = this.props.component.config;
    return (
      <Modal bsStyle='primary'
        title={this.props.data.key}
        onRequestHide={this.handleModalToggle}>
        <div className='modal-body'>
          <Config
            {...this.state.configStore.config}
            configStore={this.state.configStore}
            configActions={this.state.configActions} />
        </div>
        <div className='modal-footer'>
          <Button onClick={this.handleModalToggle}>Close</Button>
        </div>
      </Modal>
    );
  },

  handleModalToggle() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  },

  handleClickRemoveButton() {
    IntermediateDataActions.remove(this.props.data.key);
  },

  setSize(w, h) {
    this.setState((previous, props)=>{
      return {
        width: w,
        height: h,
        chartOffset: {
          x: 0,
          y: 0,
          width: w,
          height: h - previous.fileNameHeight
        }
      };
    });
  },

  _interactize() {
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
          // keep the dragged position in the data-x/data-y attributes
          x = (parseFloat(target.getAttribute('data-x')) || 0) + e.dx,
          y = (parseFloat(target.getAttribute('data-y')) || 0) + e.dy;
          // translate the element
          target.style.webkitTransform =
          target.style.transform = `translate(${x}px, ${y}px)`;
          // update the posiion attributes
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
