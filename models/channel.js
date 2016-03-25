var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var channelSchema = new Schema({
  name: String,
  website: String,
});

var Channel = mongoose.model('Channel', channelSchema);


module.exports = Channel;