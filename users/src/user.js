const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userShcema = new Schema({
   name: String,
   postCount: Number,
});

// mongoose creates collection `user` inside mongo if there's no collection already called `user`.
const User = mongoose.model('user', userShcema);

module.exports = User;
