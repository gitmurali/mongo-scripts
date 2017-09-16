const mongoose = require('mongoose');
const PostSchema = require('./post');
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
   posts: [PostSchema],
   blogPosts: [{
       type: Schema.Types.ObjectId,
       ref: 'blogPost'
   }]
});

userShcema.pre('remove', function (next) {
   const BlogPost = mongoose.model('blogPost');
    BlogPost.remove({_id: {$in: this.blogPosts}})
      .then(() => next());

});
// mongoose creates collection `user` inside mongo if there's no collection already called `user`.
const User = mongoose.model('user', userShcema);

module.exports = User;
