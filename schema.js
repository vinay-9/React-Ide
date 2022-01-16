const mongoose = require("mongoose");
const Schema= mongoose.Schema
var userSchema = new Schema({
    name: { type: String, default: 'anonymous' },
    email: { type: String, default: 'random@email.com'},
    password: { type: String, match: /[a-zA-Z ][1-9][@_()&^%$#@!]/ },
});

var codeSchema = new Schema({
    code: { type: String, default: 'anonymous' },
    input: { type: String, default: 'random@email.com'},
    output: { type: String,  },
    execution_time: {type: Date},
    submitted_at: { type: Date},
    user_id: { type: String, default: '1'},
    



});
var userModel = mongoose.model('users', userSchema);
var codeModel = mongoose.model('codes', codeSchema);

module.exports= {userModel, codeModel}
