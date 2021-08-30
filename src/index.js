import express from 'express';
import helmet from 'helmet';
import config from './config.js';
import router from './routes.js';
import mongoose from 'mongoose';

const app = express();

const PORT = config.port;

mongoose.Promise = global.Promise;

mongoose.connect(config.mongo_url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(helmet.contentSecurityPolicy());
app.use(helmet.referrerPolicy());

app.use('/api', router);

function onStart(){
    console.log(`Server running on port ${PORT}`);
}

app.listen(PORT, onStart);

export default app;