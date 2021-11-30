'use strict';

/**
 * @namespace Home
 */

var server = require('server');
server.extend(module.superModule);
var HookMgr = require('dw/system/HookMgr');

/**
 * Extended Home-Show : Default home page appended to add some JSON to the view data. 
 * Two append options provided below - inline and by hook.
 * @name Playground/Home-Show
 * @function
 * @memberof Home
 * @param {category} - non-sensitive
 * @param {serverfunction} - append
 */

server.append('Show', function(req, res, next) {

    // Append inline
    var viewData = res.getViewData();

    if (!viewData) {
        next();
    } else {
        res.json({ some_dummy_key: 'some_dummy_value' });
        
        res.setViewData(viewData);
        next();
    }

    // Append by hook
    if (HookMgr.hasHook('app.playground.dummy.hook')) {
        HookMgr.callHook(
            'app.playground.test.hook',
            'dummyHookFunction'
        );
    }
})

module.exports = server.exports();
