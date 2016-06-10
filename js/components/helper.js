export default {
	getReverseArrayCopy: function (srcArray) {
		var resultArray = [],
            i = srcArray.length - 1;

        for (i; i >= 0; i -= 1){
          resultArray.push(srcArray[i]);
        }

        return resultArray;
	},
	spliceNodeFromArray: (node, srcArray) => {
        let index = srcArray.indexOf(node);
        if (index >= 0) {
            srcArray.splice(index, 1);
        }
    }
};