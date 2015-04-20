var React = require('react');
var Config = React.createClass({
  statics: {
    getDefaultConfig: function(data) {
      var dataRangeMin, dataRangeMax;
      var max, min, sub;
      if(data) {
        max = parseInt(data.getMax());
        min = parseInt(data.getMin());
        sub = max - min;
        dataRangeMin = min - sub;
        dataRangeMax = max + sub/2;
      } else {
        dataRangeMin = 0;
        dataRangeMax = 0;
      }
      return {
        data: data || {},
        size: 400,
        topBottomPadding: 80,
        leftRightPadding: 150,
        dataRangeMin: dataRangeMin,
        dataRangeMax: dataRangeMax,
        colors: ['#0044dd', '#ff00ff'],
        axis: {
          auxAxisCount: 5,
          axisLine: {
            style: {
              stroke: '#666'
            }
          },
          axisTitle: {
            style: {
              fontSize: '14px',
              fill: '#000000',
              fillOpacity: 1
            }
          },
          auxAxisLine: {
            style: {
              stroke: '#666',
              strokeWidth: '1px',
              fillOpacity: 0
            }
          }
        },
        series: {
          point: {
            attr: { r: 2 },
            style: {}
          },
          polygon: {
            attr: {},
            style: { fillOpacity: 0 }
          },
        },
        legend: {
          line: {
            style: { strokeWidth: '2px' }
          },
          text: {
            style: {
              fontSize: '14px',
              fill: '#000000',
              fillOpacity: 1
            }
          }
        }
      };
    }
  },

  getDefaultProps() {
    return this.getDefaultConfig();
  },

  getInitialState() {
    var p = this.props;
    return p;
  },

  componentDidMount() {
    var self = this;
    this.props.configStore.listen((v)=>{
      self.setState(v);
    }.bind(self));
  },

  handleChange(e) {
    var val = e.target.value;
    var name = e.target.getAttribute('data-name')
    var valid = true;
    switch(name) {
      case 'topBottomPadding':
      case 'leftRightPadding':
      val = parseInt(val);
      this.state[name] = val;
      break;

      case 'color1':
      case 'color2':
      if(/^#[0-9a-fA-F]{6}$/.test) {
        this.state.colors[name.match(/(\d)/)[1]*1-1] = val;
      } else {
        valid = false;
      }
      break;

      case 'point-r':
      val = parseInt(val);
      this.state.series.point.attr.r = val;
      break;

      case 'dataRangeMin':
      val = parseInt(val);
      this.state.dataRangeMin = val;
      break;

      case 'dataRangeMax':
      val = parseInt(val);
      this.state.dataRangeMax = val;
      break;
    }
    if(valid) {
      this.props.configActions.change(this.state);
    }
  },

  render() {
    return (
      <div>
        <form className="form-horizontal">
          <div className="form-group">
            <label className="col-sm-2 control-label">
              Padding Vertical
            </label>
            <div className="col-sm-10">
              <input type="number"
                className="form-control"
                value={this.state.topBottomPadding}
                data-name="topBottomPadding"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">
              Padding Horizontal
            </label>
            <div className="col-sm-10">
              <input type="number"
                className="form-control"
                value={this.state.leftRightPadding}
                data-name="leftRightPadding"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">
            color1
            </label>
            <div className="col-sm-10">
              <input type="text"
                className="form-control"
                data-name="color1"
                defaultValue={this.state.colors[0]}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">
            color2
            </label>
            <div className="col-sm-10">
              <input type="text"
                className="form-control"
                data-name="color2"
                defaultValue={this.state.colors[1]}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">
              point-r
            </label>
            <div className="col-sm-10">
              <input type="number"
                className="form-control"
                data-name="point-r"
                value={this.state.series.point.attr.r}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">
              range min
            </label>
            <div className="col-sm-10">
              <input type="number"
                className="form-control"
                data-name="dataRangeMin"
                value={this.state.dataRangeMin}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">
              range max
            </label>
            <div className="col-sm-10">
              <input type="number"
                className="form-control"
                data-name="dataRangeMax"
                value={this.state.dataRangeMax}
                onChange={this.handleChange}
              />
            </div>
          </div>

        </form>
      </div>
    );
  }
});

module.exports = Config;
