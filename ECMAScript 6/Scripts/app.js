'use strict';

import Page from './page.js';

let xhr = new XMLHttpRequest();

xhr.open('GET', '../Data/phones/phones.json', true);

xhr.send();

xhr.addEventListener('load', function(){
    let menuItems = (JSON).parse(xhr.responseText);

    let page = new Page({
        elem: document.querySelector('[data-component=page]'),
        menuItems: menuItems
    });
});

