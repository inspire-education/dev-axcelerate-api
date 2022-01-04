const express = require('express');
const axios   = require('axios');
const router  = express.Router();

router.post('/', ( request, response ) => {

    const newEnrolment = { 
        contactID:  request.body.contactID, 
        instanceID: request.body.instanceID,
        type: 'p'
    } 
   

    /* For Testing */
    /* 
    const newEnrolment = { 
        contactID:  12345, 
        instanceID: 12345,
        type: 'p'
    }
    */

    const sendEnrolment = async () => {
        try {
            return await axios.post( process.env.STAGING_BASEURL, newEnrolment );
        }catch(e){
            /* Returns the error from the POST call */
            console.error( e );
        }
    } 

    const newEnrolmentFunction = async () => {
        const responseNewEnrolment = sendEnrolment().then( res => {
            console.log( res );
        }).catch( error => response.send( { e : error }) )
    }

    newEnrolmentFunction();
});


module.exports = router;