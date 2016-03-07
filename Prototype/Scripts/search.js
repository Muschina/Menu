'use strict';

module.exports = searchWrapper();

function searchWrapper() {
    
    function Search(options){
        this._el = options.elem;
        this._timerId = null;
        this._el.innerHTML = require('./../../Templates/search.hbs')({});

        this._el.addEventListener('input', this._onSearchInput.bind(this));
        this._el.addEventListener('blur', this._onSearchBlur.bind(this));
    }

    Search.prototype.getElement = function() {
        return this._el;
    };

    Search.prototype._onSearchInput = function(event) {
        var search = event.target.closest('[data-component=search-value]');

        if(!search) return;

        if('onpropertychange' in search) {
            var lastInputValue = search.value;

            this._timerId = setInterval(function(){
               if(lastInputValue != search.value) {
                   this._el.dispatchEvent(new CustomEvent('search',
                       { detail: {searchValue: search.value} }) );
                   lastInputValue = search.value;
               }
            }.bind(this), 20);
        }
        else {
            this._el.dispatchEvent(new CustomEvent('search', {detail: {searchValue: search.value}}));
        }
    };

    Search.prototype._onSearchBlur = function(event) {
        clearInterval(this._timerId);
    };

    return Search;
}