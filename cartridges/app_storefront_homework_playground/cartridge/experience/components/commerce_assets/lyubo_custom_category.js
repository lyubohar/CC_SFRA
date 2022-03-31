'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var URLUtils = require('dw/web/URLUtils');
var ImageTransformation = require('*/cartridge/experience/utilities/ImageTransformation.js');

/**
 * Render logic for the storefront.popularCategories.
 * @param {dw.experience.ComponentScriptContext} context The Component script context object.
 * @param {dw.util.Map} [modelIn] Additional model values created by another cartridge. This will not be passed in by Commcerce Cloud Plattform.
 *
 * @returns {string} The markup to be displayed
 */
module.exports.render = function (context, modelIn) {
    var model = modelIn || new HashMap();
    var content = context.content; // fields in Page Designer/json
    model.textHeadline = content.textHeadline;

    var catObj = {};
    var cat = content.category; // base cat object in database
    
    if (cat) {
        catObj.ID = cat.ID;     
        catObj.name = cat.displayName;

        if (content.catShortDesc) {
            catObj.catShortDesc = content.catShortDesc;
        }

        if (cat.custom.slotBannerImage) {
            catObj.imageURL = cat.custom.slotBannerImage.getURL().toString();
        }

        if (content.position) {
            catObj.position = content.position;
        }

        if (content.cta) {
            catObj.cta = content.cta;
        }

        catObj.url = cat.custom && 'alternativeUrl' in cat.custom && cat.custom.alternativeUrl
            ? cat.custom.alternativeUrl
            : URLUtils.url('Search-Show', 'cgid', cat.getID()).toString();
    }

    model.category = catObj;
    return new Template('experience/components/commerce_assets/lyubo_custom_category').render(model).text;
};
