var is = require('is_js');
class FileDropZone {
  constructor(elOrSelector, controller) {
    if(is.string(elOrSelector)) {
      elOrSelector =document.querySelector(elOrSelector)
    }
    this.$el = elOrSelector;
    this.$fileField = this.$el.querySelector('input[type=file]');
    this.$fileField.addEventListener('change',
      this.onChangeFileSelect.bind(this));

    this.controller = controller;
  }

  onChangeFileSelect(e) {
    console.log('select file:', e);
    var files = e.target.files;
    if(files.length > 1) {
      alert('ごめん。ファイルは1つだけ選んでほしいねん。');
      throw new Error('ファイルが複数選択されました');
    }

    this.controller.dispatch('FileSelect', files[0]);
  }
}

module.exports = FileDropZone;
