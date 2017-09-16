const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('Middleware', () => {
    let murali, blogPost;
    beforeEach((done) => {
        murali = new User({name: 'murali'});
        blogPost = new BlogPost({title: 'hello world', content: 'some content'});

        murali.blogPosts.push(blogPost);

        // save all in parallel...
        Promise.all([murali.save(), blogPost.save()]).then(() => {
            done();
        });
    });

    it('users clean up dangling blog posts on delete', (done) => {
        murali.remove()
          .then(() => BlogPost.count())
          .then((count) => {
                assert(count === 0);
                done();
          })
    });
});
