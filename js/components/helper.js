export default {
	/**
	 * get a reversed Copy from srcArray
	 * @param  {array} srcArray
	 * @return {array}
	 */
	getReverseArrayCopy: function (srcArray) {
		var resultArray = [],
            i = srcArray.length - 1;

        for (i; i >= 0; i -= 1){
          resultArray.push(srcArray[i]);
        }

        return resultArray;
	},

	/**
     * Removes node's position in array
     * @param  {object} node
     */
	spliceNodeFromArray: (node, srcArray) => {
        let index = srcArray.indexOf(node);
        if (index >= 0) {
            srcArray.splice(index, 1);
        }
    },

    /**
	 * Check if parameter is DOM node
	 * @param  {(object|string|number)} node
	 * @return {boolean}
	 */
    isNode: (node) => {
        return (node && (typeof node.innerHTML === 'string'));
    }
};