'use strict';

/**
 * Dummy hook - invoked by the extended Home-Show endpoint. Extends the view data with a JSON object.
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
