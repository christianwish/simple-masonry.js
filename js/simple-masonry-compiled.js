'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* jslint esnext:true */
/**
 * SimpleMasonry
 * @param  {Object} settings with selectors
 * @return {Object} this
 */
var SimpleMasonry = function () {
    var instances = [],
        privates = [],

    // private object accessor function
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
    // init SimpleMasonry's private Object
    /**
     * SimpleMasonry Class
     * @param  {String|Node} columnBoxClass Name of the wrapper-selector or node
     * @param  {String} columnClass    Name of the column-selector
     */

    var SimpleMasonryInner = function () {
        function SimpleMasonryInner() {
            var settings = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            _classCallCheck(this, SimpleMasonryInner);

            var that = this,
                privateProps,

            // Default settings
            defaults = {
                masonryBox: '.masonry-box',
                masonryColumn: '.masonry-column'
            };

            // functions used just in this constructor
            var initColumns = undefined,
                initItems = undefined,
                getChildNodes = undefined;

            // create private Object
            _(this).privates = {};
            privateProps = _(this).privates;
            // overwrite defaults
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

            /**
             * check if parameter is a node
             * @param  {(Object|String|Number)} node
             * @return {Boolean}
             */
            privateProps.isNode = function (node) {
                return node && typeof node.innerHTML === 'string';
            };
            // all ColumnBox-Nodes
            privateProps.columnBoxes = function () {
                if (!!privateProps.isNode(privateProps.masonryBox)) {
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
             * @param  {Node} columnBox
             * @return {Integer}
             */
            privateProps.countAvailableColumns = function (columnBox) {
                var cols = columnBox.simpleMesonry.columns;
                var iCol = cols.length - 1,
                    newCount = 0;
                // if a column exist
                if (iCol > -1) {
                    // Top of first column
                    var offsetTop = cols[cols.length - 1].offsetTop;
                    // iterate through columns
                    for (iCol; iCol >= 0; iCol -= 1) {
                        // if the topvalue is the same
                        if (cols[iCol].offsetTop === offsetTop) {
                            newCount += 1;
                        }
                    }
                    return newCount;
                }
                return 0;
            };
            /**
             * sorts all items in the available columns
             * @param  {Node} columnBox
             */
            privateProps.orderItems = function (columnBox) {
                // check all available columns.. returns a Number
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
                // iterate all items to sort them to the right column
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
             * returns a array of childnodes without any textnodes
             * @param  {Node} parent The object whose children are to be filtered
             * @return {Array}  all childnodes but no textnodes
             */
            getChildNodes = function getChildNodes(parent) {
                var children = parent.childNodes,
                    iChild = children.length - 1,
                    result = [];
                // iterate childnodes
                for (iChild; iChild >= 0; iChild -= 1) {
                    // no textNodes or commentNodes
                    if (!!privateProps.isNode(children[iChild])) {
                        result.push(children[iChild]);
                    }
                }
                // reverses the result to bring it in the right order
                return result.reverse();
            };
            /**
             * Finds all childnodes (items) in columns and collects them as an array in the right order
             * @param  {Node} columnBox
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
                     * @param  {Integer} col  the column
                     * @param  {Integer} item the item
                     */
                    order = function order(col, item) {

                        if (nothing < length) {
                            if (col === length) {
                                // set to 0
                                nothing = col = 0;
                                // next item
                                item += 1;
                            }
                            // if this item exists
                            if (!!arrayArray[col][item]) {
                                resultArray.push(arrayArray[col][item]);
                            } else {
                                nothing += 1;
                            }
                            // Recursion
                            order(col + 1, item);
                        }
                    };
                    // start Recursion
                    order(0, 0);
                    // reverse the result
                    return resultArray.reverse();
                };
                for (iCols; iCols >= 0; iCols -= 1) {
                    // dont use text-Nodes
                    filtered = getChildNodes(cols[iCols]);
                    columnItemArray.push(filtered);
                }
                // put items as referenz on columnbox
                columnBox.simpleMesonry.items = orderArrays(columnItemArray);
            };

            /**
             * finds all columns that are childnodes of this columnbox
             * @param  {Node} columnBox
             */
            initColumns = function initColumns(columnBox) {
                var columns = columnBox.querySelectorAll(privateProps.masonryColumn);
                var iColumns = columns.length - 1;
                // iterartion through all columns
                for (iColumns; iColumns >= 0; iColumns -= 1) {
                    // if this column is realy a childnode of this columnbox
                    if (columns[iColumns].parentNode === columnBox) {
                        // put referenz on this columnbox
                        columns[iColumns].style.minHeight = '1px';
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
             * init a Event and calls all callbacks when exists
             * @param  {String} name  eventName
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
             * init all Stuff for a ColumnBox
             * @param  {Node} columnBox
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
         * init all
         * @return {Object} this
         */

        _createClass(SimpleMasonryInner, [{
            key: 'init',
            value: function init() {
                var that = this,
                    privateProps = _(this).privates,
                    columnBoxes = privateProps.columnBoxes,
                    i = privateProps.iBoxes;
                for (i; i >= 0; i -= 1) {
                    privateProps.init(columnBoxes[i]);
                }
                return this;
            }
            /**
             * add a node or a array of nodes at the end of all items
             * @param  {Node|Array} node
             * @return {Object}      this
             */

        }, {
            key: 'append',
            value: function append(node) {
                var privateProps = _(this).privates,
                    columnBox = privateProps.columnBoxes[0];
                var i = 0;
                if (!!privateProps.isNode(node)) {
                    columnBox.simpleMesonry.items.unshift(node);
                    privateProps.doEvent('append', node);
                    privateProps.orderItems(columnBox);
                } else if (!!Array.isArray(node)) {
                    i = node.length - 1;
                    node.reverse();
                    for (i; i >= 0; i -= 1) {
                        if (!!privateProps.isNode(node[i])) {
                            columnBox.simpleMesonry.items.unshift(node[i]);
                            privateProps.doEvent('append', node[i]);
                        }
                    }
                    privateProps.orderItems(columnBox);
                }
                return this;
            }
            /**
             * add a node or a array of nodes at the beginning of all items
             * @param  {Node|Array} node
             * @return {object}      this
             */

        }, {
            key: 'prepend',
            value: function prepend(node) {
                var privateProps = _(this).privates,
                    columnBox = privateProps.columnBoxes[0];
                var i = 0;
                if (!!privateProps.isNode(node)) {
                    columnBox.simpleMesonry.items.push(node);
                    privateProps.doEvent('prepend', node);
                    privateProps.orderItems(columnBox);
                } else if (!!Array.isArray(node)) {
                    i = node.length - 1;
                    node.reverse();
                    for (i; i >= 0; i -= 1) {
                        if (!!privateProps.isNode(node[i])) {
                            columnBox.simpleMesonry.items.push(node[i]);
                            privateProps.doEvent('prepend', node[i]);
                        }
                    }
                    privateProps.orderItems(columnBox);
                }
                return this;
            }
            /**
             * get all items or the items of a single column
             * @param  {Integer} colNumber 0 for the first column
             * @return {Array}           Array of items
             */

        }, {
            key: 'get',
            value: function get(colNumber) {
                var privateProps = _(this).privates,
                    columnBox = privateProps.columnBoxes[0];
                var availableColumns = undefined,
                    theColumn = undefined,
                    resultArray = undefined,
                    items = undefined,
                    i = undefined;
                // return all items
                if (typeof colNumber !== 'number') {
                    return columnBox.simpleMesonry.items;
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
                    return resultArray.reverse();
                }
            }
            /**
             * iterate trough all items or to all items of a single column
             * @param  {Object} f         callback for single item
             * @param  {Integer} colNumber just items of this column
             * @return {Object}           this
             */

        }, {
            key: 'each',
            value: function each(f, colNumber) {
                var items = undefined,
                    i = undefined;
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
             * register an Event
             * @param  {String} eventType name of the event
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
        }]);

        return SimpleMasonryInner;
    }();

    return SimpleMasonryInner;
}();
