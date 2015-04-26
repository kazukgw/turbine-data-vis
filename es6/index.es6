var React = require('react');

// UI
var FileList = require('components/file_list');
var FileDropZone = require('components/file_drop_zone');
var MainWindow = require('components/main_window');

var Modal = require('react-bootstrap').Modal;
var Button = require('react-bootstrap').Button;
var OverlayMixin = require('react-bootstrap').OverlayMixin;

var Navbar = React.createClass({
  mixins: [OverlayMixin],

  getInitialState() {
    return { isModalOpen: false };
  },

  renderOverlay() {
    if (!this.state.isModalOpen) { return <span/>; }

    return (
      <Modal bsStyle='primary'
        title='About'
        onRequestHide={this.handleModalToggle}>
        <div className='modal-body'>
        <h2 id="watchable">Watchable</h2>
        <p>Watchable はあらゆるデータの統合的可視化ツールを目指してつくられています。</p>
        <h2 id="usage">Usage</h2>
        <h3 id="1-">1. データを追加</h3>
        <p>CSVファイルをFileListに追加します</p>
        <p><img style={{width: '500px'}} src="/img/drop_file_here_or_click.png" alt="drop_file_here_or_click" /></p>
        <h3 id="2-">2. 描画</h3>
        <p>FileList に追加されたファイルをクリックして
        でてきたメニューからさらに <code>Render</code> ボタンをクリックします。</p>
        <p><img style={{width: '500px'}} src="/img/click_render.png" alt="click_render" /></p>
        <p><img style={{width: '500px'}} src="/img/radar_chart.png" alt="radar_chart" /></p>
                </div>
        <div className='modal-footer'>
          <Button onClick={this.handleModalToggle}>Close</Button>
        </div>
      </Modal>
    );
  },

  handleModalToggle() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  },

  render() {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <a className="navbar-brand" href="#">Watchable</a>

          <ul className="nav navbar-nav">
            <li><a href="#" onClick={this.handleModalToggle}>About</a></li>
          </ul>

          <p className="navbar-text navbar-right" style={{fontSize: '13px'}}>
            &copy; 2015 Watchable. All rights reserved.
            Developed by
            <a href="https://github.com/kazukgw/watchable"
               target="_blank"
               className="navbar-link"
               style={{color: '#999'}}>
              Kazuya Kagawa
            </a>
          </p>
        </div>
      </nav>
    );
  }
});

React.render(<Navbar/>, document.querySelector('header'));

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
  , document.querySelector('.main-wrapper'));
