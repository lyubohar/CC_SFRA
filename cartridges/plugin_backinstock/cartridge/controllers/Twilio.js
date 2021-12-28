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

        // Store transaction as a reusable function
        
        var type = 'NotifyMeBackInStock';
        var keyValue = formProduct;

        var transaction = () => {                                           
            Transaction.wrap(function() {
                var backInStockObject = CustomObjectMgr.createCustomObject(type, keyValue);

                backInStockObject.custom.phoneNumbers = formPhone;
            });
        }
        
        // Proceed if custom objects already exist

        var allObjects = CustomObjectMgr.getAllCustomObjects(type); 
        var currentObject = CustomObjectMgr.getCustomObject(type, keyValue);
        var error = false;

        while (allObjects.hasNext()) {   
            var currentObjectProductId = allObjects.next().getCustom().productId;  // Iterate to see if object for current product exists

            if (currentObjectProductId === formProduct) {                          // If yes
                var currentObjectPhoneNumbers = currentObject.getCustom().phoneNumbers;
                
                try {
                    Transaction.wrap(function() {
                        var backInStockObject = currentObject; 
                        
                        backInStockObject.custom.phoneNumbers = currentObjectPhoneNumbers + "," + formPhone;
                    });
                } catch (error) {
                    error = true;
                };  

                } else {                                                           // If no
                try {
                    transaction();
                } catch (error) {
                    error = true;
                };  
            }            
        }

        // Create new custom object if none exists

        try {
            transaction();
        } catch (error) {
            error = true;
        };         
        
        return next();
});

module.exports = server.exports();
