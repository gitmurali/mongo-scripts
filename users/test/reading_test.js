const assert = require('assert');
const User = require('../src/user');

// retrieve records from mongodb.
describe('reading users from db', () => {
    let murali, prashanth, bobby, candy, zach;

    beforeEach((done) => {
        murali = new User({name: 'murali'});
        prashanth = new User({name: 'prashanth'});
        bobby = new User({name: 'bobby'});
        candy = new User({name: 'candy'});
        zach = new User({name: 'zach'});
        Promise.all([
          murali.save(),
          prashanth.save(),
          bobby.save(),
          candy.save(),
          zach.save()]).then(() => {
            done();
        })
    });

    // done = tells mocha that this test takes sometime and call's done
    it('finds all of users with name murali', (done) => {
        User.find({name:'murali'}).then((users) => {
            assert(users[0]._id.toString() === murali._id.toString());
            done();
        })
    });

    it('find a user with a particular id', (done) => {
        User.findOne({_id: murali._id}).then((user) => {
            assert(user.name === 'murali');
            done();
        })
    });

    it('can skip and limit the result set and also sort by name in ascending', () => {
        User.find({}).skip(1).limit(3).sort({name:1}).then((users) => {
            console.log(users);
        });
    });
});
