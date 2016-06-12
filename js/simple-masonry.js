import Helper from './components/helper';

let helper = new Helper();

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['SimpleMasonry'], factory);
    } else if (typeof exports === 'object') {
        // npm
        module.exports = factory;
    } else {
        // Browser global
        window.SimpleMasonry = factory;
    }
}(function () {
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
     * @param  {object} settings
     */
    class SimpleMasonry {
        constructor (settings = {}) {
            var that = this,
                privateProps,
                // Default settings
                defaults = {
                    masonryBox: '.masonry-box',
                    masonryColumn: '.masonry-column'
                };

            let initColumns,
                initItems,
                getChildNodes;

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

            // All ColumnBox-Nodes
            privateProps.columnBoxes = (function () {
                if (!!helper.isNode(privateProps.masonryBox)) {
                    return [privateProps.masonryBox];
                } else if (!!Array.isArray(privateProps.masonryBox)) {
                    return privateProps.masonryBox;
                } else if (typeof privateProps.masonryBox === 'string') {
                    return document.querySelectorAll(privateProps.masonryBox);
                } else {
                    return [];
                }
            }());

            /**
             * Init all Stuff for a ColumnBox
             * @param  {object} columnBox
             */
            privateProps.init = (columnBox) => {
                
            };

            /**
             * Resize function reorder items
             */
            window.addEventListener('resize', () => {
               
            });
        }// END of constructor

        /**
         * Init all
         * @return {object} this
         */
        init() {
            var that = this,
                privateProps = _(that).privates;

            return this;
        }

        /**
         * Add a node or a array of nodes at the end of all items
         * @param  {Node|Array} node
         * @return {object}      this
         */
        append(node) {
        	return this;
        }

        /**
         * Add a node or a array of nodes at the beginning of all items
         * @param  {Node|Array} node
         * @return {object}      this
         */
        prepend(node) {
        	return this;
        }

        /**
         * Get all items or the items of a single column
         * @param  {number} colNumber 0 for the first column
         * @return {array}           Array of items
         */
        get(colNumber) {
        	return this;
        }

        /**
         * Iterate trough all items or to all items of a single column
         * @param  {object} f         callback for single item
         * @param  {number} colNumber just items of this column
         * @return {object}           this
         */
        each(f, colNumber) {
        	return this;
        }

        /**
         * Register an Event
         * @param  {string} eventType name of the event
         * @param  {function} f         callback
         * @return {object}           this
         */
        on(eventType, f) {
        	return this;
        }

        /**
         * Get number of available columns
         * @return {number}
         */
        columnsLength() {
        	return this;
        }

        /**
         * Get number of items
         * @return {number}
         */
        itemsLength() {
        	return this;
        }
    }

    return SimpleMasonry;
} ()));