const mongoose = require('mongoose');

// hey mongoose use node env es6 implemented Promise library
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/users_test', { useMongoClient: true });
mongoose.connection.once('open', () => {})
    .on('error', (error) =>{console.warn('warning', error)});

beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
          done();
    });
});
