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

    console.log( request );
    const fetchUser = async () => {
        try {
            /**   
             *  @returns Array  
             */
            return await axios.get( `${process.env.STAGING_BASEURL}/contacts/${request.params.contactID}`, requestConfig );
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

            if( res.data.length > 0 ){ response.send( { contactID: res.data[0].CONTACTID }); }
            else{ response.send(false); }

        }).catch( error => response.send( { e : error }) )
    }

    fetchUserFunction();
});

/** 
 *  @params fieldToCheck String  
 *  @params fieldValue   String
 */
router.get('/userExists', ( request, response ) => {
     
    console.log( request );
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

            if( res.data.length > 0 ){ response.send( { contactID: res.data[0].CONTACTID }); }
            else{ response.send(false); }

        }).catch( error => response.send( { e : error }) )
    }

    checkFunction();
});

router.post('/', ( request, response ) => {

    console.log( request );
    let requestUrl = `${process.env.STAGING_BASEURL}/contact`;

    if( request.body ){
        requestUrl += '?';

        for (const key of Object.keys(request.body)) {
            requestUrl = requestUrl + key + '=' + request.body[key] + '&';
        }
    }

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