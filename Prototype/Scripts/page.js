'use strict';
var Menu = require('./menu.js'),
    Search = require('./search.js'),
    Gallery = require('./gallery.js'),
    Carousel = require('./carousel.js');

module.exports = pageWrapper();

function pageWrapper() {

    function Page(options){
    this._el = options.elem;

    this._menu = new Menu({
        elem: document.querySelector('[data-component=menu]'),
        items: options.menuItems
    });

    this._search = new Search({
        elem: document.querySelector('[data-component=search]')
    });

    this._gallery = new Gallery({
        elem: document.querySelector('[data-component=gallery]'),
        item: null
    });

    this._carousel = new Carousel({
        elem: document.querySelector('[data-component=carousel]'),
        items: null
    });

    this._search.getElement().addEventListener('search', this._onSearch.bind(this));
    this._menu.getElement().addEventListener('itemSelected',
        this._onMenuItemSelected.bind(this));
    this._carousel.getElement().addEventListener('imageSelected',
        this._onImageChange.bind(this));
    this._carousel.getElement().addEventListener('arroqClick',
        this._onArrowClick.bind(this));


    }

    Page.prototype._onSearch = function(event) {
        this._menu.filteringItems(event.detail.searchValue);
    };

    Page.prototype._onMenuItemSelected = function(event) {
       this._loadPhoneData(event.detail.phoneId);
    };

    Page.prototype._loadPhoneData = function(phoneId) {
        var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;

        var xhr = new XHR();

        xhr.open('GET', ('../Data/phones/' + phoneId + '.json'), true);

        xhr.send();

        xhr.addEventListener('load', this._phoneDataLoaded.bind(this));
    };

    Page.prototype._phoneDataLoaded = function(event) {
        var phoneData = JSON.parse(event.target.responseText);
        this._gallery.setGalleryItems(phoneData.images[0]);
        this._carousel.setCarouselItems(phoneData.images);
    };

    Page.prototype._onImageChange = function(event) {
        this._gallery.changePicture(event.detail.src, event.detail.alt);
    };

    Page.prototype._onArrowClick = function(event) {
        this._carousel.moveImages(event.detail);
    };

    return Page;
}
