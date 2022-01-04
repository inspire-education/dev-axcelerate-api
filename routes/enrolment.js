const express = require('express');
const router = express.Router();

router.post('/', ( request, response ) => {
    const newEnrolment = { contactID: request.body.contactID, }
});


module.exports = router;