var React = require('react');
var Reflux = require('reflux');
var IntermediateDataStore = require('stores/intermediate_data_store');
var ComponentStore = require('stores/watchable_component_store');
var ChartWindow = require('components/chart_window');
var _ = require('lodash');

var MainWindow = React.createClass({
  mixins: [Reflux.connect(IntermediateDataStore, 'intermediateData')],

  getInitialState() {
    return {
      windowCount: 0,
      intermediateData: {}
    }
  },

  render() {
    return (
      <div style={{width: '100%', height: '100%'}}>
        {_.map(this.state.intermediateData, (data, key)=>{
          return (
            <ChartWindow
              key={key}
              data={data}
              component={ComponentStore.getComponent(data.componentName)}
            />
          );
        })}
      </div>
    );
  }
});

module.exports = MainWindow;
