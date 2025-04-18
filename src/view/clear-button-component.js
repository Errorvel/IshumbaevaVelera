import { AbstractComponent } from "../framework/view/abstract-component.js";

export default class ClearButtonComponent extends AbstractComponent {
  constructor({ onClear }) {
    super();
    if (onClear) {
      this.setOnClearHandler(onClear);
    }
  }

  get template() {
    return `
      <button class="btn clear">Очистить корзину</button>
    `;
  }

  setOnClearHandler(handler) {
    this.element.addEventListener('click', handler);
  }
}