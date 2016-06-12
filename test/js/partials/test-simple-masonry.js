import SimpleMasonry from './../../../js/simple-masonry';

// http://chaijs.com/api/assert/
export default function () {
    let assert = chai.assert;

    describe('Simple-Masonry', function () {

        it('is using new to init', function () {
            let masonry = new SimpleMasonry();
            assert.instanceOf(masonry, SimpleMasonry);
        });

        it('throws exeption if called without new', function () {
            assert.throw(function () {
                SimpleMasonry();
            });
        });

        it('throws no exeption if called without parameter', function () {
            assert.doesNotThrow(function () {
                let masonry = new SimpleMasonry();
            });
        });

        it('throws no exeption if called with parameter', function () {
            assert.doesNotThrow(function () {
                let masonry = new SimpleMasonry(123);
                masonry = new SimpleMasonry({});
                masonry = new SimpleMasonry('abc');
                masonry = new SimpleMasonry([]);
            });
        });

        it('has property "init"', function () {
            let masonry = new SimpleMasonry();
            assert.property(masonry, 'init');
        });

        it('has property "append"', function () {
            let masonry = new SimpleMasonry();
            assert.property(masonry, 'append');
        });

        it('has property "prepend"', function () {
            let masonry = new SimpleMasonry();
            assert.property(masonry, 'prepend');
        });

        it('has property "get"', function () {
            let masonry = new SimpleMasonry();
            assert.property(masonry, 'get');
        });

        it('has property "each"', function () {
            let masonry = new SimpleMasonry();
            assert.property(masonry, 'each');
        });

        it('has property "on"', function () {
            let masonry = new SimpleMasonry();
            assert.property(masonry, 'on');
        });

        it('has property "columnsLength"', function () {
            let masonry = new SimpleMasonry();
            assert.property(masonry, 'columnsLength');
        });

        it('has property "itemsLength"', function () {
            let masonry = new SimpleMasonry();
            assert.property(masonry, 'itemsLength');
        });

        describe('.init()', function () {

            it('is a function', function () {
                let masonry = new SimpleMasonry();
                assert.isFunction(masonry.init);
            });

            it('return this', function () {
                let masonry = new SimpleMasonry();
                assert.strictEqual(masonry.init(), masonry);
            });

        });

        describe('.append()', function () {

            it('is a function', function () {
                let masonry = new SimpleMasonry();
                assert.isFunction(masonry.append);
            });

            it('return this', function () {
                let masonry = new SimpleMasonry();
                assert.strictEqual(masonry.append(), masonry);
            });


        });
    });
}