const assert = require('assert');
const User = require('../src/user');


describe('Creating records', () => {
    it('save a user', (done) => {
        const murali = new User({
            name: 'Murali'
        });

        murali.save().then(()=>{
            // isNew is a mongoose helper to find out if user record is saved or not if it's saved
            // then isNew is set to false
            assert(!murali.isNew);
            done();
        });
    });
});
