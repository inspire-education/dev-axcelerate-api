const express = require('express');
const axios   = require('axios');
const router  = express.Router();

/**  
    @definition This endpoint checks if user or contact exists in Axcelerate Database
    @params     JobReadyID / HistoricalClientID ( Axcelerate Field )
    @return     clientID
*/
router.get('/userExists', ( request, response ) => {
    const fieldToCheck = 'historicalClientId';
     
    const userExists   = async () => {
        try {
            /**   
             *  @returns Array  
             */
            return await axios.get( `${process.env.STAGING_BASEURL}?${fieldToCheck}=${request.body.historicalClientID}` );
        }catch(e){
            /* Returns the error from the GET request */
            console.error( e );
        }
    }

    const checkFunction = async () => {
        const responseUserExists = userExists().then( res => {
            console.log( res );
        }).catch( error => response.send( { e : error }) )
    }

    checkFunction();
});

router.post('/', ( request, response ) => {
    const newContact = {};
});

module.exports = router;