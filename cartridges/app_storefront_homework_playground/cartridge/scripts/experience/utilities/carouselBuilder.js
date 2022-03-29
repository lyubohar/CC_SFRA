'use strict';

/* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["model"] }] */
var PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper.js');

/**
 * Helper to encapsulate common code for building a carousel
 *
 * @param {Object} model - model object for a component
 * @param {Object} context - model object for a component
 * @return {Object} model - prepared model
 */
function init(model, context) {
    model.regions = PageRenderHelper.getRegionModelRegistry(context.component);

    model.regions.slides.setClassName('lyubo-hero-carousel row');
    model.title = context.content.textHeadline ? context.content.textHeadline : null;

    return model;
}

module.exports = {
    init: init
};
