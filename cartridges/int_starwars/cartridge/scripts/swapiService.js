'use strict';

/**
 * Handles swapi service. Sends request, gets response and filters the response.
 * @returns {String} - returns string with data from Star Wars API to be used by controller.
*/

function getDeathStar() {
    
    var localServiceRegistry = dw.svc.LocalServiceRegistry
    var getStarWarsService = localServiceRegistry.createService("http.swapi.getSwapi", {

        createRequest: function(svc, args) {
            svc.setRequestMethod('GET');
            return args;
        },

        parseResponse: function(svc, client) {
            return client.text;
        },

        filterLogMessage: function(msg) {
            return msg.replace(cost_in_credits.value, "$$$$$$$$$$$");
        }

    });

    var response = getStarWarsService.call().object;

    return response;

};

exports.getDeathStar = getDeathStar;
