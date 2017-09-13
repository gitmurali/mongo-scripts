const assert = require('assert');
const User = require('../src/user');

// updating records
describe('updating records', () => {
    let murali;

    beforeEach((done) => {
        murali = new User({
            name: 'murali',
            postCount: 0
        });
        murali.save().then(() => done());
    });

    function assertName(operation, done) {
        operation.then(() => User.find({}))
            .then((users) => {
                assert(users.length === 1);
                assert(users[0].name === 'candy');
                done();
            });
    }

    it('instance type using set and save', (done) => {
        murali.set('name', 'candy');
        assertName(
          murali.save(),
          done
        );
    });

    it('a model instance can update', (done) => {
        assertName(
          murali.update({name: 'candy'}),
          done
        );
    });

    it('model class can update one record', (done) => {
        assertName(
          User.findOneAndUpdate({name: 'murali'}, {name: 'candy'}),
          done
        );
    });

    it('model class can find a record with an ID and update', (done) => {
        assertName(
          User.findByIdAndUpdate(murali._id, {name: 'candy'}),
          done
        );
    });

    it('A user can have post count incremented by 1', () => {
        User.update({name: 'murali'}, {$inc: {postCount: 10}})
        .then(() => User.findOne({name: 'murali'}))
        .then((user) => {
             assert(user === 1);
             done();
         });
    });
});
