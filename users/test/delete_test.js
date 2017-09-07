const assert = require('assert');
const User = require('../src/user');

// retrieve records from mongodb.
describe('Deleting a user', () => {
    let candy;

    beforeEach((done) => {
        candy = new User({
            name: 'candy',
        });
        candy.save().then(() => done());
    });

    it('model instance remove', (done) => {
        candy.remove().then(() => {
            User.findOne({name: 'candy'}).then((user) => {
                assert(user === null);
                done();
            })
        });
    });

    it('class instance remove', (done) => {
        // remove bunch of records with name candy
        User.remove({name: 'candy'}).then(() => {
            User.findOne({name: 'candy'}).then((user) => {
                assert(user === null);
                done();
            })
        });
    });

    it('class method findOneAndRemove', (done) => {
        User.findOneAndRemove({_id: candy._id}).then(() => {
            User.findOne({name: 'candy'}).then((user) => {
                assert(user === null);
                done();
            })
        });
    });

    it('class method findByIdAndRemove', (done) => {
        User.findByIdAndRemove(candy._id).then(() => {
            User.findOne({name: 'candy'}).then((user) => {
                assert(user === null);
                done();
            })
        });
    });
});
