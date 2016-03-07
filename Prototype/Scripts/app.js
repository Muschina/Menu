'use strict';

var Page = require('./page.js');

var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;

var xhr = new XHR();

xhr.open('GET', '../Data/phones/phones.json', true);

xhr.send();

xhr.addEventListener('load', function(){
    var menuItems = (JSON).parse(xhr.responseText);

    var page = new Page({
        elem: document.querySelector('[data-component=page]'),
        menuItems: menuItems
    });
});

