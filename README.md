column.js
=========
Fortlaufende Sortierung von unterschiedlich hohen Elementen in einem Raster aus belibiger Anzahl von Spalten + responsive-Anpassung bei Veränderung der Spaltenanzahl.

```js
var cJs = new ColumnJs();
// init all and order items
cJs.go();
```



```js
// add a node or an array of nodes at the end of all items
cJs.append(node);
cJs.append([node1, node2]);
```

```js
// add a node or a array of nodes at the beginning of all items
cJs.prepend(node);
cJs.prepend([node1, node2]);
```

```js
// get all items in an array
cJs.get();
// get all items in an array of the column with this index
cJs.get(index);
```

```js
// iterate trough all items
cJs.each(function (item, index) {
    // do stuff
});
// or to all items of a single column
cJs.each(function (item, index) {
    // do stuff
}, columnIndex);
```

```js
// register a eventListener
cJs.on('append', function (item) {
    // do stuff
});
cJs.on('prepend', function (item) {
    // do stuff
});
cJs.on('order', function (items) {
    // do stuff
});
```

Demo installieren:

```
$ npm install

$ babel js/column-es6.js --out-file js/column-es6-compiled.js
```
