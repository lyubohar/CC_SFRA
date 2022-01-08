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

        // Take form values from Ajax call

        var formProduct = req.form.product;
        var formPhone = req.form.phone;

        // Reusable json error/success states

        var jsonSuccess = { success: true, msg: Resource.msg('message.backInStock.success', 'common', null) };
        var jsonError = { error: true, msg: Resource.msg('message.backInStock.error', 'common', null) };

        // Store transaction in a reusable function
        
        var type = 'NotifyMeBackInStock';
        var keyValue = formProduct;

        var transaction = () => {                                           
            Transaction.wrap(function() {
                if (!formProduct) {
                    res.json(jsonError);
                } else {
                    var backInStockObject = CustomObjectMgr.createCustomObject(type, keyValue);
                    backInStockObject.custom.phoneNumbers = formPhone;
                    res.json(jsonSuccess);                               
                }
            });
        }

        // Check if custom objects already exist and if matches current product

        var allObjects = CustomObjectMgr.getAllCustomObjects(type); 
        var currentObject = CustomObjectMgr.getCustomObject(type, keyValue);

        while (allObjects.hasNext()) {  
            var currentObjectProductId = allObjects.next().getCustom().productId;  
            
            if (currentObjectProductId === formProduct) {                          
                var currentObjectPhoneNumbers = currentObject.getCustom().phoneNumbers; 
                var mergedPhoneNumbers = currentObjectPhoneNumbers + "," + formPhone; // Merge new with existing
                var filteredPhoneNumbers = Array.from(new Set(mergedPhoneNumbers.split(','))).toString(); // Remove duplicates

                try {
                    Transaction.wrap(function() {
                        currentObject.custom.phoneNumbers = filteredPhoneNumbers; // Store old data merged with new data 
                        res.json(jsonSuccess);                        
                    });
                } catch (error) {
                    res.json(jsonError);
                };   
            }            
        }

        // Create new custom object if none exists or exising CO does not match product

        if (currentObject === null || currentObjectProductId !== formProduct) {
            try {
                transaction();
            } catch (error) {
                res.json(jsonError);
            };         
        }
        
        return next();
});

module.exports = server.exports();
