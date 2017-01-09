/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const $bD = __webpack_require__(2);

	$bD(() => {
	  let i = 0;
	  let j = 0;
	  $bD('.add').on('click', () => {
	    const listName = $bD('.list-name').elements[0].value;
	    const listClass = `list-${i}`;
	    $bD('body').append(`<div class='list-div'>
	              <button class='remove-${listClass}'>x</button>
	              <h1 class='list-title'>${listName}</h1>
	              <div class='list-inputs'>
	                <input class='${listClass}-input item-input'
	                    type='text' placeholder='new item' />
	                <button class='${listClass}-button item-button'>add item</button>
	              </div>
	            <ul class='${listClass} todo-list'></ul>
	            </div>`);
	      $bD(`.${listClass}-button`).on('click', () => {
	        const itemName = $bD(`.${listClass}-input`).elements[0].value;
	        $bD(`.${listClass}`).append(`<li>${itemName}
	          <button class='item-${j}'>x</button>
	          </li>`);
	        $bD(`.item-${j}`).on('click', (e) => {
	          // debugger
	          e.target.parentNode.remove();
	        });
	        $bD(`.${listClass}-input`).elements[0].value = '';
	        j++;
	      });
	      $bD(`.remove-${listClass}`).on('click', (e) => {
	        e.target.parentNode.remove();
	      });
	      $bD('.list-name').elements[0].value = '';
	      i++;
	  });
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	class DOMNodeCollection {

	  constructor(elements) {
	    this.elements = elements;
	  }


	  html(string) {
	    if(string !== undefined){
	      this.elements.forEach((e) => {
	        e.innerHTML = string;
	      });
	    }else {
	      return this.elements[0].innerHTML;
	    }
	  }

	  empty() {
	    this.html('');
	  }

	  append(content) {

	    if (content instanceof DOMNodeCollection) {
	      this.elements.forEach((e) => {
	        content.elements.forEach((c) => {
	          e.appendChild(c.cloneNode(true));
	        });
	      });
	    } else if (content instanceof HTMLElement) {
	        this.elements.forEach((e) => {
	          // this.html(content.outerHTML);
	          e.appendChild(content.cloneNode(true));
	        });
	    } else {
	      this.elements.forEach((e) => {
	        const div = document.createElement('div');
	        div.innerHTML = content;
	        e.appendChild(div.firstChild);

	        // e.innerHTML.concat(content.outerHTML);
	      });

	    }
	  }

	  attr(attributeName, secondArg) {
	    let result = null;
	    if (!secondArg) {
	      for (let i = 0; i < this.elements.length; i++ ) {
	        if(this.elements[i].hasAttribute(attributeName)) {
	          return this.elements[i].attributes[attributeName].value;
	        }
	        i++;
	      }
	    } else if (typeof secondArg === "function") {
	      for (let i = 0; i < this.elements.length; i++ ) {
	        if(this.elements[i].hasAttribute(attributeName)) {
	          this.elements[i].attributes[attributeName].value = secondArg(this.elements[i].attributes[attributeName].value);
	          return this.elements[i].attributes[attributeName].value;
	        }
	        i++;
	      }
	    } else {
	      for (let i = 0; i < this.elements.length; i++ ) {
	        if(this.elements[i].hasAttribute(attributeName)) {
	          this.elements[i].attributes[attributeName].value = secondArg;
	          return this.elements[i].attributes[attributeName].value;
	        }
	        i++;
	      }
	    }
	  }

	  addClass(cName) {
	    this.elements.forEach((el) => {
	      el.className = el.className + ` ${cName}`;
	    });
	  }

	  removeClass(cName) {
	    this.elements.forEach((el) => {
	      let classNameSt = el.className;
	      let classes = classNameSt.split(" ");
	      classes = classes.map((el) => {
	        if (el !== cName){
	          return el;
	        }
	      });
	      el.className = classes.join(' ');
	    });
	  }

	  children() {
	    let childs = [];

	    this.elements.forEach((e) =>{
	      childs = childs.concat(Array.from(e.children));
	    });
	    return new DOMNodeCollection(childs);
	  }

	  parent() {
	    let parents = [];
	    this.elements.forEach((e) => {
	      parents.push(e.parentNode);
	    });
	    return new DOMNodeCollection(parents);
	  }

	  find(selector){
	    let results = [];
	    this.elements.forEach((el) => {
	      results = results.concat(Array.from(el.querySelectorAll(selector)));
	    });
	    return results;
	  }

	  remove() {
	    this.elements.forEach((el) => {
	      el.parentNode.removeChild(el);
	    });

	    this.elements = [];
	  }

	  on(lEvent, callback){
	    this.elements.forEach((el) => {
	      el.addEventListener(lEvent, callback);
	      const key = `event-${lEvent}`;
	      if (!el[key]) {
	        el[key] = [];
	      }
	      el[key].push(callback);
	    });
	  }

	off(lEvent) {
	    this.elements.forEach((el) => {
	      const key = `event-${lEvent}`;
	      if (el[key]){
	        el[key].forEach((listener) => {
	          el.removeEventListener(lEvent, listener);
	        });
	      }
	      el[key] = [];
	    });
	  }


	}



	module.exports = DOMNodeCollection;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const DOMNodeCollection = __webpack_require__(1);

	const $bD = function(arg) {
	    let selected;

	    if (arg instanceof HTMLElement){
	      selected = [arg];
	    } else if (typeof arg === "string"){

	      selected = Array.from(document.querySelectorAll(arg));
	    } if (typeof arg === "function") {
	      var tid = setInterval( function () {
	        if ( document.readyState !== 'complete' ) return;
	        clearInterval( tid );
	        window.$bD = $bD;

	        $bD.FakeJax = (options) => {
	          const xhr = new XMLHttpRequest();
	          const defaults = {
	            method: 'GET',
	            url: '',
	            data: {},
	            success: () => {},
	            error: () => {}
	          };
	          xhr.onload = function () {
	            if (xhr.status === 200) {
	              options.success(xhr.response);
	            } else {
	              options.error(xhr.response);
	            }
	          };
	          let url = defaults.url;
	          let verb = defaults.method;
	          let data = defaults.data;

	          if (options.url){
	            url = options.url;
	          }
	          if (options.method) {
	            let verb = options.method;
	          }
	          if (options.data) {
	            let data = options.data;
	          }
	          xhr.open(verb, url);
	          xhr.send(data);
	        };

	        arg();
	    }, 100 );
	    }
	    return new DOMNodeCollection(selected);
	  };

	module.exports = $bD;


/***/ }
/******/ ]);