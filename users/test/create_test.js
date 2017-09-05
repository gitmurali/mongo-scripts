const assert = require('assert');
const User = require('../src/user');


describe('Creating records', () => {
    it('save a user', () => {
        const murali = new User({
            name: 'Murali'
        });
        murali.save();
    });
});
