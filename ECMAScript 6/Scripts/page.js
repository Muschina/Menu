'use strict';

class Page{
    constructor(options) {
        this._el = options.elem;

        this._menu = new Menu({
            elem: document.querySelector('[data-component=menu]'),
            items: options.menuItems,
            menuTemplate: options.menuTemplate,
            menuItemsTemplate: options.menuItemsTemplate
        });

        this._search = new Search({
            elem: document.querySelector('[data-component=search]'),
            searchTemplate: options.searchTemplate
        });

        this._gallery = new Gallery({
            elem: document.querySelector('[data-component=gallery]'),
            item: null,
            galleryLargeImgTemplate: options.galleryLargeImgTemplate,
        });

        this._carousel = new Carousel({
            elem: document.querySelector('[data-component=carousel]'),
            items: null,
            carouselTemplate: options.carouselTemplate,
            carouselItemsTemplate: options.carouselItemsTemplate
        });

        this._search.getElement().addEventListener('search', this._onSearch.bind(this));
        this._menu.getElement().addEventListener('itemSelected',
            this._onMenuItemSelected.bind(this));
        this._carousel.getElement().addEventListener('imageSelected',
            this._onImageChange.bind(this));
        this._carousel.getElement().addEventListener('arroqClick',
            this._onArrowClick.bind(this));

    }

    _onSearch(event) {
        this._menu.filteringItems(event.detail.searchValue);
    }

    _onMenuItemSelected(event) {
       this._loadPhoneData(event.detail.phoneId);
    }

    _loadPhoneData(phoneId) {
        var xhr = new XMLHttpRequest();

        xhr.open('GET', `../Data/phones/${phoneId}.json`, true);

        xhr.send();

        xhr.addEventListener('load', this._phoneDataLoaded.bind(this));
    }

    _phoneDataLoaded(event) {
        let phoneData = JSON.parse(event.target.responseText);
        this._gallery.setGalleryItems(phoneData.images[0]);
        this._carousel.setCarouselItems(phoneData.images);
    }

    _onImageChange(event) {
    this._gallery.changePicture(event.detail.src, event.detail.alt);
};

    _onArrowClick(event) {
    this._carousel.moveImages(event.detail);
};
}