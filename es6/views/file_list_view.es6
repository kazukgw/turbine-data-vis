var Vue = require('vue');
class FileListView {
  constructor(selector, fileList) {
    this.vm = new Vue({
      el: selector,
      data: fileList
    });
    window.vm = this.vm;
  }
}

module.exports = FileListView;

