var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var Transaction = require('dw/system/Transaction');

module.exports.execute = function () {

    var type = 'NewsletterRegHW';

    try {
        var newsletter = CustomObjectMgr.getAllCustomObjects(type);

        while (newsletter.hasNext()) {
            var customObject = newsletter.next();

            Transaction.wrap(function () {
                CustomObjectMgr.remove(customObject);
            });
        }

    } catch (error) {
        error = true;
    }
}
