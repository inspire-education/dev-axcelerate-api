const express = require('express');
const axios   = require('axios');
const router  = express.Router();

const courseUnitLookup = require('../data/course_unit_lookup.json');

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

    /** 
     *  classID    - Hub Course ID
     *  contactID  - Hub User ID 
     *  instanceID - Unit ID
    **/

    const updateEnrolment = async () => {
        try {

            const course = courseUnitLookup.find( course => { 
                return course.courseID === request.params.courseID
            });

            const unit = course.unitsOfCompetencies( ( unitCode, instance ) => {
                if( unitCode === request.body.unit ){ return instance; }
            });

            return await axios.put( `${process.env.STAGING_BASEURL}/course/enrolment?contactID=${request.body.contactID}&instanceID=${instance}&classID=${course.classID}&competent=${request.body.competent}&type=s`, null , requestConfig );
        }catch(e){
            /* Returns the error from the POST call */
            response.send( { error: e.message } );
        }
    }

    const updateEnrolmentFunction = async () => {
        const responseUpdateEnrolment = updateEnrolment().then( res => {
            response.send( { message: res.data.MSG });
        }).catch( error => response.send( { e: error }));
    }

    updateEnrolmentFunction();
});


module.exports = router;