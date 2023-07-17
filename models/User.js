const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['Admin', 'Manager', 'Developer'],
    required: true
  },
  createrRole:{
    type:String
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
