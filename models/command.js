var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Action is nil if we just need to send back a text response
var commandSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  action: {type: Schema.Types.ObjectId, ref: 'Action'},
  query: String,
  response: String,
});

var Command = mongoose.model('Command', commandSchema);


module.exports = Command;