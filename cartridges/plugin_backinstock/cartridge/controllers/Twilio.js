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
        // if (!formProduct) {
        //     res.json({
        //         error: true,
        //         msg: Resource.msg('message.backInStock.error', 'common', null)
        //     });            
        // }; 
      
        // Iterate all objects to see if any object exists for current product
        
        var type = 'NotifyMeBackInStock';
        var keyValue = formProduct;
        var allObjects = CustomObjectMgr.getAllCustomObjects(type); 
        var currentObject = CustomObjectMgr.getCustomObject(type, keyValue);

        while (allObjects.hasNext()) {  
            var currentObjectProductId = allObjects.next().getCustom().productId;  
            
            if (currentObjectProductId === formProduct) {                          
                var currentObjectPhoneNumbers = currentObject.getCustom().phoneNumbers; 
                var mergedPhoneNumbers = currentObjectPhoneNumbers + "," + formPhone;       // Merge new with existing
                var filteredPhoneNumbers = Array.from(new Set(mergedPhoneNumbers.split(','))).toString(); // Remove duplicates
                
                try {
                    Transaction.wrap(function() {
                        currentObject.custom.phoneNumbers = filteredPhoneNumbers;       // Store old data merged with new data
                    });
                } catch (error) {
                    res.json({
                        error: true,
                        msg: Resource.msg('message.backInStock.error', 'common', null)
                    });
                } finally {
                    res.json({
                        success: true,
                        msg: Resource.msg('message.backInStock.success', 'common', null)
                    }); 
                }; 
            }    
        }

        // Create new object if none exists

        try {
            Transaction.wrap(function() {
                var backInStockObject = CustomObjectMgr.createCustomObject(type, keyValue);
                backInStockObject.custom.phoneNumbers = formPhone;
            });
        } catch (error) {
            res.json({
                error: true,
                msg: Resource.msg('message.backInStock.error', 'common', null)
            });
        } finally {
            res.json({
                success: true,
                msg: Resource.msg('message.backInStock.success', 'common', null)
            }); 
        } 
        
        return next();
});

module.exports = server.exports();
