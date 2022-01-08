'use strict';

/**
 * @namespace Product
 */

var server = require('server');

/**
 * Twilio-Subscribe : This endpoint is called to submit the registration for the Notify When Back In Stock functionality.
 * @name Base/Twilio-Subscribe
 * @function
 * @memberof Twilio
 * @param {middleware} - server.middleware.https
 * @param {httpparameter} - formProduct - ID of the product
 * @param {httpparameter} - formPhone - Phone of the shopper
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

        var formProduct = req.form.product;
        var formPhone = req.form.phone;

        // Store transaction in a reusable function
        
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
                    backInStockObject.custom.phoneNumbers = formPhone;
                    res.json({
                        success: true,
                        msg: Resource.msg('message.backInStock.success', 'common', null)
                    });                               
                }
            });
        }

        // Check if custom objects already exist

        var allObjects = CustomObjectMgr.getAllCustomObjects(type); 
        var currentObject = CustomObjectMgr.getCustomObject(type, keyValue);

        while (allObjects.hasNext()) {  

            // Check if any existing object matches current product
            var currentObjectProductId = allObjects.next().getCustom().productId;  
            
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
                    res.json({
                        error: true,
                        msg: Resource.msg('message.backInStock.error', 'common', null)
                    });
                };   
            }            
        }

        // Create new custom object if none exists or exising CO does not match product

        if (currentObject === null || currentObjectProductId !== formProduct) {
            try {
                transaction();
            } catch (error) {
                res.json({
                    error: true,
                    msg: Resource.msg('message.backInStock.error', 'common', null)
                });
            };         
        }
        
        return next();
});

module.exports = server.exports();
