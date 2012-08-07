var Schema = require('mongoose').Schema;

var User = new Schema({
  userId: String,
  name  : String,
  pass  : String,
  email : String,
  created : Date,
});


exports.User = mongoose.model('User', User);
