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
});
