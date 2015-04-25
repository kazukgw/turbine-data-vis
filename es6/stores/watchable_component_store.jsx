var Reflux = require('reflux');
var WatchableComponentStore = Reflux.createStore({
  onLoadFromUrl(url) {
    this.trigger(this.components);
  },

  getComponent(name) {
    return this.components[name];
  },

  components: {
    turbineTemperatureRadarChart:
      require('watchable_components/turbine_temperature_radar_chart/index'),
    turbineTemperature3DContour:
      require('watchable_components/3dcontour/index')
  }
});

module.exports = WatchableComponentStore;
