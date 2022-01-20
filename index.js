require('dotenv').config();
const express = require('express');
const app  = express();
const port = process.env.PORT || 8000;

/* Parsing request body */
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Import all route files
const enrolmentRouter = require('./routes/enrolment');
const contactRouter = require('./routes/contact');

app.use('/enrolments', enrolmentRouter );
app.use('/contacts', contactRouter);

app.listen( port, () => { console.log(`Application is running on port ${port}.`)} );
