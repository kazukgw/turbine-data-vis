var React = require('react');
var Config = React.createClass({
  statics: {
    getDefaultConfig: function(data) {
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
      //
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
            </label>
            <div className="col-sm-10">
            </div>
          </div>
        </form>
      </div>
    );
  }
});

module.exports = Config;
