var React = require('react');
var Config = React.createClass({
  statics: {
    getDefaultConfig: function() {
      return {
        size: 400,
        topBottomPadding: 50,
        leftRightPadding: 150,
        colors: ['#0044dd', '#ff00ff'],
        axis: {
          auxAxisCount: 5,
          axisLine: {
            style: {
              stroke: '#aaa'
            }
          },
          axisTitle: {
            style: {
            }
          },
          auxAxisLine: {
            style: {
              stroke: '#abb'
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
            style: {}
          }
        }
      };
    }
  },

  getDefaultProps() {
    return this.getDefaultConfig();
  },

  getInitialState() {
    return this.props;
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
        console.log('color' + (name.match(/(\d)/)[1]*1-1), val);
        this.state.colors[name.match(/(\d)/)[1]*1-1] = val;
      } else {
        valid = false;
      }
      break;

      case 'point-r':
      val = parseInt(val);
      this.state.series.point.attr.r = val;
      break;
    }
    if(valid) {
      this.props.configActions.change(this.state);
    }
  },

  render() {
    return (
      <div>
        <h3> Turbine Temperature Data Radar Chart!! </h3>
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
        </form>
      </div>
    );
  }
});

module.exports = Config;
