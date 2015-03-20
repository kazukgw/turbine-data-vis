var _ = require('lodash');
var Field = require('./radar_chart_field');
var Axis = require('./radar_chart_axis');
var Point = require('./radar_chart_point');
var Polygon = require('./radar_chart_polygon');
var Series = require('./radar_chart_series');
var Caption = require('./radar_chart_caption');
class RadarChart {
  constructor(data, config) {
    this.data = data;
    this.topBottomPadding = 50;
    this.leftRightPadding = 150;
    this.fileNameHeight = 25;
    this.config = config;
  }

  render($container, size) {
    var self = this;
    this._container = $container;
    this.$container = d3.select($container);

    this.center = {
      x: size/2 + this.leftRightPadding,
      y: size/2 + this.topBottomPadding
    };
    this.size = size;
    this.width = this.size+(this.leftRightPadding*2);
    this.height = this.size+(this.topBottomPadding*2);

    this._setField();
    this._setAxis();
    this._setSeries();

    this.$chartContainerWrapper = this.$container
                                      .append('div')
                                      .attr('class','chart-container-wrapper')
                                      .style('width', this.width + 'px')
                                      .style('height', (this.height + this.fileNameHeight) + 'px');

    this.$chartContainerWrapper.append('div').attr('class','file-name')
                               .append('span').text(this.config.fileName);

    this.$scaleButton = this.$chartContainerWrapper.append('div')
                               .attr('class','scale-button')
                               .style('left', this.width + 'px')
                               .style('top', (this.height + 6) + 'px');
    this.$scaleButton.append('i').attr('class','fa fa-arrows-alt');

    var sb = this.$scaleButton[0][0];
    sb.addEventListener('click', function init() {
        sb.removeEventListener('click', init, false);
        // sb.className = p.className + ' resizable';
        // var resizer = document.createElement('div');
        // resizer.className = 'scale-button';
        // sb.appendChild(resizer);
        sb.addEventListener('mousedown', initDrag, false);
    }, false);

    var startX, startY, startWidth, startHeight;
    function initDrag(e) {
      console.log('init drag');
      startX = e.clientX;
      startY = e.clientY;
      startWidth = parseInt(document.defaultView.getComputedStyle(self.$chartContainerWrapper[0][0]).width, 10);
      startHeight = parseInt(document.defaultView.getComputedStyle(self.$chartContainerWrapper[0][0]).height, 10);
      document.documentElement.addEventListener('mousemove', doDrag, false);
      document.documentElement.addEventListener('mouseup', stopDrag, false);
    }


    function doDrag(e) {
      console.log('drag');
       self.$chartContainerWrapper[0][0].style.width = (startWidth + e.clientX - startX) + 'px';
       self.$chartContainerWrapper[0][0].style.height = (startHeight + e.clientY - startY) + 'px';
    }

    function stopDrag(e) {
        console.log('drag stop');
        document.documentElement.removeEventListener('mousemove', doDrag, false);    document.documentElement.removeEventListener('mouseup', stopDrag, false);
    }

    this.$chartContainer = this.$chartContainerWrapper
                               .append('svg')
                               .attr('width', this.width)
                               .attr('height', this.height)
                               .attr('class', 'chart-container');

    this.$axisContainer = this.$chartContainer
                              .append('g').attr('class', 'axis-container');
    this.axis.render(this.$axisContainer);

    this.seriesArr.forEach((s)=>{
      var $seriesContainer = self.$chartContainer
                                 .append('g')
                                 .attr('data-series-index', s.index)
                                 .attr('class', 'series-container');
      s.render($seriesContainer);
    });

    var captionX = this.size + this.leftRightPadding;
    var captionY = this.topBottomPadding;
    this.caption = new Caption(this.seriesArr);
    this.$captionContainer = this.$chartContainer
                               .append('g')
                               .attr('class', 'caption')
                               .attr('transform', `translate(${captionX},${captionY})`);

    this.caption.render(this.$captionContainer);
  }

  _setSeries() {
    this.seriesArr = [];
    var self = this;
    _.times(this.data.getSeriesCount(), (index)=>{
      var realIndex = index + 1;
      var point = new Point(self.data, self.field, realIndex);
      var polygon = new Polygon(self.data, self.field, realIndex);
      self.seriesArr.push(new Series(self.data, point, polygon, index));
    });
  }

  _setAxis() {
    this.axis = new Axis(this.data, this.field);
  }

  _setField() {
    this.field = new Field(this.data, this.size);
    this.field.setCenter(this.center.x, this.center.y);
  }
}

module.exports = RadarChart;
