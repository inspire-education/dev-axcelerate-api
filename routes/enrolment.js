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


router.put('/updateCompetency', (request, response) => {

    const updateEnrolment = async () => {
        try {
            return await axios.post( `${process.env.STAGING_BASEURL}/course/enrolment?contactID=${request.body.contactID}&instanceID=${request.body.instanceID}&classID=${request.body.classID}&competent=${request.body.competent}&type=s`, null , requestConfig );
        }catch(e){
            /* Returns the error from the POST call */
            response.send( { error: e.message } );
        }
    }

    const updateEnrolmentFunction = async () => {
        const responseUpdateEnrolment = updateEnrolment().then( res => {
            console.log( res );
        }).catch( error => response.send( { e: error }));
    }

    updateEnrolmentFunction();
});


module.exports = router;