'use strict';

export default class Menu{
    constructor(options) {
        this._el = options.elem;
        this._templateFunction = require('./../../Templates/menu-list.hbs');
        this._itemsTemplateFunction = require('./../../Templates/menu-items.hbs');
        this._items = options.items;

        this._el.addEventListener('click', this._onItemClick.bind(this));

        this._render();


    }

    getElement() {
        return this._el;
    }

    filteringItems(searchValue){
        var filteredItems = this._items.filter(function(item) {
            return ~item.name.toLowerCase().indexOf(searchValue.toLowerCase());
        }.bind(this));
        this._renderItems(filteredItems);
    }

    _render() {
        this._el.innerHTML = this._templateFunction();
        this._renderItems(this._items);
    }

    _renderItems(currentItems) {
        var list = this._el.querySelector('[data-component=menu-list]');
        list.innerHTML = '';

        currentItems.forEach(function(item) {
            list.insertAdjacentHTML('beforeEnd', this._itemsTemplateFunction(item));
        }.bind(this));
    }

    _onItemClick(event) {
        var item = event.target.closest('[data-component=menu-item]');

        if(!item) return;

        this._el.dispatchEvent(new CustomEvent('itemSelected', {detail: {phoneId: item.dataset.id}}));
    }
}
