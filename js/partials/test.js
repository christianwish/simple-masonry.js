var simpleMasonryTest = new SimpleMasonry(),
	prependButton = document.getElementById('prepend-btn'),
	appendButton = document.getElementById('append-btn');

simpleMasonryTest.init();

simpleMasonryTest.each(function (item, index) {
	var min = 50,
		max = 100;
	item.style.paddingBottom = Math.floor(Math.random() * (max - (min + 1)) + (min + 1)) + '%';
});

prependButton.addEventListener('click', function () {
	simpleMasonryTest.prepend(document.getElementById('item-prepend'));
	prependButton.setAttribute('style', 'display: none');
});

appendButton.addEventListener('click', function () {
	simpleMasonryTest.append(document.getElementById('item-append'));
	appendButton.setAttribute('style', 'display: none');
});