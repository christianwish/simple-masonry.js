import Helper from './../../../js/components/helper';

let helper = new Helper();

// http://chaijs.com/api/assert/
export default function () {
    let assert = chai.assert;

    describe('Helper', function () {

        it('returns an Object', function () {
            assert.isObject(helper);
        });

        it('has property "zipperArray"', function () {
            assert.property(helper, 'zipperArray');
        });

        it('has property "isNode"', function () {
            assert.property(helper, 'isNode');
        });

        describe('.zipperArray( arrayOfArrays )', function () {

            it('is a function', function () {
                assert.isFunction(helper.zipperArray);
            });

            it('return an empty array if no array is given as parameter', function () {
                assert.isArray(helper.zipperArray());
                assert.equal(helper.zipperArray().length, 0);
                assert.isArray(helper.zipperArray(123));
                assert.equal(helper.zipperArray(123).length, 0);
            });

            it('return an empty array if an empty array is given as parameter', function () {
                assert.isArray(helper.zipperArray([]));
                assert.equal(helper.zipperArray([]).length, 0);
            });

            it('sorts an Array by zipper method', function () {
                let testArray = [
                        [0, 3, 6, 8],
                        [1, 4, 7],
                        [2, 5]
                    ],
                    testArrayLength = testArray[0]
                        .concat(testArray[1])
                        .concat(testArray[2])
                        .length,
                    testArray2 = [
                        [],
                        ['a', 'c'],
                        ['b', 'd', 'e', 'f']
                    ],
                    resultArray = helper.zipperArray(testArray),
                    resultArray2 = helper.zipperArray(testArray2);
                assert.equal(resultArray[0], 0);
                assert.equal(resultArray[4], 4);
                assert.equal(resultArray[8], 8);
                assert.equal(resultArray2[0], 'a');
                assert.equal(resultArray2[2], 'c');
                assert.equal(resultArray2[5], 'f');
                assert.equal(resultArray.length, testArrayLength);
            });
        });

        describe('.isNode( node )', function () {

            it('is a function', function () {
                assert.isFunction(helper.isNode);
            });

            it('returns boolean', function () {
                assert.isBoolean(helper.isNode());
                assert.isBoolean(helper.isNode(document.body));
            });

            it('returns false if parameter is not a node', function () {
                assert.strictEqual(helper.isNode(document.body), true);
                assert.strictEqual(helper.isNode(), false);
                assert.strictEqual(helper.isNode(123), false);
            });

            it('returns true if parameter is a node', function () {
                assert.strictEqual(helper.isNode(document.body), true);
                assert.strictEqual(helper.isNode(document.getElementById('mocha')), true);
            });
        });
    });
};
