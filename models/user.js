var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new Schema({
    username:String,
    password:String,
    type:Number //0 judge 1 student
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('user', userSchema);
