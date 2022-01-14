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

/** 
 *  @params fieldToCheck String  
 *  @params fieldValue   String
 */
router.get('/userExists', ( request, response ) => {
     
    const userExists   = async () => {
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
    const newContact = {
        firstName: request.body.firstName
    };
});

module.exports = router;