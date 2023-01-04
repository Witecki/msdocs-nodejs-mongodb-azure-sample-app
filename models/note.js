const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  noteName: {
    type: String,
    trim: true,
  },
  createDate: Date,
  completedDate: Date,
  completed: Boolean
});

module.exports = mongoose.model('Note', noteSchema);