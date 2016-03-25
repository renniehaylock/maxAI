var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userChannelSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  channel: {type: Schema.Types.ObjectId, ref: 'Channel'},
  userId: String,
  token: String,
});

var UserChannel = mongoose.model('UserChannel', userChannelSchema);


module.exports = UserChannel;