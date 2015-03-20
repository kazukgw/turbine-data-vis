var _ = require('lodash');
var interact = require('interact.js');
var RadarChart = require('../radar_chart/radar_chart');
class ChartWindow {
  constructor(data, config) {
    this.data = data;
    this.config = {
      fileNameHeight: 25,
      width: 700,
      height: 500
    };
    _.assign(this.config, config);

    this.htmlClassList = ['chart-window'];

    this.radarChart = new RadarChart(this.data);

    this.chartOffset = {
      x: 0,
      y: 0,
      width: this.config.width || 700,
      height: this.config.height || (500 - this.config.fileNameHeight),
    };

    ChartWindow.windows.push(this);
  }

  render(selector) {
    this.selector = selector;
    this._initWindow();

    this.radarChart.render(this);
  }

  config(conf) {
    this.config = _.assign(this.config, conf);
    return this.config;
  }

  remove() {

  }

  setSize(w, h) {
    this.config.width = w;
    this.config.height = h;
    // this.d3$chartWindow.style('width', w).style('height', h);

    this.chartOffset.width = w;
    this.chartOffset.height = h - this.config.fileNameHeight;
    this.radarChart.resetSize();
  }

  _initWindow() {
    var index = ChartWindow.windows.length - 1;
    this.htmlClassList.push(`chart-window-${index}`);
    this.d3$chartWindow = d3.select(this.selector)
                            .append('div')
                            .attr('class', this.htmlClassList.join(' '))
                            .style('width', this.config.width + 'px')
                            .style('height', this.config.height + 'px');

    this.d3$chartWindow.append('div').attr('class','file-name')
                       .append('span').text(this.config.fileName);

    this._interactize();
  }

  _interactize() {
    var self = this;
    var index = ChartWindow.windows.length - 1;
    interact(`div.chart-window-${index}`)
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
}
ChartWindow.windows = [];

module.exports = ChartWindow;
