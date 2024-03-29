const express = require('express');
const axios   = require('axios');
const router  = express.Router();

/**  
    @definition This endpoint checks if user or contact exists in Axcelerate Database
    @params     JobReadyID / HistoricalClientID ( Axcelerate Field )
    @return     clientID
*/

const requestConfig = {
    headers : {
        apitoken : process.env.STAGING_APITOKEN,
        wstoken  : process.env.STAGING_WSTOKEN
    }
}


router.get('/:contactID', ( request, response ) => {

    console.log(`GET -- /${ request.params.contactID } ${ Date.now() }`); 

    const fetchUser = async () => {
        try {
            /**   
             *  @returns Array  
             */
            return await axios.get( `${process.env.STAGING_BASEURL}/contact/${request.params.contactID}`, requestConfig );
        }catch(e){
            /* Returns the error from the GET request */
            console.error( e );
        }
    }

    const fetchUserFunction = async () => {
        const responseFetchUser = fetchUser().then( res => {
            /* 
                If user exists, we get the contactID for the enrollment
                If user does not exist, we proceed on creating a new contact on aXcelerate 
            */

            if( typeof res.data === 'object' ){ response.send( { contactID: res.data.CONTACTID }); }
            else{ response.send(false); }

        }).catch( error => response.send( { e : error }) )
    }

    fetchUserFunction();
});

/** 
 *  @params fieldToCheck String  
 *  @params fieldValue   String
 */
router.post('/userExists', ( request, response ) => {

    console.log(`POST -- /userExists ${ Date.now() }`); 

    const userExists = async () => {
        try {
            /**   
             *  @returns Array  
             */
            return await axios.get( `${process.env.STAGING_BASEURL}/contacts/search?${request.body.fieldToCheck}=${request.body.fieldValue}`, requestConfig );
        }catch(e){
            /* Returns the error from the GET request */
            console.error( e );
        }
    }

    const checkFunction = async () => {
        const responseUserExists = userExists().then( res => {
            /* 
                If user exists, we get the contactID for the enrollment
                If user does not exist, we proceed on creating a new contact on aXcelerate 
            */
            if( !res.data.error ){ response.send( { contactID: res.data[0].CONTACTID }); }
            else{ response.send( { contactID: false } ); }

        }).catch( error => response.send( { e : error }) )
    }

    checkFunction();
});

/**  
 *  Gets contact's enrolment details
 *  @params 
 *  @returns integer classID for specified Hub Course  
**/
router.post('/enrolments', (request, response)=>{

    console.log(`GET -- /enrolments/${ request.body.contactID } ${ Date.now() }`); 

    const getEnrolment = async () => {
        try {
            /**   
             *  @returns Array  
             */
            return await axios.get( `${process.env.STAGING_BASEURL}/contact/enrolments/${ request.body.contactID }`, requestConfig );
        }catch(e){
            /* Returns the error from the GET request */
            console.error( e );
        }
    }

    const getEnrolmentFunction = async () => {
        const responseGetEnrolment = getEnrolment().then( res => {
            /* 
                If user exists, we get the contactID for the enrollment
                If user does not exist, we proceed on creating a new contact on aXcelerate 
            */
            console.log( res );
            if( res.data.length > 0 ){ 
                const contactEnrolment = res.data.find( enrolment => {
                    return enrolment.ACTIVITYTYPE === request.body.courseName
                })

                response.send({ classID: contactEnrolment.INSTANCEID });
            }
            else{ response.send(false); }

        }).catch( error => response.send( { e : error }) )
    }

    getEnrolmentFunction();
});

router.post('/', ( request, response ) => {

    console.log(`POST -- / ${ Date.now() }`);
    console.log(`REQUEST BODY -- / ${ request.body }`);

    let requestUrl = `${process.env.STAGING_BASEURL}/contact`;

    if( request.body ){
        requestUrl += '?';

        for (const key of Object.keys(request.body)) {
            requestUrl = requestUrl + key + '=' + request.body[key] + '&';
        }
    }

    /* Test Value */
    // requestUrl += '?givenName=QATest003&emailAddress=qa003@email.com';

    const userCreate = async () => {
        try {
            /**   
             *  @returns Array  
             */
            return await axios.post( requestUrl , {}, requestConfig );
        }catch(e){
            /* Returns the error from the GET request */
            console.error( e );
        }
    }

    const createFunction = async () => {
        const responseCreateUser = userCreate().then( res => {
            response.send( { contactID: res.data.CONTACTID } );
        });
    }

    createFunction();
});

module.exports = router;