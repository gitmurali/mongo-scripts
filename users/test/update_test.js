const assert = require('assert');
const User = require('../src/user');

// updating records
describe('updating records', () => {
    let murali;

    beforeEach((done) => {
        murali = new User({
            name: 'murali',
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
        done();
    });

    it('a model instance can update', (done) => {
        assertName(murali.update({name: 'prashanth'}), done);
        done();
    });

    it('model class can update one record', (done) => {
        assertName(
          User.findOneAndUpdate({name: 'murali'}, {name: 'prashanth'}),
          done
        );
        done();
    });

    it('model class can find a record with an ID and update', (done) => {
        assertName(
          User.findByIdAndUpdate(murali._id, {name: 'prashanth'}),
          done
        );
        done();
    });
});
