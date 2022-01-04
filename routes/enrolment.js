const express = require('express');
const axios   = require('axios');
const router  = express.Router();

router.post('/', ( request, response ) => {
    const newEnrolment = { 
        contactID:  request.body.contactID, 
        instanceID: request.body.instanceID,
        type: 'p'
    }

    const sendEnrolment = async () => {
        try {
            return await axios.post( process.env.STAGING_URL, newEnrolment );
        }catch(e){
            /* Returns the error from the POST call */
            console.error( e );
        }
    } 

    const responseNewEnrolment = sendEnrolment.then( res => {
        console.log( res );
    }).catch( error => response.send( { e : error }) )

    responseNewEnrolment();
});


module.exports = router;