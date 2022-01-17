'use strict';

/**
 * Handles Twilio service. Sends request as body (x-www-form-urlencoded format) and gets response.
 * @returns {String} - returns string with data to be sent to the Twilio API for processing.
*/

var Resource = require('dw/web/Resource');

function backInStockService(argCurrentProductName, argPhoneTo) {                             
    var localServiceRegistry = dw.svc.LocalServiceRegistry;
    var smsTwilioService = localServiceRegistry.createService("plugin_backinstock.http.twilio.sms", {
    
        createRequest: function(svc) {
            svc.addHeader('Content-Type', 'application/x-www-form-urlencoded');
            var phoneFrom = '13048496496';
            var smsBody = Resource.msg('message.backInStock.bodystart', 'common', null) + argCurrentProductName + Resource.msg('message.backInStock.bodyend', 'common', null);
            var requestString = 'To=%2B' + argPhoneTo + '&From=%2B' + phoneFrom + '&Body=' + smsBody;

            return requestString;
        },

        parseResponse: function(response) {
            return response;
        }

    });
    return smsTwilioService.call();
};

exports.backInStockService = backInStockService;
