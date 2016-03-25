var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var actionSchema = new Schema({
  channel: {type: Schema.Types.ObjectId, ref: 'Channel'},
  endpoint: String,
  type: String,
});

var Action = mongoose.model('Action', actionSchema);


module.exports = Action;