require('dotenv').config();
const express = require('express');
const app  = express();
const port = process.env.PORT || 8000;

/* Parsing request body */
const bodyParser = require('body-parser');
app.use(bodyParser.json());


const enrolmentRouter = require('./routes/enrolment');
app.use('/course/enrol', enrolmentRouter );

app.listen( port, () => { console.log(`Application is running on port ${port}.`)} );
