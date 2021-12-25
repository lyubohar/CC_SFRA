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

        // Take form values from Ajax

        var formAjax = req.form;
        var formProduct = formAjax.product;
        var formPhone = formAjax.phone;

        if (!formAjax || !formProduct || !formPhone) {
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

        // Populate custom object

        var Transaction = require('dw/system/Transaction');
        var form = formAjax;
        var error = false;

        if(!formAjax){
            error = true;
        }; 

        var result = {                              //constructs an object containing the form result
            test1: formProduct,
            test2: formPhone,
            form: form
        }; 
        res.setViewData(result);                     // adds form result to the ViewData object
        var formInfo = res.getViewData();            // creates object with data to save

        try {
            Transaction.wrap(function() {
                var CustomObjectMgr = require('dw/object/CustomObjectMgr'); 

                var type = 'NotifyMeBackInStock';
                var keyValue = formProduct;
                var backInStockObject = CustomObjectMgr.createCustomObject(type, keyValue);

                // backInStockObject.productId = formInfo.test1;
                backInStockObject.custom.phoneNumbers = formInfo.test2;
            });
        } catch (error) {
            error = true;
        };

        return next();
});

module.exports = server.exports();
