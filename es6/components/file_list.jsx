var React = require('react');
var Reflux = require('reflux');
var FileStore = require('stores/file_store');
var DropdownButton = require('react-bootstrap').DropdownButton;
var MenuItem = require('react-bootstrap').MenuItem;
var FileActions = require('actions/file_actions');
var IntermediateDataActions = require('actions/intermediate_data_actions');
var _ = require('lodash');

var File = React.createClass({
  propTypes: {
    fileName: React.PropTypes.string.isRequired
  },

  handleClickRender(e) {
    IntermediateDataActions.load(this.props.fileName,
                                 'turbineTemperatureRadarChart');
  },

  handleClickRemove(e) {
    FileActions.remove(this.props.fileName);
  },

  render() {
    return (
      <li>
        <DropdownButton title={this.props.fileName}
          style={{ width: '100%', borderRadius: '0' }}>
          <MenuItem eventKey='1' onClick={this.handleClickRender}>Render</MenuItem>
          <MenuItem eventKey='2' onClick={this.handleClickRemove}>Remove</MenuItem>
        </DropdownButton>
      </li>
    );
  }
});

var FileList = React.createClass({
  mixins: [Reflux.connect(FileStore, 'files')],

  getInitialState() {
    return { files: {} }
  },

  render() {
    return (
      <div className="file-list">
        <div className="sidebar-header">
          <h4>File List</h4>
        </div>
        <ul className="nav nav-pills nav-stacked">
          {_.map(this.state.files, (file, fileName)=>{
            return <File fileName={fileName} />;
          })}
        </ul>
      </div>
    );
  }
});

module.exports = FileList;
