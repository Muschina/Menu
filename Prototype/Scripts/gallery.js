"use strict";

module.exports = galleryWrapper();

function galleryWrapper() {

    function Gallery(options){

    this._el = options.elem;
    this._item = options.item;
    this._galleryLargeImgTemplateFunction = require('./../../Templates/gallery.hbs');
    }

    Gallery.prototype.getElement = function() {
        return this._el;
    };

    Gallery.prototype.setGalleryItems = function(item) {
        this._item = item;
        this._render();
    };

    Gallery.prototype.changePicture = function(src, alt) {
        var largePicture = document.querySelector('[data-component=large-image]');
        largePicture.src = src;
        largePicture.alt = alt;
    };

    Gallery.prototype._render = function() {
        this._el.innerHTML = this._galleryLargeImgTemplateFunction({item: '../Data/'
             + this._item, title: "Image " + this._item.slice(-5,-4)});
    };

    return Gallery;
}



