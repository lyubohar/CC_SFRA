'use strict';

/**
 * Dummy hook - invoked by the extended Home-Show endpoint. Extends the view data with a JSON object.
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next call in the middleware chain
*/

function dummyHookFunction() { 
    var simpleObject = {
        some_dummy_key2 : 'Lyubo append hook test'
    } 
    return simpleObject
}

exports.dummyHookFunction = dummyHookFunction;
