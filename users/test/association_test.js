const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Associations', () => {
    let murali, blogPost, comment;
    beforeEach((done) => {
        murali = new User({name: 'murali'});
        blogPost = new BlogPost({title: 'hello world', content:'some content'});
        comment = new Comment({content: 'good post!!'});

        murali.blogPosts.push(blogPost);
        blogPost.comments.push(comment);
        comment.user = murali;

        // save all in parallel...
        Promise.all([murali.save(), blogPost.save(),comment.save()]).then(() => {
            done();
        });
    });

    // if we want to run only this test we can use it.only()
    it('saves a relation between a user and a blogpost', (done) => {
        User.findOne({name: 'murali'})
          .populate('blogPosts')
          .then((user) => {
            assert(user.blogPosts[0].title === 'hello world');
            done();
          })
    });

    xit('saves a full relation graph', (done) => {
        User.findOne({name: 'murali'})
          .populate({
              path: 'blogPosts',
              populate: {
                path: 'comments',
                  model: 'comment',
                  populate:{
                    path: 'user',
                      model: 'user'
                  }
              }
          })
          .then((user) => {
                assert(user.name === 'murali');
                assert(user.blogPosts[0].title === 'hello world');
                assert(user.blogPosts[0].comments[0].content === 'good post!!');
                assert(user.blogPosts[0].comments[0].user.name === 'murali');
                done();
          })
    });
});