var mongoUri  = process.env.MONGOLAB_URI || "mongodb://localhost/gymserver",
    db        = require('mongoose').connect( mongoUri );
    Schema    = db.Schema;

console.log(process.env);

var ClientSchema = new Schema({
  name: {
    display: String,
    full:    String,
    first:   String,
    last:    String,
  },
  email: {
    primary: String,
  },
  password: String,
});

var ClientModel = db.model('ClientModel', ClientSchema);

module.exports = ClientModel;
