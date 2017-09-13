const assert = require('assert');
const User = require('../src/user');

describe('subdocuments', () => {
    it('can create sub documents', (done) => {
       const murali = new User({
           name: 'murali',
           posts: [
               {title: 'The title of blog post'}
           ]
       });
       murali.save()
         .then(() => User.findOne({name: 'murali'}))
         .then((user) => {
                assert(user.posts[0].title === 'The title of blog post');
                done();
         });
    });

    it('can add subdocuments to existing records', (done) => {
        const murali = new User({
            name: 'murali',
            posts: []
        });
        murali.save()
          .then(() => User.findOne({name: 'murali'}))
          .then((user) => {
              user.posts.push({title: 'first post'});
              return user.save();
          })
          .then(() => User.findOne({name: 'murali'}))
          .then((user) => {
              assert(user.posts[0].title === 'first post');
              done();
          });
    });

    it('can remove subdocument', (done) => {
        const murali = new User({
            name: 'murali',
            posts: [{title: 'muralis post'}]
        });
        murali.save()
          .then(() => User.findOne({name: 'murali'}))
          .then((user) => {
              const post = user.posts[0];
              post.remove();
              return user.save();
          })
          .then(() => User.findOne({name: 'murali'}))
          .then((user) => {
              assert(user.posts.length === 0);
              done();
          });
    })
});