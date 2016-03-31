'use strict';

export default class Search{
    constructor(options) {
        this._el = options.elem;
        this._el.innerHTML = require('./../../Templates/search.hbs')({});

        this._el.addEventListener('input', this._onSearchInput.bind(this))
    }

    getElement() {
        return this._el;
    }

    _onSearchInput(event) {
        var search = event.target.closest('[data-component=search-value]');

        if(!search) return;

        this._el.dispatchEvent(new CustomEvent('search', { detail: {searchValue: search.value} }) );
    }
}
