const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/users_test', { useMongoClient: true });
mongoose.connection.once('open', () => {
    console.log('good to go!!');
}).on('error', (error) =>{console.warn('warning', error)});

beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
          done();
    });
});
