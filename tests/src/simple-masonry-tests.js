var assert = chai.assert,
	// TEST
	simpleMasonryTest = new SimpleMasonry(),
	prependButton = document.getElementById('prepend-btn');
try {
	simpleMasonryTest.go();
	simpleMasonryTest.each(function (item, index) {
		var min = 50,
			max = 100;
		item.style.paddingBottom = Math.floor(Math.random()*(max-(min+1))+(min+1)) + '%';
	});
	prependButton.addEventListener('click', function () {
		simpleMasonryTest.prepend(document.getElementById('item-prepend'));
		prependButton.setAttribute('style', 'display: none');
	});
} catch (error) {
	console.log('something goes wrong.');
}


// http://chaijs.com/api/assert/
describe('SimpleMasonry', function () {
	// new
	it('is using new to init', function () {
		var masonry = new SimpleMasonry();
		assert.instanceOf(masonry, SimpleMasonry);
	});
	it('throws exeption if called without new', function () {
		assert.throw(function () {
			SimpleMasonry();
		});
	});
	describe('Parameter', function () {

		// parameter
		it('can be empty', function () {
			assert.doesNotThrow(function () {
				var masonry = new SimpleMasonry();
			});
		});
		it('can be a object', function () {
			assert.doesNotThrow(function () {
				var masonry = new SimpleMasonry({});
			});
		});

		it('object property "masonryBox" can be a string-selector', function () {
			var masonry = new SimpleMasonry({
				masonryBox: '#masonry-box-string-test'
			});
			masonry.go();
			assert.property(document.getElementById('masonry-box-string-test'), 'simpleMesonry');
		});
		it('object property "masonryBox" can be node-element', function () {
			var element = document.getElementById('masonry-box-node-test'),
				masonry = new SimpleMasonry({
				masonryBox: element
			});
			masonry.go();
			assert.property(element, 'simpleMesonry');
		});
		it('object property "masonryBox" can be array made of node-elements', function () {
			var element = document.getElementById('masonry-box-nodearray-test'),
				masonry = new SimpleMasonry({
				masonryBox: [element]
			});
			masonry.go();
			assert.property(element, 'simpleMesonry');
		});

	});
	
	
	describe('HTML', function () {
		it('throws no exeption if no column-node exists', function () {
			var masonry = new SimpleMasonry({
				masonryBox: '#masonry-box-nocolumn-test'
			});
			masonry.go();
			assert.isArray(document.getElementById('masonry-box-nocolumn-test').simpleMesonry.columns);
			assert.lengthOf(document.getElementById('masonry-box-nocolumn-test').simpleMesonry.columns, 0);
		});
		it('throws no exeption if no item-node exists', function () {
			var masonry = new SimpleMasonry({
				masonryBox: '#masonry-box-noitems-test'
			});
			masonry.go();
			assert.isArray(document.getElementById('masonry-box-noitems-test').simpleMesonry.items);
			assert.lengthOf(masonry.get(), 0);
		});
		it('works with nested masonry', function () {
			var masonry1 = new SimpleMasonry({
					masonryBox: '#masonry-box-nested1-test'
				}),
				masonry2 = new SimpleMasonry({
					masonryBox: '#masonry-box-nested2-test'
				});
			masonry1.go();
			masonry2.go();
			assert.isArray(document.getElementById('masonry-box-nested1-test').simpleMesonry.items);
			assert.lengthOf(masonry1.get(), 1);
			assert.isArray(document.getElementById('masonry-box-nested2-test').simpleMesonry.items);
			assert.lengthOf(masonry2.get(), 1);
			// different items with different css-classes
			assert.strictEqual(masonry1.get()[0].getAttribute('class'), 'item-1');
			assert.strictEqual(masonry2.get()[0].getAttribute('class'), 'item-2');
		});
	});
	
});