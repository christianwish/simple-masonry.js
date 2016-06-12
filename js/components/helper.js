export default function () {
    return {
        /**
         * An array that consists of array merges all in to a single array by zipper method 
         * @param  {array} arrayOfArrays    array consists of arrays
         * @return {array} new ordered array
         */
        zipperArray: (arrayOfArrays) => {
            let resultArray,
                length;

            if (typeof arrayOfArrays == 'undefined'
                || !Array.isArray(arrayOfArrays)
                || arrayOfArrays.length == 0) {
                return [];
            }

            resultArray = [];
            length = arrayOfArrays.length;

            /**
             * Recursion through all arrays
             * @param  {number} colIndex  index of column
             * @param  {number} itemIndex index of item
             */
            function order (counter) {
                let emptyNumber = 0;

                for (let i = 0; i < length; i += 1) {
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
        isNode: (node) => {
            return (node && (typeof node.innerHTML === 'string')) || false;
        }
    }
}
