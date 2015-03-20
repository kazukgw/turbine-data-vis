var FileList = {
  files: [],
  addFile(file) {
    this.files.push(file);
    console.log('added file:', file);
  }
};

module.exports = FileList;
