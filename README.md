# betterDom

betterDom is a JavaScript DOM manipulation library inspired by JQuery.

Like jQuery, with this software one can manipulate the DOM in a variety of ways, set event listeners, as well as execute AJAX style HTTP requests.

Here's a to do list management application I built to demo some of it's feature:<br> [betterDom Lists](http://eakman.github.io/betterDom)

To use betterDom, copy the following to files into your project file in the same directory.

[better_dom.js](./lib/better_dom.js)
<br>
[dom_node_collection.js](./lib/dom_node_collection.js)

Then in your main javascript file, require better_dom.js and wrap your projects code with $bD().

```
#your_main_javascript_file.js

const $bD = require('./path/to/better_dom.js');

$bD(() => {


    //all your code here!


});
```

## $bD()

To utilize betterDom's DOM manipulation abilities, you have to convert your DOM elements into a DOMNodeCollection with $bD() wrapper.

## Dom manipulation methods

`html(string)`
Sets the innerHTML of all elements in the collection to a given string.

`empty()` Sets innerHTML of all elements in collection to an empty string.

`append(content)` Sets content to the last child of each element in the collection. Will accept a string, HTMLElement, or DOMNodeCollection.

`attr(attributeName, secondArg)` When given just an attributeName, returns the first element in the collection that has that attribute. When given a secondArg, if it's a string, it finds the first element to secondArg. If given a function as a secondArg it says the value of the new attribute to the result of that function.

`addClass(cName)` Add a class name to each elements class attribute.

`removeClass(cName)` Removes a class name to each elements class attribute.

`children()` Returns a DOMNodeCollection of each elements children.

`parent()` Returns a DOMNodeCollection of each elements parents.

## Event listeners

`on(lEvent, callback)` Accepts a String lEvent and a callback. Will execute callback after event.

`off(lEvent)` Removes event listener for a given lEvent.
