'use strict';

module.exports = menuWrapper(); 

function menuWrapper() {

    function Menu(options){
        this._el = options.elem;
        this._templateFunction = require('./../../Templates/menu-list.hbs');
        this._itemsTemplateFunction = require('./../../Templates/menu-items.hbs');
        this._items = options.items;

        this._el.addEventListener('click', this._onItemClick.bind(this));

        this._render();
    }

    Menu.prototype.getElement = function() {
        return this._el;
    };

    Menu.prototype.filteringItems = function(searchValue) {
        var filteredItems = this._items.filter(function(item) {
            return ~item.name.toLowerCase().indexOf(searchValue.toLowerCase());
        }.bind(this));
        this._renderItems(filteredItems);
    };

    Menu.prototype._render = function() {
        this._el.innerHTML = this._templateFunction();
        this._renderItems(this._items);
    };

    Menu.prototype._renderItems = function(currentItems) {
        var list = this._el.querySelector('[data-component=menu-list]');
        list.innerHTML = '';

        currentItems.forEach(function(item) {
            list.insertAdjacentHTML('beforeEnd', this._itemsTemplateFunction(item));
        }.bind(this));
    };

    Menu.prototype._onItemClick = function(event) {
        var item = event.target.closest('[data-component=menu-item]');

        if(!item) return;

        this._el.dispatchEvent(new CustomEvent('itemSelected', {detail:
        {phoneId: item.getAttribute('data-id')}}));
    };

    return Menu;
}
