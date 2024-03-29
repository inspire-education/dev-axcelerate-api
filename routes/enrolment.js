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

    /** 
     *  classID    - Hub Course ID
     *  contactID  - Hub User ID 
    **/

    console.log(`${ new Date() } POST -- /enrolments `);
    console.log(`REQUEST BODY -- ${ request.body }`);

    const sendEnrolment = async () => {
        try {
            return await axios.post( `${process.env.STAGING_BASEURL}/course/enrol?contactID=${request.body.contactID}&instanceID=${request.body.classID}&type=p`, null , requestConfig );
        }catch(e){
            /* Returns the error from the POST call */
            return response.send({ error: e });
        }
        
    } 

    const newEnrolmentFunction = async () => {
        const responseNewEnrolment = sendEnrolment().then( res => {
            console.log( res );
            response.send( res.data );
        }).catch( error => response.send( { e : true }) )
    }

    newEnrolmentFunction();
});


router.post('/updateCompetency', (request, response) => {

    /** 
     *  classID    - Hub Course ID
     *  contactID  - Hub User ID 
     *  instanceID - Unit ID
    **/
   
    console.log(`${ new Date() } POST -- /enrolments/updateCompetency `);
    console.log(`REQUEST BODY -- ${ request.body }`);
    
    const updateEnrolment = async () => {
        try {
            return await axios.put( `${process.env.STAGING_BASEURL}/course/enrolment?contactID=${request.body.contactID}&instanceID=${request.body.unit}&classID=${request.body.courseID}&competent=${request.body.competent}&type=s`, null , requestConfig );
        }catch(e){
            /* Returns the error from the POST call */
            response.send( { error: e.message } );
        }
    }

    const updateEnrolmentFunction = async () => {
        const responseUpdateEnrolment = updateEnrolment().then( res => {
            console.log( res );
            response.send( { message: res.data.MSG });
        }).catch( error => response.send( { e: error }));
    }

    updateEnrolmentFunction();
});


module.exports = router;