'use strict';

/**
 * 
 * 
 * 
 */

function getDeathStar() {
    
    var localServiceRegistry = dw.svc.LocalServiceRegistry
    var getStarWarsService = localServiceRegistry.createService("http.swapi.getSwapi", {

        createRequest: function(svc, args) {
            svc.setRequestMethod('GET');
        },

        parseResponse: function(svc, client) {
            return client.text;
        },

        filterLogMessage: function(msg) {
            return msg.replace("cost_in_credits", "$$$$$$$$$$$$$$$$$$$");
        }
    });

    var response = getStarWarsService.call().object;

    return response;

};

module.exports = {
    getDeathStar : getDeathStar
};
