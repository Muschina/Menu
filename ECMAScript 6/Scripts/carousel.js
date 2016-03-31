"use strict";

export default class Carousel {
    constructor(options) {
        this._el = options.elem;
        this._items = options.items;
        this._carouselTemplateFunction = require('./../../Templates/carousel-field.hbs');
        this._carouselItemsTemplateFunction = require('./../../Templates/carousel-items.hbs');
        this._left = this._leftMoveImages.bind(this);
        this._right = this._rightMoveImages.bind(this);
        this._changeBorder = this._changeBorderSelectedImage.bind(this);

        this._el.addEventListener('click', this._onImageClick.bind(this));
        this._el.addEventListener('click', this._onArrowClick.bind(this));
    }

    setCarouselItems(items) {
        this._items = items;
        this._render();
    }

    getElement() {
        return this._el;
    }

    changePicture(img, src, alt) {
        img.src = src;
        img.alt = alt;
    }

    moveImages(arrow) {
        let listImages = document.querySelector('[data-component=carousel-items-container]');

        if(!listImages.hasAttribute('data-margin')) {
            listImages.dataset.margin = 0;
        }


        let positionImages = parseFloat(listImages.getAttribute('data-margin'));
        let widthImage = 11.4;
        let amountMoveImages = 1;

        let newPositionImages = ((arrow.id === 'arrow-left')
            ? this._left(positionImages, widthImage, amountMoveImages)
            : this._right(positionImages, widthImage, amountMoveImages));

        listImages.style.marginLeft = newPositionImages + 'vw';
        listImages.dataset.margin = newPositionImages;
    }

    _render() {
        this._el.innerHTML = this._carouselTemplateFunction();

        let container = this._el.querySelector('[data-component=carousel-items-container');

        this._items.forEach(function(item) {container.insertAdjacentHTML('beforeEnd',
            this._carouselItemsTemplateFunction({item: `../Data/${item}`,
                title: `Image ${item.slice(-5,-4)}`}))
        }.bind(this));

        if(this._items.length > 4) {
            let carouselLeftBottom = document.querySelector('#arrow-left');
            let carouselRightBottom = document.querySelector('#arrow-right');
            carouselLeftBottom.classList.toggle('hide-img');
            carouselRightBottom.classList.toggle('hide-img');
        }
    }

    _onImageClick(event) {
        let smallImageTarget = event.target.closest('[data-component=small-image]');

        if (!smallImageTarget) return;

        this._changeBorder(event.target);

        this._el.dispatchEvent(new CustomEvent('imageSelected', {detail: smallImageTarget}));
    }

    _onArrowClick(event) {
        let arrowTarget = event.target.closest('[data-component=carousel-arrow]');

        if(!arrowTarget) return;

        this._el.dispatchEvent(new CustomEvent('arroqClick', {detail: arrowTarget}));
    }

    _leftMoveImages(position, width, amount) {
        return Math.min(position + amount*width, 0);
    }

    _rightMoveImages(position, width, amount) {
        return Math.max(position - amount*width, -width*(this._items.length - 4));
    }

    _changeBorderSelectedImage(target) {
        let clickedImg = document.querySelector('.click-img');

        if(clickedImg) {
            clickedImg.classList.remove('click-img');
        }

        target.classList.add('click-img');
    }
}



