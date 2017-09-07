const assert = require('assert');
const User = require('../src/user');

// retrieve records from mongodb.
describe('reading users from db', () => {
    let murali;

    beforeEach((done) => {
        murali = new User({
            name: 'murali',
        });
        murali.save().then(() => done());
    });

    // done = tells mocha that this test takes sometime and call's done
    it('finds all of users with name murali', (done) => {
        User.find({name:'murali'}).then((users) => {
            assert(users[0]._id.toString() === murali._id.toString());
            done();
        })
    });
});
