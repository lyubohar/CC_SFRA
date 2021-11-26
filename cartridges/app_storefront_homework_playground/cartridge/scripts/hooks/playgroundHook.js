'use strict';

/**
 * Dummy hook
*/

function dummyHookFunction() { 
    var viewData = res.getViewData();

    if (!viewData) {
        next();
    } else {
        res.json({ some_dummy_key: some_dummy_value });
    
        res.setViewData(viewData);
        next();
    }
}

exports.dummyHookFunction = dummyHookFunction;
