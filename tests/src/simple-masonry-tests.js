var assert = chai.assert,
	// TEST
	simpleMasonryTest = new SimpleMasonry(),
	prependButton = document.getElementById('prepend-btn');
	appendButton = document.getElementById('append-btn');
try {
	simpleMasonryTest.init();
	simpleMasonryTest.each(function (item, index) {
		var min = 50,
			max = 100;
		item.style.paddingBottom = Math.floor(Math.random()*(max-(min+1))+(min+1)) + '%';
	});
	prependButton.addEventListener('click', function () {
		simpleMasonryTest.prepend(document.getElementById('item-prepend'));
		prependButton.setAttribute('style', 'display: none');
	});
	appendButton.addEventListener('click', function () {
		simpleMasonryTest.append(document.getElementById('item-append'));
		appendButton.setAttribute('style', 'display: none');
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
			masonry.init();
			assert.property(document.getElementById('masonry-box-string-test'), 'simpleMesonry');
		});
		it('object property "masonryBox" can be node-element', function () {
			var element = document.getElementById('masonry-box-node-test'),
				masonry = new SimpleMasonry({
				masonryBox: element
			});
			masonry.init();
			assert.property(element, 'simpleMesonry');
		});
		it('object property "masonryBox" can be array made of node-elements', function () {
			var element = document.getElementById('masonry-box-nodearray-test'),
				masonry = new SimpleMasonry({
				masonryBox: [element]
			});
			masonry.init();
			assert.property(element, 'simpleMesonry');
		});

	});
	
	
	describe('HTML', function () {
		it('throws no exeption if no column-node exists', function () {
			var masonry = new SimpleMasonry({
				masonryBox: '#masonry-box-nocolumn-test'
			});
			masonry.init();
			assert.isArray(document.getElementById('masonry-box-nocolumn-test').simpleMesonry.columns);
			assert.lengthOf(document.getElementById('masonry-box-nocolumn-test').simpleMesonry.columns, 0);
		});
		it('throws no exeption if no item-node exists', function () {
			var masonry = new SimpleMasonry({
				masonryBox: '#masonry-box-noitems-test'
			});
			masonry.init();
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
			masonry1.init();
			masonry2.init();
			assert.isArray(document.getElementById('masonry-box-nested1-test').simpleMesonry.items);
			assert.lengthOf(masonry1.get(), 1);
			assert.isArray(document.getElementById('masonry-box-nested2-test').simpleMesonry.items);
			assert.lengthOf(masonry2.get(), 1);
			// different items with different css-classes
			assert.strictEqual(masonry1.get()[0].getAttribute('class'), 'item-1');
			assert.strictEqual(masonry2.get()[0].getAttribute('class'), 'item-2');
		});
	});

	describe('Method', function () {
		describe('.append()', function () {
			it('throws no exeption if no parameter is given', function () {
				assert.doesNotThrow(function () {
					simpleMasonryTest.append();
				});
			});
			it('throws no exeption if parameter is string', function () {
				assert.doesNotThrow(function () {
					simpleMasonryTest.append('test');
				});
			});
			it('throws no exeption if parameter is an element that is already in this columns', function () {
				assert.doesNotThrow(function () {
					simpleMasonryTest.append(simpleMasonryTest.get()[3]);
				});
			});
			it('parameter can be an array of elements', function () {
				assert.doesNotThrow(function () {
					simpleMasonryTest.append([simpleMasonryTest.get()[3], simpleMasonryTest.get()[2]]);
				});
			});
			it('triggers eventListener "append"', function (done) {
				assert.doesNotThrow(function () {
					simpleMasonryTest.on('append', function () {
						done();
					});
					appendButton.click();
				});
			});
			it('appends the element to be the last element', function () {
				var l = simpleMasonryTest.get().length;
				assert.strictEqual(document.getElementById('item-append'), simpleMasonryTest.get()[l-1]);
			})
		});
		describe('.prepend()', function () {
			it('throws no exeption if no parameter is given', function () {
				assert.doesNotThrow(function () {
					simpleMasonryTest.prepend();
				});
			});
			it('throws no exeption if parameter is string', function () {
				assert.doesNotThrow(function () {
					simpleMasonryTest.prepend('test');
				});
			});
			it('throws no exeption if parameter is an element that is already in this columns', function () {
				assert.doesNotThrow(function () {
					simpleMasonryTest.prepend(simpleMasonryTest.get()[3]);
				});
			});
			it('parameter can be an array of elements', function () {
				assert.doesNotThrow(function () {
					simpleMasonryTest.prepend([simpleMasonryTest.get()[3], simpleMasonryTest.get()[2]]);
				});
			});
			it('triggers eventListener "prepend"', function (done) {
				assert.doesNotThrow(function () {
					simpleMasonryTest.on('prepend', function () {
						done();
					});
					prependButton.click();
				});
			});
			it('prepends the element to be the first element in the first column', function () {
				assert.strictEqual(document.getElementById('item-prepend'), simpleMasonryTest.get()[0]);
			})
		});
		describe('.get()', function () {
			it('throws no exeption if no parameter is given', function () {
				assert.doesNotThrow(function () {
					simpleMasonryTest.get();
				});
			});
			it('returns array always', function () {
				assert.isArray(simpleMasonryTest.get());
				assert.isArray(simpleMasonryTest.get(9));
				assert.isArray(simpleMasonryTest.get('test'));
			});
			it('returns array with items of column with given index', function () {
				assert.isArray(simpleMasonryTest.get(0));
				assert.isTrue(simpleMasonryTest.get(0).length > 0);
				assert.isTrue(simpleMasonryTest.get(4).length === 0);
			});
			it('returns array with items in right order', function () {
				assert.strictEqual(simpleMasonryTest.get()[0], document.getElementById('item-prepend'));
			});
		});
	});
});