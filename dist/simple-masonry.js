/* jslint esnext:true */
/**
 * SimpleMasonry
 * @param  {Object} settings with selectors
 * @return {Object} this
 */
var SimpleMasonry = (function () {
    let instances = [],
        privates = [],
        // Private object accessor function
        _ = function(instance) {
            var index = instances.indexOf(instance),
                privateObj;
            if(index < 0) {
                instances.push(instance);
                privateObj = {};
                privates.push(privateObj);
            }
            else {
                privateObj = privates[index];
            }
            return privateObj;
        };
    
    /**
     * SimpleMasonry Class
     * @param  {string|Object} columnBoxClass Name of the wrapper-selector or node
     * @param  {string} columnClass    Name of the column-selector
     */
    class SimpleMasonryInner {
        constructor (settings = {}) {
            var that = this,
                privateProps,
                // Default settings
                defaults = {
                    masonryBox: '.masonry-box',
                    masonryColumn: '.masonry-column'
                };

            // Functions used just in this constructor
            let initColumns,
                initItems,
                getChildNodes;

            // Create private Object
            _(that).privates = {};
            privateProps = _(that).privates;
            // Overwrite defaults
            for (var prop in defaults) {
                if(defaults.hasOwnProperty(prop)) {
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
             * Check if parameter is a node
             * @param  {(Object|string|Number)} node
             * @return {Boolean}
             */
            privateProps.isNode = (node) => {
                return (node && (typeof node.innerHTML === 'string'));
            };

            privateProps.reverseCopy = (array) => {
                var resultArray = [],
                    i = array.length - 1;

                for (i; i >= 0; i -= 1){
                  resultArray.push(array[i])
                } 
                return resultArray;
            };

            privateProps.splice = (node) => {
                let columnBox = privateProps.columnBoxes[0],
                    index = columnBox.simpleMesonry.items.indexOf(node);
                if (index >= 0) {
                    columnBox.simpleMesonry.items.splice(index, 1);
                }
            };

            // All ColumnBox-Nodes
            privateProps.columnBoxes = (function () {
                if (!!privateProps.isNode(privateProps.masonryBox)) {
                    return [privateProps.masonryBox];
                } else if (!!Array.isArray(privateProps.masonryBox)) {
                    return privateProps.masonryBox;
                } else if (typeof privateProps.masonryBox === 'string') {
                    return document.querySelectorAll(privateProps.masonryBox);
                } else {
                    return [];
                }
                
            }());

            // Columnbox iterator Number i
            privateProps.iBoxes = privateProps.columnBoxes.length - 1;

            /**
             * @param  {Object} columnBox
             * @return {number}
             */
            privateProps.countAvailableColumns = (columnBox) => {
                var cols = columnBox.simpleMesonry.columns;
                let iCol = cols.length - 1,
                    newCount = 0;
                // If a column exist
                if (iCol > -1) {
                    // Top of first column
                    let offsetTop = cols[cols.length - 1].offsetTop;
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
            privateProps.orderItems = (columnBox) => {
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
            getChildNodes = (parent) => {
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
                // Reverses the result to bring it in the right order
                return result.reverse();
            };

            /**
             * Finds all childnodes (items) in columns and collects them as an array in the right order
             * @param  {Object} columnBox
             */
            initItems = (columnBox) => {
                var cols = (columnBox.simpleMesonry && columnBox.simpleMesonry.columns),
                    iCols = cols.length - 1,
                    filtered,
                    columnItemArray = [],

                    /**
                     * An array that consists of array is merged in the zipper method to a single array
                     * @param  {Array} arrayArray consists arrays
                     * @return {Array} new ordered items
                     */
                    orderArrays = (arrayArray) => {
                        var resultArray = [],
                            length = arrayArray.length,
                            nothing = 0,

                            /**
                             * Recursion through all contained arrays to use zipper-method
                             * @param  {number} col  the column
                             * @param  {number} item the item
                             */
                            order = function (col, item) {

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
            initColumns = (columnBox) => {
                var columns = columnBox.querySelectorAll(privateProps.masonryColumn);
                let iColumns = columns.length - 1;
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
            privateProps.doEvent = (name, param) => {
                if (!!privateProps.eventStore[name]) {
                    let i = privateProps.eventStore[name].length - 1;
                    for (i; i >= 0; i -= 1) {
                        privateProps.eventStore[name][i](param);
                    }
                }
            };

            /**
             * Init all Stuff for a ColumnBox
             * @param  {Object} columnBox
             */
            privateProps.init = (columnBox) => {
                // expand object for all coming references
                columnBox.simpleMesonry = {
                    columns: [],// columns
                    items: null,// items
                    fill: 0// number of available columns
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
            window.addEventListener('resize', () => {
                let i = privateProps.columnBoxes.length - 1;
                for (i; i >= 0; i -= 1) {
                    // get all "available" columns
                    let columnBox = privateProps.columnBoxes[i],
                        is = privateProps.countAvailableColumns(columnBox);
                    // just if the number of available columns changed
                    if (is !== columnBox.simpleMesonry.fill) {
                        privateProps.orderItems(columnBox);
                    }
                }
            });
        }// END of constructor

        /**
         * Init all
         * @return {Object} this
         */
        init() {
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
         * Add a node or a array of nodes at the end of all items
         * @param  {Node|Array} node
         * @return {Object}      this
         */
        append(node) {
            var privateProps = _(this).privates,
                columnBox = privateProps.columnBoxes[0];
            let i = 0;

            if (privateProps.isNode(node)) {
                privateProps.splice(node);
                columnBox.simpleMesonry.items.unshift(node);
                privateProps.orderItems(columnBox);
                privateProps.doEvent('append', node);
            } else if (!!Array.isArray(node)) {
                i = node.length - 1;
                node.reverse();

                for (i; i >= 0; i -= 1) {
                    if (!!privateProps.isNode(node[i])) {
                        privateProps.splice(node[i]);
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
        prepend(node) {
            var privateProps = _(this).privates,
                columnBox = privateProps.columnBoxes[0];
            let i = 0;
            if (!!privateProps.isNode(node)) {
                privateProps.splice(node);
                columnBox.simpleMesonry.items.push(node);
                privateProps.doEvent('prepend', node);
                privateProps.orderItems(columnBox);
            } else if (!!Array.isArray(node)) {
                i = node.length - 1;
                node.reverse();
                for (i; i >= 0; i -= 1) {
                    if (!!privateProps.isNode(node[i])) {
                        privateProps.splice(node[i]);
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
        get(colNumber) {
            var privateProps = _(this).privates,
                columnBox = privateProps.columnBoxes[0];
            let availableColumns,
                theColumn,
                resultArray,
                items,
                i;
            // return all items
            if (typeof colNumber !== 'number') {
                return privateProps.reverseCopy(columnBox.simpleMesonry.items);
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
                return privateProps.reverseCopy(resultArray);
            }
        }

        /**
         * Iterate trough all items or to all items of a single column
         * @param  {Object} f         callback for single item
         * @param  {number} colNumber just items of this column
         * @return {Object}           this
         */
        each(f, colNumber) {
            let items,
                i;
            if (typeof f === 'function') {
                items = this.get(colNumber);
                i = items.length - 1;
                for (i; i >= 0; i -= 1) {
                    // callback (item, index)
                    f(items[i], (items.length - 1 - i));
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
        on(eventType, f) {
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
        columnsLength() {
            var privateProps = _(this).privates,
                columnBox = privateProps.columnBoxes[0];
            return privateProps.countAvailableColumns(columnBox);
        }
    }
    
    return SimpleMasonryInner;
}());

if (typeof module === 'object') {
    module.exports = SimpleMasonry;
}
