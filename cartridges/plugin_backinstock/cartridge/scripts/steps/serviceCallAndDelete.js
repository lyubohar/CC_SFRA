/**
 * Query all custom objects with id = 'NotifyMeBackInStock'. Loop them and check the product availability. If the product is back in stock, make a service call to Twilio API for all phone numbers stored in that custom objects. When process finished successfully, delete the custom object.
 * Handles Twilio service. Sends request as body (x-www-form-urlencoded format) and gets response.
 * @returns {String} - returns string with data to be sent to the Twilio API for processing.
*/

var Resource = require('dw/web/Resource');
var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var ProductMgr = require('dw/catalog/ProductMgr');
var Transaction = require('dw/system/Transaction');

module.exports.execute = function () {
    var type = 'NotifyMeBackInStock';
    var allObjects = CustomObjectMgr.getAllCustomObjects(type);
    var error = false;

// Iterate through objects
    
    while (allObjects !== null && allObjects.hasNext()) {                   
        var currentObject = allObjects.next();
        var currentObjectProductId = currentObject.getCustom().productId;
        var currentProduct = ProductMgr.getProduct(currentObjectProductId);
        var currentProductAvailability = currentProduct.getAvailabilityModel().isInStock();
        var phonesArray = currentObject.getCustom().phoneNumbers.split(',');

        if (currentProductAvailability === true) {                          // Check for product availability
            phonesArray.forEach(function (phoneTo) {                        // Iterate through phone numbers
                function backInStockService() {                             // Twilio service call
                    var localServiceRegistry = dw.svc.LocalServiceRegistry;
                    var smsTwilioService = localServiceRegistry.createService("plugin_backinstock.http.twilio.sms", {
        
                        createRequest: function(svc) {
                            svc.addHeader('Content-Type', 'application/x-www-form-urlencoded');
                            var phoneFrom = '13048496496';
                            var smsBody = Resource.msg('message.backInStock.bodystart', 'common', null) + currentProduct.name + Resource.msg('message.backInStock.bodyend', 'common', null);
                            var requestString = 'To=%2B' + phoneTo + '&From=%2B' + phoneFrom + '&Body=' + smsBody;
        
                            return requestString;
                        },
        
                        parseResponse: function(response) {
                            return response;
                        }
                
                    });
                    return smsTwilioService.call();
                };
                backInStockService();
            }, deleteCustomObjects());
        }    
    }
    
// Delete custom objects
            
    function deleteCustomObjects() {
        try {
            Transaction.wrap(function () {
                CustomObjectMgr.remove(currentObject);
            });            
        } catch (error) {
            error = true;
        }
    }    
}
