const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const usersRoutes = require('./routes/users');
const postsRoutes = require('./routes/posts');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', usersRoutes);
app.use('/posts', postsRoutes);

mongoose.connect('mongodb://localhost:27017/firebase')
    .then( () => {
        console.log('Database is connected');
    })
    .catch( (error) => {
        console.log(error);
    });

app.listen(4000, () => {
    console.log('Server is running at port 4000');
});