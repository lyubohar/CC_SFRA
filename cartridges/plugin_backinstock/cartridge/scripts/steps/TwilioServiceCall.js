// Query all custom objects with id = 'NotifyMeBackInStock'. Loop them and check the product availability. If the product is back in stock, make a service call to Twilio API for all phone numbers stored in that custom objects. When process finished successfully, delete the custom object.

var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var ProductMgr = require('dw/catalog/ProductMgr');
var Transaction = require('dw/system/Transaction');

module.exports.execute = function () {
    var type = 'NotifyMeBackInStock';
    var allObjects = CustomObjectMgr.getAllCustomObjects(type);
    var error = false;
    
    while (allObjects.hasNext()) {
        var currentObject = allObjects.next();
        var currentObjectProductId = currentObject.getCustom().productId;
        var currentProduct = ProductMgr.getProduct(currentObjectProductId);
        var currentProductAvailability = currentProduct.getAvailabilityModel().isInStock();

        return currentProductAvailability;
    }

    if (currentProductAvailability === true) {
        
        // Twilio service call

        // function backToStockService() {

        //     var localServiceRegistry = dw.svc.LocalServiceRegistry
        //     var getTwilioService = localServiceRegistry.createService("Twilio", {
        
        //         createRequest: function(svc, args) {
        //             svc.setRequestMethod('POST');
        //             return args;
        //         },
        
        //         parseResponse: function(svc, client) {
        //             return client.text;
        //         }
        
        //     });
        
        //     var response = getTwilioService.call().object;
        //     return response;
          
        // };
        
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
