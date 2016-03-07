'use strict';

var xhr = new XMLHttpRequest();

xhr.open('GET', '../Data/phones/phones.json', true);

xhr.send();

xhr.addEventListener('load', function(){
    let menuItems = (JSON).parse(xhr.responseText);

    let page = new Page({
        elem: document.querySelector('[data-component=page]'),
        menuItems: menuItems,
        menuTemplate: document.querySelector('#menu-list').innerHTML,
        menuItemsTemplate: document.querySelector('#menu-items').innerHTML,
        searchTemplate: document.querySelector('#search-field').innerHTML,
        galleryLargeImgTemplate: document.querySelector('#gallery-large-img').innerHTML,
        carouselTemplate: document.querySelector('#carousel-field').innerHTML,
        carouselItemsTemplate: document.querySelector('#carousel-items').innerHTML
    });
});

