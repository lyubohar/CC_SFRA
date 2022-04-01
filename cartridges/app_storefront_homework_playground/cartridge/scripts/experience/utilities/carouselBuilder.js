'use strict';

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

    var carouselElement = model.regions.slides
    var content = context.content
    
    carouselElement
        .setClassName('lyubo-hero-carousel')
        
        .setAttribute('data-xs-indicators', content.xsCarouselIndicators)
        .setAttribute('data-xs-controls', content.xsCarouselControls)
        .setAttribute('data-xs-slides-display', content.xsCarouselSlidesToDisplay)
        .setAttribute('data-xs-slides-scroll', content.xsCarouselSlidesToScroll)

        .setAttribute('data-sm-indicators', content.smCarouselIndicators)
        .setAttribute('data-sm-controls', content.smCarouselControls)
        .setAttribute('data-sm-slides-display', content.smCarouselSlidesToDisplay)
        .setAttribute('data-sm-slides-scroll', content.smCarouselSlidesToScroll)

        .setAttribute('data-md-indicators', content.mdCarouselIndicators)
        .setAttribute('data-md-controls', content.mdCarouselControls)
        .setAttribute('data-md-slides-display', content.mdCarouselSlidesToDisplay)
        .setAttribute('data-md-slides-scroll', content.mdCarouselSlidesToScroll)

    model.title = content.textHeadline ? content.textHeadline : null;
    return model;
}

module.exports = {
    init: init
};
