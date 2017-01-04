const DOMNodeCollection = require('./dom_node_collection.js');

document.addEventListener("DOMContentLoaded", () => {
  const $l = function(arg) {
    let selected;

    if (arg instanceof HTMLElement){
      selected = [arg];
    } else if (typeof arg === "string"){

      selected = Array.from(document.querySelectorAll(arg));
    }
    return new DOMNodeCollection(selected);
  };
  window.$l = $l;

  $l.FakeJax = (options) => {
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
  let i = 0;
  let j = 0;
  $l('.add').on('click', () => {
    const listName = $l('.list-name').elements[0].value;
    const listClass = `list-${i}`;
    // console.log("hello");
    $l('body').append(`<div class='list-div'>
              <button class='remove-${listClass}'>x</button>
              <h1 class='list-title'>${listName}</h1>
              <div class='list-inputs'>
                <input class='${listClass}-input item-input'
                    type='text' placeholder='new item' />
                <button class='${listClass}-button item-button'>add item</button>
              </div>
            <ul class='${listClass} todo-list'></ul>
            </div>`);
      $l(`.${listClass}-button`).on('click', () => {
        const itemName = $l(`.${listClass}-input`).elements[0].value;
        $l(`.${listClass}`).append(`<li>${itemName}
          <button class='item-${j}'>x</button>
          </li>`);
        $l(`.item-${j}`).on('click', (e) => {
          // debugger
          e.target.parentNode.remove();
        });
        $l(`.${listClass}-input`).elements[0].value = '';
        j++;
      });
      $l(`.remove-${listClass}`).on('click', (e) => {
        e.target.parentNode.remove();
      });
      $l('.list-name').elements[0].value = '';
      i++;
  });


});
