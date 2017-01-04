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
