const express = require("express");
const helmet = require("helmet");
const app = express();

const PORT = 3000;
const Router = require('./routes/movies');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(helmet.contentSecurityPolicy());
app.use(helmet.referrerPolicy());

app.use('/api', Router);

function onStart(){
    console.log(`Server running on port ${PORT}`);
}

app.listen(PORT, onStart);

module.exports = app;