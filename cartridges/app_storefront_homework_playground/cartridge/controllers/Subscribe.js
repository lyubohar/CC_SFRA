'use strict';

/**
 * @namespace Home
*/

var server = require('server');
var Transaction = require('dw/system/Transaction');
var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var UUIDUtils = require('dw/util/UUIDUtils');

/**
 * Show form
 * @name Playground/Subscribe-Show
 * @function
 * @memberof Home
 * @param {category} - non-sensitive
 * @param {serverfunction} - get
*/

server.get('Show', 
    function (req, res, next) {

        var profileForm = server.forms.getForm('newsletter');

        res.render('home/subscribe', {
            profileForm: profileForm
        });
        next();
    }
);

/**
 * Create custom object
 * @name Playground/Subscribe-Create
 * @function
 * @memberof Home
 * @param {category} - non-sensitive
 * @param {serverfunction} - append
*/

server.post(
    'Create', 
    server.middleware.https, 
    function (req, res, next) {

        var profileForm = server.forms.getForm('newsletter');
        var error = false;

        if(!profileForm){
            error = true;
        };

        var result = {                                   //constructs an object containing the form result
            firstName: profileForm.customer.firstname.value,
            lastName: profileForm.customer.lastname.value,
            email: profileForm.customer.email.value,
            profileForm: profileForm
        }; 
               
        res.setViewData(result);                         // adds form result to the ViewData object

        this.on('route:BeforeComplete', function (req, res) {
            var formInfo = res.getViewData();           // creates object with data to save
        
            var type = 'NewsletterRegHW';
            var keyValue = UUIDUtils.createUUID();
    
            try {
                Transaction.wrap(function() {
                    var newsletter = CustomObjectMgr.createCustomObject(type, keyValue);
                    newsletter.custom.firstName = formInfo.firstName;
                    newsletter.custom.lastName = formInfo.lastName;
                    newsletter.custom.email = formInfo.email;
                });
            } catch (error) {
                error = true;
            };
    
            if (error) {
                res.json({
                    error: true
                });
            } else {
                res.render('home/subscribe-success');
                // res.json({
                //     error: false,
                //     id: keyValue
                // });
            };
        });        

        return next();
});

module.exports = server.exports();
