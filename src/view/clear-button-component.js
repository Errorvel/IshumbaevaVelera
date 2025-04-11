import { AbstractComponent } from "../framework/view/abstract-component.js";

export default class ClearButtonComponent extends AbstractComponent {
  get template() {
    return `
      <button class="btn clear">Очистить корзину</button>
    `;
  }
}