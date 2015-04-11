var React = require('react');
var Config = React.createClass({
  propTypes: {
    onChangeAction: React.PropTypes.object.isRequired,
    viewInstance: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return this.props;
  },

  componentDidMount() {
    var self = this;
    this.props.configStore.listen((v)=>{
      console.log('=====>', v);
      self.setState({'config': v});
    });
  },

  handleChange(name, e) {
    console.log('handleChange====>', name, e);
    this.setState({name: e.target.value});
    this.props.configActions.change(this.state);
  },

  render() {
    return (
      <div>
        <h3> Turbine Temperature Data Radar Chart!! </h3>
        <div>
          size:
          <input type="number"
            value={this.props.size}
            onChange={this.handleChange.bind(this, 'size')}/>
        </div>
        <div>
          padding vertical:
          <input type="number"
            value={this.props.topBottomPadding}
            onChange={this.handleChange.bind(this, 'topBottomPadding')}
          />
        </div>
        <div>
          padding horizontal:
          <input type="number"
            value={this.props.leftRightPadding}
            onChange={this.handleChange.bind(this, 'leftRightPadding')}
          />
        </div>
        <div>
          colors1: <input type="text"/> <br/>
          colors2: <input type="text"/> <br/>
          colors3: <input type="text"/> <br/>
        </div>
        <div>
          <h4>series</h4>
          <div>
            <h5>point</h5>
            <div>
              attr <br/>
              <textarea />
            </div>
            <div>
              style <br/>
              <textarea />
            </div>
          </div>
        </div>
        <div>
          <h4>axis</h4>
        </div>
        <div>
          <h4>legend</h4>
        </div>
      </div>
    );
  }
});



module.exports = Config;
