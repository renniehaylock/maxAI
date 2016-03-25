var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: String,
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

userSchema.methods.validPassword = function( pwd ) {
    return ( this.password === pwd );
};

var User = mongoose.model('User', userSchema);


module.exports = User;