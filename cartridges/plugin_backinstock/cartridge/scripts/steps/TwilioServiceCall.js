// Query all custom objects with id = 'NotifyMeBackInStock'. Loop them and check the product availability. If the product is back in stock, make a service call to Twilio API for all phone numbers stored in that custom objects. When process finished successfully, delete the custom object.

var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var Transaction = require('dw/system/Transaction');

module.exports.execute = function () {
    var type = 'NotifyMeBackInStock';
    var allObjects = CustomObjectMgr.getAllCustomObjects(type);
    var error = false;
    
    while (allObjects.hasNext()) {
        var currentObject = allObjects.next();
        var currentObjectProductId = currentObject.getCustom().productId;

        if (currentObjectProductId.available) {
            
            // Twilio service call
            
            // Delete custom objects
            try {
                while (allObjects.hasNext()) {
                    var currentObject = allObjects.next();
        
                    Transaction.wrap(function () {
                        CustomObjectMgr.remove(currentObject);
                    });
                }
            } catch (error) {
                error = true;
            } 

        } else {                                                            
            
        }            
    }
}
