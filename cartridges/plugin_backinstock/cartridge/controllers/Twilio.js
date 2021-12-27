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
        var Transaction = require('dw/system/Transaction');
        var CustomObjectMgr = require('dw/object/CustomObjectMgr');

        // Take form values from Ajax

        var formAjax = req.form;
        var formProduct = formAjax.product;
        var formPhone = formAjax.phone;

        if (!formAjax || !formProduct) {
            res.json({
                error: true,
                msg: Resource.msg('message.backInStock.error', 'common', null)
            });
        } else if (!formPhone) {
            res.json({
                error: true,
                msg: Resource.msg('message.backInStock.missing', 'common', null)
            });
        } else {
            res.json({
                success: true,
                msg: Resource.msg('message.backInStock.success', 'common', null)
            });           
        }

        // Populate custom object

        var transaction = () => {                                           // Store transaction as a reusable function
            Transaction.wrap(function() {
                var type = 'NotifyMeBackInStock';
                var keyValue = formProduct;
                var backInStockObject = CustomObjectMgr.createCustomObject(type, keyValue);

                backInStockObject.custom.phoneNumbers = formPhone;
            });
        }

        var objects = CustomObjectMgr.getAllCustomObjects('NotifyMeBackInStock');
        
        while (objects.hasNext()) {                                         // Iterate to check if object already exists
            var objectProductId = objects.next().getCustom().productId
            if (objectProductId === formProduct) {                          // If exists
    
                // var jsonExisting = { existingPhone: formPhone };
                // var json = { phone: formPhone };
                // backInStockObject.custom.phoneNumbers = JSON.stringify(jsonExisting.existingPhone, json.phone);

            } else {                                                        // If doesn't exist
                try {
                    transaction();
                } catch (error) {
                    error = true;
                };  
            }            
        }

        try {
            transaction();
        } catch (error) {
            error = true;
        };         
        
        return next();
});

module.exports = server.exports();
