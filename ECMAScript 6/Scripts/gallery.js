"use strict";

class Gallery{
    constructor(options) {
        this._el = options.elem;
        this._item = options.item;
        this._galleryLargeImgTemplateFunction = _.template(options.galleryLargeImgTemplate);
    }

    getElement() {
        return this._el;
    }

    setGalleryItems(item) {
        this._item = item;
        this._render();
    }

    changePicture(src, alt) {
        var largePicture = document.querySelector('[data-component=large-image]');
        largePicture.src = src;
        largePicture.alt = alt;
    }

    _render() {
        this._el.innerHTML = this._galleryLargeImgTemplateFunction({item: '../Data/'
                            + this._item, title: "Image " + this._item.slice(-5,-4)});
    }

}

