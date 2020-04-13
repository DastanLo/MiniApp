const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.use('/users',require('./routes/users'));
app.use('/posts',require('./routes/posts'));

const start = async () => {
    try {
        await mongoose.connect(config.get('mongoUri'), config.get('mongoose'));
        app.listen(config.get('port'), () => {
            console.log(`HTTP Server started`);
        });
    } catch (e) {
        console.log('Server Error', e.message);
        process.exit(1);
    }
};
start().catch((e) => console.log(e));
