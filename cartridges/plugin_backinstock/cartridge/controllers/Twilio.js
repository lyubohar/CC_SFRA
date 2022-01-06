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
        var error = false;

        // Take form values from Ajax

        var formAjax = req.form;
        var formProduct = formAjax.product;
        var formPhone = formAjax.phone;

        // Store transaction as a reusable function
        
        var type = 'NotifyMeBackInStock';
        var keyValue = formProduct;

        var transaction = () => {                                           
            Transaction.wrap(function() {
                if (!formProduct) {
                    res.json({
                        error: true,
                        msg: Resource.msg('message.backInStock.error', 'common', null)
                    });
                } else {
                    var backInStockObject = CustomObjectMgr.createCustomObject(type, keyValue);
                    res.json({
                        success: true,
                        msg: Resource.msg('message.backInStock.success', 'common', null)
                    });                               
                }

                backInStockObject.custom.phoneNumbers = formPhone;
            });
        }
        
        // Proceed if custom objects already exist

        var allObjects = CustomObjectMgr.getAllCustomObjects(type); 
        var currentObject = CustomObjectMgr.getCustomObject(type, keyValue);
        var error = false;

        while (allObjects.hasNext()) {  

            // Iterate all objects to see if any object exists for current product
            var currentObjectProductId = allObjects.next().getCustom().productId;  
            
            // If yes
            if (currentObjectProductId === formProduct) {                          
                var currentObjectPhoneNumbers = currentObject.getCustom().phoneNumbers; 
                var mergedPhoneNumbers = currentObjectPhoneNumbers + "," + formPhone; // Merge new with existing
                var filteredPhoneNumbers = Array.from(new Set(mergedPhoneNumbers.split(','))).toString(); // Remove duplicates

                try {
                    Transaction.wrap(function() {

                        // Store old data merged with new data
                        currentObject.custom.phoneNumbers = filteredPhoneNumbers; 
                        res.json({
                            success: true,
                            msg: Resource.msg('message.backInStock.success', 'common', null)
                        });                         
                    });
                } catch (error) {
                    error = true;
                };  

                // If no, just store new data
                } else {                                                          
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
