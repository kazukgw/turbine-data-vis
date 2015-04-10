var React = require('react');

// UI
var FileList = require('components/file_list');
var FileDropZone = require('components/file_drop_zone');
var MainWindow = require('components/main_window');

React.render(
  <div className="main">
    <div id="sidebar" className="col-xs-2">
      <FileList />
      <FileDropZone />
    </div>
    <div id="container" className="col-xs-10">
      <div id="charts-wrapper" className="col-xs-12">
        <MainWindow />
      </div>
    </div>
  </div>
  , document.querySelector('.main-wrapper')
);
