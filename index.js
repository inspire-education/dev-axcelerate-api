require('dotenv').config();
const express = require('express');
const app  = express();
const port = process.env.PORT || 80;
const hostname = '122.248.210.190';

/* Parsing request body */
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Import all route files
const enrolmentRouter = require('./routes/enrolment');
const contactRouter = require('./routes/contact');

app.get('/', (request, response) =>{ response.send('Welcome to Axcelerate API by Inspire Education'); })

app.use('/enrolments', enrolmentRouter );
app.use('/contacts', contactRouter);

app.listen( port, hostname,  () => { console.log(`Application is running on port ${port}.`)} );
