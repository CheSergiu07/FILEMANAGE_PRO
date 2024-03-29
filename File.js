const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FileSchema = new Schema({
  filename: String,
  url: String
});

const File = mongoose.model('File', FileSchema);

module.exports = File;
