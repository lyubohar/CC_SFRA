'use strict';

/**
 * @namespace 
 */

var server = require('server');

/**
 * Twilio-Subscribe : This endpoint is called to submit the shopper's contact information
 * @name Base/ContactUs-Subscribe
 * @function
 * @memberof ContactUs
 * @param {middleware} - server.middleware.https
 * @param {httpparameter} - contactFirstName - First Name of the shopper
 * @param {httpparameter} - contactLastName - Last Name of the shopper
 * @param {httpparameter} - contactEmail - Email of the shopper
 * @param {httpparameter} - contactTopic - ID of the "Contact Us" topic
 * @param {httpparameter} - contactComment - Comments entered by the shopper
 * @param {category} - sensitive
 * @param {returns} - json
 * @param {serverfunction} - post
 */
server.post('Subscribe', 
    server.middleware.https,
    function (req, res, next) {

        var ajaxForm = req.form;
        var product = ajaxForm.notifyProductId;
        var phone = ajaxForm.notifyPhone;

        if (!ajaxForm && !product || !product && !phone) {
            res.json({
                error: true,
                msg: 'Cannot find form data'
            });     
        } else if (!phone) {
            res.json({
                error: true,
                msg: 'No phone provided'
            }); 
        } else {
            res.json({
                success: true,
                productid: product,
                phone: phone
            });           
        }

    next();
});

module.exports = server.exports();
