const express = require('express');
const axios   = require('axios');
const router  = express.Router();

const requestConfig = {
    headers : {
        apitoken : process.env.STAGING_APITOKEN,
        wstoken  : process.env.STAGING_WSTOKEN
    }
}

router.post('/', ( request, response ) => {

    const newEnrolment = { 
        contactID:  request.body.contactID, 
        instanceID: request.body.instanceID,
        type: 'p'
    }    

    const sendEnrolment = async () => {
        try {
            return await axios.post( `${process.env.STAGING_BASEURL}/course/enrol`, newEnrolment, requestConfig );
        }catch(e){
            /* Returns the error from the POST call */
            console.error( e );
        }
    } 

    const newEnrolmentFunction = async () => {
        const responseNewEnrolment = sendEnrolment().then( res => {
            response.send( res );
        }).catch( error => response.send( { e : error }) )
    }

    newEnrolmentFunction();
});


module.exports = router;