const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userShcema = new Schema({
   name: {
       type: String,
       validate: {
           validator: (name) => name.length > 2,
           message: 'Name must be greater than 2 characters.'
       },
       required: [true, 'requires a name']
   },
   postCount: Number,
});

// mongoose creates collection `user` inside mongo if there's no collection already called `user`.
const User = mongoose.model('user', userShcema);

module.exports = User;
