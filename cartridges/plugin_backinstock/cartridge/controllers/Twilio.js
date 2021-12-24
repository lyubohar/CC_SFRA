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
 * @param {httpparameter} - notifyProductId - ID of the product
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
        var product = ajaxForm.productId;
        var phone = ajaxForm.phone;

        if (!ajaxForm || !product || !phone) {
            res.json({
                error: true,
                msg: Resource.msg('message.backInStock.error', 'common', null)
            });     
        } else {
            res.json({
                success: true,
                msg: Resource.msg('message.backInStock.success', 'common', null)
            });           
        }

    next();
});

module.exports = server.exports();
