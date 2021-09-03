import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';

import config from './config/main.config.js';
import movieRoutes from './routes/movie.routes.js';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const swaggerDocument = require('./../swagger.json');

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
app.use(express.urlencoded({ extended: true }));
app.use(helmet.contentSecurityPolicy());
app.use(helmet.referrerPolicy());

app.use('/', movieRoutes);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

function onStart() {
    console.log(`Server running on port ${PORT}`);
}

app.listen(PORT, onStart);

export default app;