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
    var pd = context.content

    var xsDisplayIndicators = pd.xsCarouselIndicators ? ' xs-display-indicators' : ''
    var xsDisplayControls = pd.xsCarouselControls ? ' xs-display-controls' : ''
    var xsSlidesDisplay = pd.xsCarouselSlidesToDisplay ? ' xs-slides-display-' + pd.xsCarouselSlidesToDisplay : ''
    var xsSlidesScroll = pd.xsCarouselSlidesToScroll ? ' xs-slides-scroll-' + pd.xsCarouselSlidesToScroll : ''

    var smDisplayIndicators = pd.smCarouselIndicators ? ' sm-display-indicators' : ''
    var smDisplayControls = pd.smCarouselControls ? ' sm-display-controls' : ''
    var smSlidesDisplay = pd.smCarouselSlidesToDisplay ? ' sm-slides-display-' + pd.smCarouselSlidesToDisplay : ''
    var smSlidesScroll = pd.smCarouselSlidesToScroll ? ' sm-slides-scroll-' + pd.smCarouselSlidesToScroll : ''

    var mdDisplayIndicators = pd.mdCarouselIndicators ? ' md-display-indicators' : ''
    var mdDisplayControls = pd.mdCarouselControls ? ' md-display-controls' : ''
    var mdSlidesDisplay = pd.mdCarouselSlidesToDisplay ? ' md-slides-display-' + pd.mdCarouselSlidesToDisplay : ''
    var mdSlidesScroll = pd.mdCarouselSlidesToScroll ? ' md-slides-scroll-' + pd.mdCarouselSlidesToScroll : ''

    carouselElement.setClassName('lyubo-hero-carousel' + mdDisplayIndicators + mdDisplayControls + mdSlidesDisplay + mdSlidesScroll + smDisplayIndicators + smDisplayControls + smSlidesDisplay + smSlidesScroll + xsDisplayIndicators + xsDisplayControls + xsSlidesDisplay + xsSlidesScroll);

    // carouselElement.setAttribute('test', pd.xsCarouselIndicators);

    model.title = pd.textHeadline ? pd.textHeadline : null;
    return model;
}

module.exports = {
    init: init
};
