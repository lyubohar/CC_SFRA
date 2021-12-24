'use strict';

/**
 * @namespace 
 */

var server = require('server');

/**
 * Twilio-Subscribe : This endpoint is called to submit the registration for the Notify When Back In Stock functionality.
 * @name Base/Twilio-Subscribe
 * @function
 * @memberof Twilio
 * @param {middleware} - server.middleware.https
 * @param {httpparameter} - notifyProductId - Product ID
 * @param {httpparameter} - notifyPhone - Phone of the shopper
 * @param {category} - sensitive
 * @param {returns} - json
 * @param {serverfunction} - post
 */
server.post('Subscribe', 
    server.middleware.https,
    function (req, res, next) {

        var Resource = require('dw/web/Resource');

        var ajaxForm = req.form;
        var product = ajaxForm.notifyProductId;
        var phone = ajaxForm.notifyPhone;

        if (!ajaxForm || !product || !phone) {
            res.json({
                error: true,
                msg: Resource.msg('message.notifyWhenBack.error', 'common', null)
            });     
        } else {
            res.json({
                success: true,
                // productid: product,
                // phone: phone,
                msg: Resource.msg('message.notifyWhenBack.success', 'common', null)
            });           
        }

    next();
});

module.exports = server.exports();
