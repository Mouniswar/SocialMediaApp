const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/social-media-api', {
    useNewUrlParser: true,
    useCreateIndex:true,
    useFindAndModify: false,
    useUnifiedTopology: true
})