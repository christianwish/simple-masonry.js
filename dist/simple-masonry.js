(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    /**
     * get a reversed Copy from srcArray
     * @param  {array} srcArray
     * @return {array}
     */
    getReverseArrayCopy: function getReverseArrayCopy(srcArray) {
        var resultArray = [],
            i = srcArray.length - 1;

        for (i; i >= 0; i -= 1) {
            resultArray.push(srcArray[i]);
        }

        return resultArray;
    },

    /**
        * Removes node's position in array
        * @param  {object} node
        */
    spliceNodeFromArray: function spliceNodeFromArray(node, srcArray) {
        var index = srcArray.indexOf(node);
        if (index >= 0) {
            srcArray.splice(index, 1);
        }
    },

    /**
    * Check if parameter is DOM node
    * @param  {(object|string|number)} node
    * @return {boolean}
    */
    isNode: function isNode(node) {
        return node && typeof node.innerHTML === 'string';
    }
};

},{}],2:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* jslint esnext:true */


var _helper = require('./components/helper');

var _helper2 = _interopRequireDefault(_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['SimpleMasonry'], factory);
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
     * @param  {Object} settings
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
                if (!!_helper2.default.isNode(privateProps.masonryBox)) {
                    return [privateProps.masonryBox];
                } else if (!!Array.isArray(privateProps.masonryBox)) {
                    return privateProps.masonryBox;
                } else if (typeof privateProps.masonryBox === 'string') {
                    return document.querySelectorAll(privateProps.masonryBox);
                } else {
                    return [];
                }
            }();

            // Columnbox iterator Number i
            privateProps.iBoxes = privateProps.columnBoxes.length - 1;

            /**
             * @param  {Object} columnBox
             * @return {number}
             */
            privateProps.countAvailableColumns = function (columnBox) {
                var cols = columnBox.simpleMesonry.columns,
                    iCol = cols.length - 1,
                    newCount = 0;

                // If a column exist
                if (iCol > -1) {
                    // Top of first column
                    var offsetTop = cols[cols.length - 1].offsetTop;
                    // Iterate through columns
                    for (iCol; iCol >= 0; iCol -= 1) {
                        // If the topvalue is the same
                        if (cols[iCol].offsetTop === offsetTop) {
                            newCount += 1;
                        }
                    }
                    return newCount;
                }
                return 0;
            };

            /**
             * Sorts all items in the available columns
             * @param  {Object} columnBox
             */
            privateProps.orderItems = function (columnBox) {
                // Check all available columns.. returns a Number
                var is = privateProps.countAvailableColumns(columnBox),
                    items,
                    iItem,
                    cols,
                    useCol,
                    dontUseCols;
                columnBox.simpleMesonry.fill = is;
                cols = columnBox.simpleMesonry.columns;
                useCol = cols.length - 1;
                dontUseCols = useCol - is;
                items = columnBox.simpleMesonry.items;
                iItem = items.length - 1;
                // Iterate all items to sort them to the right column
                for (iItem; iItem >= 0; iItem -= 1) {
                    if (useCol <= dontUseCols) {
                        useCol = cols.length - 1;
                    }
                    cols[useCol].appendChild(items[iItem]);
                    useCol -= 1;
                }
                privateProps.doEvent('order', items);
            };

            /**
             * Returns a array of childnodes without any textnodes
             * @param  {Object} parent The object whose children are to be filtered
             * @return {Array}  all childnodes but no textnodes
             */
            getChildNodes = function getChildNodes(parent) {
                var children = parent.childNodes,
                    iChild = children.length - 1,
                    result = [];
                // iterate childnodes
                for (iChild; iChild >= 0; iChild -= 1) {
                    // no textNodes or commentNodes
                    if (!!_helper2.default.isNode(children[iChild])) {
                        result.push(children[iChild]);
                    }
                }
                // Reverses the result to bring it in the right order
                return result.reverse();
            };

            /**
             * Finds all childnodes (items) in columns and collects them as an array in the right order
             * @param  {Object} columnBox
             */
            initItems = function initItems(columnBox) {
                var cols = columnBox.simpleMesonry && columnBox.simpleMesonry.columns,
                    iCols = cols.length - 1,
                    filtered,
                    columnItemArray = [],


                /**
                 * An array that consists of array is merged in the zipper method to a single array
                 * @param  {Array} arrayArray consists arrays
                 * @return {Array} new ordered items
                 */
                orderArrays = function orderArrays(arrayArray) {
                    var resultArray = [],
                        length = arrayArray.length,
                        nothing = 0,


                    /**
                     * Recursion through all contained arrays to use zipper-method
                     * @param  {number} col  the column
                     * @param  {number} item the item
                     */
                    order = function order(col, item) {

                        if (nothing < length) {
                            if (col === length) {
                                // set to 0
                                nothing = col = 0;
                                // next item
                                item += 1;
                            }
                            // If this item exists
                            if (!!arrayArray[col][item]) {
                                resultArray.push(arrayArray[col][item]);
                            } else {
                                nothing += 1;
                            }
                            // Recursion
                            order(col + 1, item);
                        }
                    };
                    // Start Recursion
                    order(0, 0);
                    // Reverse the result
                    return resultArray.reverse();
                };

                for (iCols; iCols >= 0; iCols -= 1) {
                    // Dont use text-Nodes
                    filtered = getChildNodes(cols[iCols]);
                    columnItemArray.push(filtered);
                }
                // Put items as referenz on columnbox
                columnBox.simpleMesonry.items = orderArrays(columnItemArray);
            };

            /**
             * Finds all columns that are childnodes of this columnbox
             * @param  {Object} columnBox
             */
            initColumns = function initColumns(columnBox) {
                var columns = columnBox.querySelectorAll(privateProps.masonryColumn);
                var iColumns = columns.length - 1;
                // Iterartion through all columns
                for (iColumns; iColumns >= 0; iColumns -= 1) {
                    // If this column is realy a childnode of this columnbox
                    if (columns[iColumns].parentNode === columnBox) {
                        // Put referenz on this columnbox
                        columns[iColumns].style.minHeight = '1px';
                        columns[iColumns].style.minWidth = '1px';
                        columns[iColumns].style.float = 'left';
                        columnBox.simpleMesonry.columns.push(columns[iColumns]);
                    }
                }
            };

            /**
             * Store al events from .on()
             * @type {Object}
             */
            privateProps.eventStore = {};

            /**
             * Init a Event and calls all callbacks when exists
             * @param  {string} name  eventName
             * @param  {Object|Node|Array} param depending on eventType
             */
            privateProps.doEvent = function (name, param) {
                if (!!privateProps.eventStore[name]) {
                    var i = privateProps.eventStore[name].length - 1;
                    for (i; i >= 0; i -= 1) {
                        privateProps.eventStore[name][i](param);
                    }
                }
            };

            /**
             * Init all Stuff for a ColumnBox
             * @param  {Object} columnBox
             */
            privateProps.init = function (columnBox) {
                // expand object for all coming references
                columnBox.simpleMesonry = {
                    columns: [], // columns
                    items: null, // items
                    fill: 0 // number of available columns
                };

                // initialize all columns
                initColumns(columnBox);
                // initialize all items
                initItems(columnBox);
                // orders items to the right columns
                privateProps.orderItems(columnBox);
            };

            /**
             * Resize function reorder items
             */
            window.addEventListener('resize', function () {
                var i = privateProps.columnBoxes.length - 1;
                for (i; i >= 0; i -= 1) {
                    // get all "available" columns
                    var columnBox = privateProps.columnBoxes[i],
                        is = privateProps.countAvailableColumns(columnBox);
                    // just if the number of available columns changed
                    if (is !== columnBox.simpleMesonry.fill) {
                        privateProps.orderItems(columnBox);
                    }
                }
            });
        } // END of constructor

        /**
         * Init all
         * @return {Object} this
         */


        _createClass(SimpleMasonry, [{
            key: 'init',
            value: function init() {
                var that = this,
                    privateProps = _(that).privates,
                    columnBoxes = privateProps.columnBoxes,
                    i = privateProps.iBoxes;

                for (i; i >= 0; i -= 1) {
                    privateProps.init(columnBoxes[i]);
                }

                return this;
            }

            /**
             * Add a node or a array of nodes at the end of all items
             * @param  {Node|Array} node
             * @return {Object}      this
             */

        }, {
            key: 'append',
            value: function append(node) {
                var privateProps = _(this).privates,
                    columnBox = privateProps.columnBoxes[0],
                    items = privateProps.columnBoxes[0].simpleMesonry.items,
                    i = 0;

                if (_helper2.default.isNode(node)) {
                    _helper2.default.spliceNodeFromArray(node, items);
                    columnBox.simpleMesonry.items.unshift(node);
                    privateProps.orderItems(columnBox);
                    privateProps.doEvent('append', node);
                } else if (!!Array.isArray(node)) {
                    i = node.length - 1;
                    node.reverse();

                    for (i; i >= 0; i -= 1) {
                        if (!!_helper2.default.isNode(node[i])) {
                            _helper2.default.spliceNodeFromArray(node[i], items);
                            columnBox.simpleMesonry.items.unshift(node[i]);
                            privateProps.doEvent('append', node[i]);
                        }
                    }

                    privateProps.orderItems(columnBox);
                }

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
                var privateProps = _(this).privates,
                    columnBox = privateProps.columnBoxes[0],
                    items = privateProps.columnBoxes[0].simpleMesonry.items,
                    i = 0;
                if (!!_helper2.default.isNode(node)) {
                    _helper2.default.spliceNodeFromArray(node, items);
                    columnBox.simpleMesonry.items.push(node);
                    privateProps.doEvent('prepend', node);
                    privateProps.orderItems(columnBox);
                } else if (!!Array.isArray(node)) {
                    i = node.length - 1;
                    node.reverse();
                    for (i; i >= 0; i -= 1) {
                        if (!!_helper2.default.isNode(node[i])) {
                            _helper2.default.spliceNodeFromArray(node[i], items);
                            columnBox.simpleMesonry.items.push(node[i]);
                            privateProps.doEvent('prepend', node[i]);
                        }
                    }
                    privateProps.orderItems(columnBox);
                }
                return this;
            }

            /**
             * Get all items or the items of a single column
             * @param  {number} colNumber 0 for the first column
             * @return {Array}           Array of items
             */

        }, {
            key: 'get',
            value: function get(colNumber) {
                var privateProps = _(this).privates,
                    columnBox = privateProps.columnBoxes[0];
                var availableColumns = void 0,
                    theColumn = void 0,
                    resultArray = void 0,
                    items = void 0,
                    i = void 0;
                // return all items
                if (typeof colNumber !== 'number') {
                    return _helper2.default.getReverseArrayCopy(columnBox.simpleMesonry.items);
                } else {
                    availableColumns = privateProps.countAvailableColumns(columnBox) - 1;
                    // if column not available
                    if (colNumber > availableColumns) {
                        return [];
                    }
                    theColumn = columnBox.simpleMesonry.columns[columnBox.simpleMesonry.columns.length - 1 - colNumber];
                    resultArray = [];
                    items = columnBox.simpleMesonry.items;
                    i = items.length - 1;
                    for (i; i >= 0; i -= 1) {
                        if (items[i].parentNode === theColumn) {
                            resultArray.push(items[i]);
                        }
                    }
                    return _helper2.default.getReverseArrayCopy(resultArray);
                }
            }

            /**
             * Iterate trough all items or to all items of a single column
             * @param  {Object} f         callback for single item
             * @param  {number} colNumber just items of this column
             * @return {Object}           this
             */

        }, {
            key: 'each',
            value: function each(f, colNumber) {
                var items = void 0,
                    i = void 0;
                if (typeof f === 'function') {
                    items = this.get(colNumber);
                    i = items.length - 1;
                    for (i; i >= 0; i -= 1) {
                        // callback (item, index)
                        f(items[i], items.length - 1 - i);
                    }
                }
                return this;
            }

            /**
             * Register an Event
             * @param  {string} eventType name of the event
             * @param  {Function} f         callback
             * @return {Object}           this
             */

        }, {
            key: 'on',
            value: function on(eventType, f) {
                var privateProps = _(this).privates;
                if (!privateProps.eventStore[eventType]) {
                    privateProps.eventStore[eventType] = [];
                }
                if (typeof f === 'function') {
                    privateProps.eventStore[eventType].push(f);
                }
                return this;
            }

            /**
             * Get number of available columns
             * @return {number}
             */

        }, {
            key: 'columnsLength',
            value: function columnsLength() {
                var privateProps = _(this).privates,
                    columnBox = privateProps.columnBoxes[0];
                return privateProps.countAvailableColumns(columnBox);
            }
        }]);

        return SimpleMasonry;
    }();

    return SimpleMasonry;
}());

},{"./components/helper":1}]},{},[2]);
