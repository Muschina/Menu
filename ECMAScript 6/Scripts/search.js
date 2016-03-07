'use strict';

class Search{
    constructor(options) {
        this._el = options.elem;
        this._el.innerHTML = _.template(options.searchTemplate)();

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
