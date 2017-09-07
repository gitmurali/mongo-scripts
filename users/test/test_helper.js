const mongoose = require('mongoose');

// hey mongoose use node env es6 implemented Promise library
mongoose.Promise = global.Promise;

// the done callback tells mocha to wait until a connection is open to mongo.
before((done)=> { // this will be called once for entire test suite
    mongoose.connect('mongodb://localhost/users_test', { useMongoClient: true });
    mongoose.connection.once('open', () => {
        done();
    }).on('error', (error) =>{console.warn('warning', error)});
});

beforeEach((done) => { // this will be called before each test case.
    mongoose.connection.collections.users.drop(() => {
          done();
    });
});
