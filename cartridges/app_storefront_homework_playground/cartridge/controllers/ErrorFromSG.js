'use strict';

/**
 * @namespace ErrorFromSG
 */

var server = require('server');
var CustomerMgr = require('dw/customer/CustomerMgr');
var QueryString = !empty(CurrentRequest.httpQueryString) ? ('?' + CurrentRequest.httpQueryString) : ''
var Location = 'https://' + (CurrentRequest.httpHost || '') + (CurrentRequest.httpPath || '') + QueryString
var format = CurrentHttpParameterMap.format.stringValue || ""
var nodecorator = true

/**
 * Error-Start : Called by the system when an error was not handled locally (general error page).
 * 
 * Redirect to same URL through HTTPS protocol if only secure connection is needed.
 * 
 * Determine if it was an ajax request by looking at X-Requested-With=XMLHttpRequest
 * request header. this header is set by jQuery for every ajax request. in case the requested 
 * response is not json then the decorator is empty. for json, a json response is sent
 * @name Playground/ErrorFromSG-Start
 * @function
 * @memberof ErrorFromSG
 * @param {category} - non-sensitive
 * @param {serverfunction} - get/post
 */

server.use('Start', function (req, res, next) {
    if (ErrorText == 'Secure connection required for this request.' && !CurrentRequest.httpSecure && (CurrentRequest.httpHeaders.containsKey("x-is-request_method")) && (CurrentRequest.httpHeaders["x-is-request_method"] == 'GET')) {

        res.render('util/redirect');

    } else {
        if (CurrentRequest.getHttpHeaders().get("x-requested-with") != null && CurrentRequest.getHttpHeaders().get("x-requested-with") === "XMLHttpRequest") {

            if (format === "json") {

                res.render('error/generalerrorjson');

            }
        } else {

            res.render('error/generalerror');
            
        }
    }

    next();
});

/**
 * Error-Forbidden : Called by the system when a session hijacking was detected.
 * @name Playground/Error-Forbidden
 * @function
 * @memberof Error
 * @param {category} - non-sensitive
 * @param {serverfunction} - get/post
 */

server.use('Forbidden', function (req, res, next) {
    CustomerMgr.logoutCustomer(true);
    res.render('error/forbidden');
    next();
});
