'use strict';

/**
 * @namespace Subscribe
 */

var server = require('server');
var Transaction = require('dw/system/Transaction');
var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var UUIDUtils = require('dw/util/UUIDUtils');

/**
 * Subscribe-Show - The Subscribe-Show renders the template with Newsletter Subscription form and allows the user to subscribe by filling the form.
 * @name Playground/Subscribe-Show
 * @function
 * @memberof Subscribe
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
 * Subscribe-Create - On form save creates custom objects (based on predefined custom object type) and fills them with data, provided by user. Renders the subscribe-success ISML template.
 * @name Playground/Subscribe-Create
 * @function
 * @memberof Subscribe
 * @param {category} - non-sensitive
 * @param {serverfunction} - post
 */

server.post('Create', 
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
            gender: profileForm.customer.gender.value,
            profileForm: profileForm
        }; 
        res.setViewData(result);                         // adds form result to the ViewData object
        var formInfo = res.getViewData();                // creates object with data to save
    
        try {
            Transaction.wrap(function() {
                var type = 'NewsletterRegHW';
                var keyValue = UUIDUtils.createUUID();
                var newsletter = CustomObjectMgr.createCustomObject(type, keyValue);

                newsletter.custom.firstName = formInfo.firstName;
                newsletter.custom.lastName = formInfo.lastName;
                newsletter.custom.email = formInfo.email;
                newsletter.custom.gender = formInfo.gender;
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
        };       

        return next();
});

module.exports = server.exports();
