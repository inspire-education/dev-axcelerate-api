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

    const sendEnrolment = async () => {
        try {
            return await axios.post( `${process.env.STAGING_BASEURL}/course/enrol?contactID=${request.body.contactID}&instanceID=${request.body.instanceID}&type=p`, null , requestConfig );
        }catch(e){
            /* Returns the error from the POST call */
            response.send( { error: e.message } );
        }
    } 

    const newEnrolmentFunction = async () => {
        const responseNewEnrolment = sendEnrolment().then( res => {

            response.send( res.data );
        
        }).catch( error => response.send( { e : true }) )
    }

    newEnrolmentFunction();
});


module.exports = router;