var is = require('is_js');
var DropZone = require('dropzone');
var React = require('react');
var FileActions = require('actions/file_actions');

var FileDropZone = React.createClass({
  componentDidMount() {
    var dom = React.findDOMNode(this.refs.fileDropZone);
    new DropZone(dom, {
      url: '/', // dummy
      clickable: true,
      previewTemplate: '<div style="display:none"></div>',
      accept: this.acceptHandler.bind(this)
    });
  },

  acceptHandler(file) {
    FileActions.add(file);
  },

  render() {
    return (
      <div className='file-drop-zone col-xs-12' ref='fileDropZone'>
        <p className="dz-message">Drop files here or click</p>
        <i className='fa fa-arrow-circle-o-down dz-message'></i>
        <input className='file-field' ref='fileDropZone'
          type='file' name='file' style={{display: 'none'}} />
      </div>
    );
  }
});

module.exports = FileDropZone;
