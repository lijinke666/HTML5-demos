customElements.define('open-shadow',
  class extends HTMLElement {
    constructor() {
      super();

      let pElem = document.createElement('p');
      pElem.textContent = this.getAttribute('text');

      let shadowRoot = this.attachShadow({mode: 'open'})
        .appendChild(pElem);

  }
});

customElements.define('closed-shadow',
  class extends HTMLElement {
    constructor() {
      super();

      let pElem = document.createElement('p');
      pElem.textContent = this.getAttribute('text');

      let shadowRoot = this.attachShadow({mode: 'closed'})
        .appendChild(pElem);
  }
});



customElements.define('element-details',
  class extends HTMLElement {
    constructor() {
      super();
      const template = document
        .getElementById('element-details-template')
        .content;
      const shadowRoot = this.attachShadow({mode: 'open'})
        .appendChild(template.cloneNode(true));
  }
});