var is = require('is_js');
var DropZone = require('dropzone');

class FileDropZone {
  constructor(elOrSelector, controller) {
    if(is.string(elOrSelector)) {
      elOrSelector = document.querySelector(elOrSelector)
    }
    this.$el = elOrSelector;
    this.$fileField = new DropZone(this.$el, {
      url: '/',
      clickable: true,
      previewTemplate: '<div style="display:none"></div>',
      accept: this.onAddedFile.bind(this)
    });

    this.controller = controller;
  }

  onAddedFile(file, done) {
    this.controller.dispatch('FileSelect', file);
    done('uploadはしません');
  }
}

module.exports = FileDropZone;
