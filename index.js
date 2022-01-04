const express = require('express');
const app  = express();
const port = process.env.port || 8000;

/* Parsing request body */
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const enrolmentRouter = require('./routes/enrolment');
app.use('/course/enrolment', enrolmentRouter );

app.listen( port, () => { console.log(`Application is running on port ${port}.`)} );
