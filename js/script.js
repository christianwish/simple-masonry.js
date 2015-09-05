(function () {
	var cJs = new ColumnJs(),
		append = document.getElementById('append'),
		prepend = document.getElementById('prepend');
		
	cJs.go();
	cJs.on('order', function (items) {
		console.log(items);
	});
	cJs.on('append', function (item) {
		console.log(item);
	});
	cJs.on('prepend', function (item) {
		console.log(item);
	});
	cJs.append(append);
	cJs.prepend([prepend]);

	


	cJs.each(function (item, index) {
		var min = 50,
			max = 100;
		item.style.paddingBottom = Math.floor(Math.random()*(max-(min+1))+(min+1)) + '%';
		//item.innerHTML = '<h3>item ' + index + '</h3>';
	});
	
}());