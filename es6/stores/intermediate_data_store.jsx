var Reflux = require('reflux');
var IntermediateDataActions = require('actions/intermediate_data_actions');
var ComponentStore = require('stores/watchable_component_store');
var FileStore = require('stores/file_store');

var IntermediateDataStore = Reflux.createStore({
  listenables: IntermediateDataActions,

  onLoad(fileName, componentName) {
    var component = ComponentStore.getComponent(componentName);
    if(!component) { throw new Error(`${component} is not component.`); }

    var file = FileStore.getFile(fileName);
    if(! (file instanceof File) ) { throw new Error(`${file} is not file.`); }

    var key = `${fileName} - ${componentName}`;
    var self = this;
    component.data.load(file)
    .then((_data)=>{
      var _k = self.getKey(key, 0);
      _data.key = _k;
      self.data[_k] = _data;
      self.trigger(self.data);
    });
  },

  onRemove(key) {
    delete this.data[key];
    this.trigger(this.data);
  },

  getKey(key, index) {
    var _k = index ? `${key} - ${index}` : key;
    return this.data[_k] ? this.getKey(key, 1*index+1) : _k;
  },

  data: {}
});

module.exports = IntermediateDataStore;
