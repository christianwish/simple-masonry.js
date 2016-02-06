![Simple Masonry](http://christianheyn.com/projects/simple-masonry.js/img/simple-masonry-readme-logo.png)
# simple-masonry.js
Show items with different heights in a grid of responsive columns.
**No** `position: absolute` and so fully flexible in height and width of any item.

Check **[demo](http://christianheyn.com/projects/simple-masonry.js/)**.

_simple-masonry.js is written as es6. If you are not using a es6-compiler in your project then use simple-masonry-compiled.js instead!_

`simple-masonry.js` works great with bootstrap (but you can use your own grid as well!). Wrap some columns in a container and fill them with items. It dosn't matter if you put them all in one column or preorder them. `simple-masonry.js` will order all items from each column in a zipper method as you can see in the following snippet.


```html
<!-- wrap columns -->
<section class="masonry-box container">
    <!-- columns 1 -->
    <div class="masonry-column col-lg-3 col-md-4 col-sm-6 col-xs-12">
        <div class="item">
            <h3>item 1</h3>
        </div>
        <!-- item 2 is allready in the second masonry-column -->
        <!-- item 3 is allready in the third masonry-column -->
        <div class="item">
            <h3>item 4</h3>
        </div>
        <div class="item">
            <h3>item 5</h3>
        </div>
        <div class="item">
            <h3>item 6</h3>
        </div>
        <div class="item">
            <h3>item 7</h3>
        </div>
        <div class="item">
            <h3>item 8</h3>
        </div>
    </div>
    <!-- columns 2 -->
    <div class="masonry-column col-lg-3 col-md-4 col-sm-6 col-xs-12">
        <div class="item">
            <h3>item 2</h3>             
        </div>
    </div>
    <!-- columns 3 -->
    <div class="masonry-column col-lg-3 col-md-4 col-sm-6 col-xs-12">
        <div class="item">
            <h3>item 3</h3>
        </div>
    </div>
    <!-- columns 4 -->
    <div class="masonry-column col-lg-3 col-md-4 col-sm-6 col-xs-12"></div>
</section>
```

In default you can use the css-class `masonry-box` for the wrapping element and `masonry-column` for columns. Items don't need a extra class. Every element will be ordered if it's not just a pure text-node.
You can use your own classes for wrapping element and columns if you put them as parameter in js.

```js
var simpleM = new SimpleMasonry();
```
Or with your own selector.
```js
var simpleM = new SimpleMasonry({
    masonryBox: '.my-box-class',
    masonryColumn: '.my-column-class'
});
```
Then run it
```js
// init all and order items
simpleM.init();
```


### .append()

```js
// add a node or an array of nodes at the end of all items
simpleM.append(node);
simpleM.append([node1, node2]);
```
### .prepend()
```js
// add a node or a array of nodes at the beginning of all items
simpleM.prepend(node);
simpleM.prepend([node1, node2]);
```

### .get()
```js
// get all items in an array
simpleM.get();
// get all items in an array of the column with this index
simpleM.get(index);
```

### .each()
```js
// iterate trough all items
simpleM.each(function (item, index) {
    // do stuff
});
// or to all items of a single column
simpleM.each(function (item, index) {
    // do stuff
}, columnIndex);

// tip: use native Array-iterator
simpleM.get().forEach(function (item, index) {
    // do stuff
});
```
### .on()
```js
// register a eventListener
simpleM.on('append', function (item) {
    // do stuff
});
simpleM.on('prepend', function (item) {
    // do stuff
});
simpleM.on('order', function (items) {
    // do stuff
});
```
___

### install demo

```
$ npm install
```
___

## Authors

* [Christian Heyn](https://github.com/christianheyn)
