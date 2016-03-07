"use strict";

module.exports = carouselWrapper();

function carouselWrapper() {

    function Carousel(options){

        this._el = options.elem;
        this._items = options.items;
        this._carouselTemplateFunction = require('./../../Templates/carousel-field.hbs');
        this._carouselItemsTemplateFunction = require('./../../Templates/carousel-items.hbs');
        this._left = this._leftMoveImages.bind(this);
        this._right = this._rightMoveImages.bind(this);
        this._changeBorder = this._changeBorderSelectedImage.bind(this);
        this._animationImages = this._animationMovingImages.bind(this);
        this._animation = this._animationFunction.bind(this);

        this._el.addEventListener('click', this._onImageClick.bind(this));
        this._el.addEventListener('click', this._onArrowClick.bind(this));
    }

    Carousel.prototype.setCarouselItems = function(items) {
        this._items = items;
        this._render();
    };

    Carousel.prototype.getElement = function() {
        return this._el;
    };

    Carousel.prototype.changePicture = function(img, src, alt) {
        img.src = src;
        img.alt = alt;
    };

    Carousel.prototype.moveImages = function(arrow) {
        var listImages = document.querySelector('[data-component=carousel-items-container]');

        if(!listImages.hasAttribute('data-margin')) {
            listImages.setAttribute('data-margin', '0')
        }


        var positionImages = parseFloat(listImages.getAttribute('data-margin'));
        var widthImage = 11.4;
        var amountMoveImages = 1;

        var newPositionImages = ((arrow.id === 'arrow-left')
                   ? this._left(positionImages, widthImage, amountMoveImages)
                   : this._right(positionImages, widthImage, amountMoveImages));

        if(!('transition' in listImages.style)) {
            this._animationImages(positionImages, newPositionImages);
        }

        listImages.style.marginLeft = newPositionImages + 'vw';
        listImages.setAttribute('data-margin', newPositionImages);
    };

    Carousel.prototype._render = function() {
        this._el.innerHTML = this._carouselTemplateFunction();

        var container = this._el.querySelector('[data-component=carousel-items-container');

        this._items.forEach(function(item) {container.insertAdjacentHTML('beforeEnd',
                this._carouselItemsTemplateFunction({item: '../Data/' + item,
                    title: "Image " + item.slice(-5,-4)}))
        }.bind(this));

        if(this._items.length > 4) {
            var carouselLeftBottom = document.querySelector('#arrow-left');
            var carouselRightBottom = document.querySelector('#arrow-right');
            carouselLeftBottom.classList.toggle('hide-img');
            carouselRightBottom.classList.toggle('hide-img');
        }
    };

    Carousel.prototype._onImageClick = function(event) {
        var smallImageTarget = event.target.closest('[data-component=small-image]');
    
        if (!smallImageTarget) return;

        this._changeBorder(event.target);
    
        this._el.dispatchEvent(new CustomEvent('imageSelected', {detail: smallImageTarget}));
    };

    Carousel.prototype._onArrowClick = function(event) {
        var arrowTarget = event.target.closest('[data-component=carousel-arrow]');

        if(!arrowTarget) return;

        this._el.dispatchEvent(new CustomEvent('arroqClick', {detail: arrowTarget}));
    };

    Carousel.prototype._leftMoveImages = function(position, width, amount) {
        return Math.min(position + amount*width, 0);
    };

    Carousel.prototype._rightMoveImages = function(position, width, amount) {
        return Math.max(position - amount*width, -width*(this._items.length - 4));
    };

    Carousel.prototype._changeBorderSelectedImage = function(target) {
        var clickedImg = document.querySelector('.click-img');

        if(clickedImg) {
            clickedImg.classList.remove('click-img');
        }

        target.classList.add('click-img');
    };

    Carousel.prototype._animationMovingImages = function(begin, end) {
        var start = performance.now();
        var listImages = document.querySelector('[data-component=carousel-items-container]');
        var newPositionImages;

        this._animation({
            duration: 1000,
            draw: function(progress) {
                listImages.style.marginLeft = begin + progress*(end-begin) + 'vw';
            }
        });
    };

    Carousel.prototype._animationFunction = function (options) {
        var start = performance.now();

        requestAnimationFrame(function animate(time) {

            var progress = (time - start) / options.duration;
            if (progress > 1) progress = 1;

            options.draw(progress);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }

        });
    };

    return Carousel;
}
