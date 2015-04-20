var _ = require('lodash');
var React = require('react');
var Reflux = require('reflux');
var Modal = require('react-bootstrap').Modal;
var Button = require('react-bootstrap').Button;

var ConfigModal = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
    configComponent: React.PropTypes.object.isRequired,
    configStore: React.PropTypes.object.isRequired,
    configActions: React.PropTypes.object.isRequired,
    handleModalToggle: React.PropTypes.func.isRequired,
    handleClickDownloadAsImg: React.PropTypes.func.isRequired
  },

  render() {
    return (
      <Modal bsStyle='primary'
        title={this.props.title}
        onRequestHide={this.props.handleModalToggle}>
        <div className='modal-body'>
          <this.props.configComponent
            {...this.props.configStore.config}
            configStore={this.props.configStore}
            configActions={this.props.configActions} />
        </div>
        <div className='modal-footer'>
          <Button onClick={this.props.handleClickDownloadAsImg}>Download as Image</Button>
          <Button onClick={this.props.handleModalToggle}>Close</Button>
        </div>
      </Modal>
    )
  }
});

module.exports = ConfigModal;
