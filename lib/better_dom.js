const DOMNodeCollection = require('./dom_node_collection.js');
// debugger
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
        // window.$bD = $bD;

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

// module.exports = $bD;
window.$bD = $bD;
