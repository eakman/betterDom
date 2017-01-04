# betterDom

betterDom is clone of some of the key features in in jQuery written vanilla JavaScript.

Like jQuery, with this software one can manipulate the DOM in a variety of ways, set event listeners, as well as execute AJAX style HTTP requests.

## $bD()

To utilize betterDom's DOM manipulation abilities, you have to convert your DOM elements into a DOMNodeCollection with $bD() wrapper.

## Dom manipulation methods

`html(string)
Sets the innerHTML of all elements in the collection to a given string.`

`empty() Sets innerHTML of all elements in collection to an empty string.`

`append(content) Sets content to the last child of each element in the collection. Will accept a string, HTMLElement, or DOMNodeCollection.`

`attr(attributeName, secondArg) When given just an attributeName, returns the first element in the collection that has that attribute. When given a secondArg, if it's a string, it finds the first element to secondArg. If given a function as a secondArg it says the value of the new attribute to the result of that function.`

`addClass(cName) Add a class name to each elements class attribute.`

`removeClass(cName) Removes a class name to each elements class attribute.`

`children() Returns a DOMNodeCollection of each elements children.`

`parent() Returns a DOMNodeCollection of each elements parents.`

## Event listeners

`on(lEvent, callback) Accepts a String lEvent and a callback. Will execute callback after event.`

`off(lEvent) Removes event listener for a given lEvent.`
