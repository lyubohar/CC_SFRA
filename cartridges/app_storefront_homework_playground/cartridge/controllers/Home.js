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

    var viewData = res.getViewData();
    
    // Append inline
    if (!viewData) {
        next();
    } else {
        viewData.some_dummy_key = 'Lyubo append inline test'
    }

    // Append by hook
    if (HookMgr.hasHook('app.playground.dummy.hook')) {
        viewData = HookMgr.callHook('app.playground.dummy.hook', 'dummyHookFunction');       
    }

    res.setViewData(viewData);
    next();
});

module.exports = server.exports();
