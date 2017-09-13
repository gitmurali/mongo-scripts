const assert = require('assert');
const User = require('../src/user');

describe('validating records', () => {

    it('requires a username', (done) => {
        const user = new User({
            name: undefined
        });
        const validationResult = user.validateSync();
        const { message } = validationResult.errors.name;

        assert(message === 'requires a name');
        done();
    });

    it('requires a username to have length greater than 2', (done) => {
        const user = new User({
            name: 'mu'
        });
        const validationResult = user.validateSync();
        const { message } = validationResult.errors.name;

        assert(message === 'Name must be greater than 2 characters.');
        done();
    });

    it('disallows invalid records from being saved.', (done) => {
        const user = new User({
            name: 'mu'
        });
        user.save()
          .catch((validationResult) => {
              const { message } = validationResult.errors.name;
              assert(message === 'Name must be greater than 2 characters.');
              done();
          });
    });
});