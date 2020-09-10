const mongoose = require('mongoose');

mongoose.connect(process.env.MONGOOSE_TEST_URL, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true, autoIndex: true})
.then(
    res=>console.log('DB Connection Success'))
.catch(err=>{
    console.error('DB Connection Error:',err.name,err.message)
})

module.exports = mongoose.connection;