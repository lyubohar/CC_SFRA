// Query all custom objects with id = 'NotifyMeBackInStock'. Loop them and check the product availability. If the product is back in stock, make a service call to Twilio API for all phone numbers stored in that custom objects. When process finished successfully, delete the custom object.

var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var ProductMgr = require('dw/catalog/ProductMgr');
var Transaction = require('dw/system/Transaction');

module.exports.execute = function () {
    var type = 'NotifyMeBackInStock';
    var allObjects = CustomObjectMgr.getAllCustomObjects(type);
    var error = false;
    
    while (allObjects !== null && allObjects.hasNext()) {
        var currentObject = allObjects.next();
        var currentObjectProductId = currentObject.getCustom().productId;
        var currentProduct = ProductMgr.getProduct(currentObjectProductId);
        var currentProductAvailability = currentProduct.getAvailabilityModel().isInStock();
        
        if (currentProductAvailability === true) {
            
        // Twilio service call

        function backInStockService() {
            var localServiceRegistry = dw.svc.LocalServiceRegistry;
            var smsTwilioService = localServiceRegistry.createService("plugin_backinstock.http.twilio.sms", {

                createRequest: function(svc) {
                    svc.addHeader('Content-Type', 'application/x-www-form-urlencoded');
                    var productName = currentProduct.name;
                    var allPhones = currentObject.getCustom().phoneNumbers;
                    
                    // Iterate through phone numbers
                    var match = allPhones.split(',')
                    for(var i = 0; i < match.length; i++) {
                        var phoneTo = match[i];
                    }
                    
                    var phoneFrom = '13048496496';
                    var smsBody = 'Good news! Product *' + productName + '* is back in stock!'
                    var myRequestString = 'To=%2B' + phoneTo + '&From=%2B' + phoneFrom + '&Body=' + smsBody;

                    return myRequestString;
                },

                parseResponse: function(response) {
                    return response;
                }
        
            });

            var result = smsTwilioService.call();
            
            return result;
          
        };

        backInStockService();

        // Delete custom objects
    
            try {
                Transaction.wrap(function () {
                    CustomObjectMgr.remove(currentObject);
                });            
            } catch (error) {
                error = true;
            }
        }    
    }
}
