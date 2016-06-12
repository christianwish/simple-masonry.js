(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    return {
        /**
         * An array that consists of array merges all in to a single array by zipper method 
         * @param  {array} arrayOfArrays    array consists of arrays
         * @return {array} new ordered array
         */
        zipperArray: function zipperArray(arrayOfArrays) {
            var resultArray = void 0,
                length = void 0;

            if (typeof arrayOfArrays == 'undefined' || !Array.isArray(arrayOfArrays) || arrayOfArrays.length == 0) {
                return [];
            }

            resultArray = [];
            length = arrayOfArrays.length;

            /**
             * Recursion through all arrays
             * @param  {number} colIndex  index of column
             * @param  {number} itemIndex index of item
             */
            function order(counter) {
                var emptyNumber = 0;

                for (var i = 0; i < length; i += 1) {
                    if (typeof arrayOfArrays[i][counter] != 'undefined') {
                        resultArray.push(arrayOfArrays[i][counter]);
                    } else {
                        emptyNumber += 1;
                    }
                }

                if (emptyNumber < length) {
                    return order(counter += 1);
                }

                return resultArray;
            };

            return order(0);
        },
        /**
         * Check if parameter is DOM node
         * @param  {(object|string|number)} node
         * @return {boolean}
         */
        isNode: function isNode(node) {
            return node && typeof node.innerHTML === 'string' || false;
        }
    };
};

},{}],2:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _helper = require('./components/helper');

var _helper2 = _interopRequireDefault(_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var helper = new _helper2.default();

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['SimpleMasonry'], factory);
    } else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
        // npm
        module.exports = factory;
    } else {
        // Browser global
        window.SimpleMasonry = factory;
    }
})(function () {
    var instances = [],
        privates = [],

    // Private object accessor function
    _ = function _(instance) {
        var index = instances.indexOf(instance),
            privateObj;
        if (index < 0) {
            instances.push(instance);
            privateObj = {};
            privates.push(privateObj);
        } else {
            privateObj = privates[index];
        }
        return privateObj;
    };
    /**
     * SimpleMasonry Class
     * @param  {object} settings
     */

    var SimpleMasonry = function () {
        function SimpleMasonry() {
            var settings = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            _classCallCheck(this, SimpleMasonry);

            var that = this,
                privateProps,

            // Default settings
            defaults = {
                masonryBox: '.masonry-box',
                masonryColumn: '.masonry-column'
            };

            var initColumns = void 0,
                initItems = void 0,
                getChildNodes = void 0;

            _(that).privates = {};
            privateProps = _(that).privates;

            // Overwrite defaults
            for (var prop in defaults) {
                if (defaults.hasOwnProperty(prop)) {
                    if (!!settings[prop]) {
                        defaults[prop] = settings[prop];
                    }
                }
            }

            // Css Class used for columnboxes
            privateProps.masonryBox = defaults.masonryBox;
            // Css Class used for columns
            privateProps.masonryColumn = defaults.masonryColumn;

            // All ColumnBox-Nodes
            privateProps.columnBoxes = function () {
                if (!!helper.isNode(privateProps.masonryBox)) {
                    return [privateProps.masonryBox];
                } else if (!!Array.isArray(privateProps.masonryBox)) {
                    return privateProps.masonryBox;
                } else if (typeof privateProps.masonryBox === 'string') {
                    return document.querySelectorAll(privateProps.masonryBox);
                } else {
                    return [];
                }
            }();

            /**
             * Init all Stuff for a ColumnBox
             * @param  {object} columnBox
             */
            privateProps.init = function (columnBox) {};

            /**
             * Resize function reorder items
             */
            window.addEventListener('resize', function () {});
        } // END of constructor

        /**
         * Init all
         * @return {object} this
         */


        _createClass(SimpleMasonry, [{
            key: 'init',
            value: function init() {
                var that = this,
                    privateProps = _(that).privates;

                return this;
            }

            /**
             * Add a node or a array of nodes at the end of all items
             * @param  {Node|Array} node
             * @return {object}      this
             */

        }, {
            key: 'append',
            value: function append(node) {
                return this;
            }

            /**
             * Add a node or a array of nodes at the beginning of all items
             * @param  {Node|Array} node
             * @return {object}      this
             */

        }, {
            key: 'prepend',
            value: function prepend(node) {
                return this;
            }

            /**
             * Get all items or the items of a single column
             * @param  {number} colNumber 0 for the first column
             * @return {array}           Array of items
             */

        }, {
            key: 'get',
            value: function get(colNumber) {
                return this;
            }

            /**
             * Iterate trough all items or to all items of a single column
             * @param  {object} f         callback for single item
             * @param  {number} colNumber just items of this column
             * @return {object}           this
             */

        }, {
            key: 'each',
            value: function each(f, colNumber) {
                return this;
            }

            /**
             * Register an Event
             * @param  {string} eventType name of the event
             * @param  {function} f         callback
             * @return {object}           this
             */

        }, {
            key: 'on',
            value: function on(eventType, f) {
                return this;
            }

            /**
             * Get number of available columns
             * @return {number}
             */

        }, {
            key: 'columnsLength',
            value: function columnsLength() {
                return this;
            }

            /**
             * Get number of items
             * @return {number}
             */

        }, {
            key: 'itemsLength',
            value: function itemsLength() {
                return this;
            }
        }]);

        return SimpleMasonry;
    }();

    return SimpleMasonry;
}());

},{"./components/helper":1}]},{},[2]);
