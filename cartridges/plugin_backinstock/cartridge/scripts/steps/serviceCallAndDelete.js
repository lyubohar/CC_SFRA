/**
 * Query all custom objects with id = 'NotifyMeBackInStock'. Loop them and check the product availability. If the product is back in stock, make a service call to Twilio API for all phone numbers stored in that custom objects. When process finished successfully, delete the custom object.
*/

var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var ProductMgr = require('dw/catalog/ProductMgr');
var Transaction = require('dw/system/Transaction');
var twilioService = require('~/cartridge/scripts/twilioService.js');

module.exports.execute = function () {
    var type = 'NotifyMeBackInStock';
    var allObjects = CustomObjectMgr.getAllCustomObjects(type);
    var error = false;

    // Iterate through objects
    
    while (allObjects !== null && allObjects.hasNext()) {                   
        var currentObject = allObjects.next();
        var currentObjectProductId = currentObject.getCustom().productId;
        var currentProduct = ProductMgr.getProduct(currentObjectProductId);
        var currentProductName = ProductMgr.getProduct(currentObjectProductId).name;
        var currentProductAvailability = currentProduct.getAvailabilityModel().isInStock();
        var phonesArray = currentObject.getCustom().phoneNumbers.split(',');

        if (currentProductAvailability === true) {                          // Check for product availability

            phonesArray.forEach(function (phoneTo) {                        // Iterate through phone numbers
                twilioService.backInStockService(currentProductName, phoneTo);
            });

            try {                                                           // Delete custom objects
                Transaction.wrap(function () {
                    CustomObjectMgr.remove(currentObject);
                });            
            } catch (error) {
                error = true;
            }
        }    
    }   
}
