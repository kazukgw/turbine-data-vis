var Reflux = require('reflux');
var FileActions = require('actions/file_actions');
var FileStore = Reflux.createStore({
  listenables: FileActions,

  onAdd(file) {
    if( !(file instanceof File) ) {
      throw new Error(`FileList#onAdd: ${file} is not File instance.`);
    }

    this.files[file.name] = file;
    this.trigger(this.files);
  },

  onRemove(fileName) {
    var file = this.files[fileName];
    if( !(file instanceof File) ) {
      throw new Error(`FileList#onRemove: files[${fileName}] is not File instance.`);
    }

    delete this.files[file.name];
    this.trigger(this.files);
  },

  getFile(fileName) {
    return this.files[fileName];
  },

  files: {}
});

module.exports = FileStore;
