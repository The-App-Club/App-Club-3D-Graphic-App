class Split {
  constructor() {
    this.elms = {
      targetText: document.querySelectorAll('[data-split="text"]'),
    };
    this.init();
  }
  init() {
    this.splitting();
  }
  splitting() {
    this.elms.targetText.forEach((element) => {
      const innerText = element.innerText;
      element.innerHTML = '';

      const textContainer = document.createElement('div');
      textContainer.classList.add('block');

      for (let letter of innerText) {
        let span = document.createElement('span');
        span.innerText = letter.trim() === '' ? '\xa0' : letter;
        span.classList.add('loading__text');
        textContainer.appendChild(span);
      }
      element.appendChild(textContainer);
    });
  }
}

export {Split};
