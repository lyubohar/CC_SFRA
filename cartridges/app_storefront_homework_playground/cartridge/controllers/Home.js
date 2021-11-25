'use strict';

/**
 * @namespace Home
 */

var server = require('server');
var HookMgr = require('dw/system/HookMgr')
server.extend(module.Supermodule);

/**
 * Extended Home-Show : This endpoint is called when a shopper navigates to the home page
 * @name Playground/Home-Show
 * @function
 * @memberof Home
 * @param {category} - non-sensitive
 * @param {serverfunction} - append
 */

server.append('Show', function(req, res, next) {

    if (HookMgr.hasHook('app.playground.dummy.hook')) {
        HookMgr.callHook(
            'app.playground.test.hook',
            'dummyHookFunction'
        );
    }

    var viewData = res.getViewData();

    if (!viewData) {
        next();
    } else {
        res.json({ another_dummy_key: another_dummy_value });
        
        res.setViewData(viewData);
        next();
    }
})

module.exports = server.exports();
