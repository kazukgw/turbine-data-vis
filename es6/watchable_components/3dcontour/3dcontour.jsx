var React = require('react');
var Field = require('./field');

var threeDContour = React.createClass({
  render(){
    return (
      <Field
        data={this.props.data}
        outerWidth={this.props.outerWidth}
        outerHeight={this.props.outerHeight}
      />
    );
  }
});

module.exports = threeDContour;
