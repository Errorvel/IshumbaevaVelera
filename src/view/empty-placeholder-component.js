import { AbstractComponent } from "../framework/view/abstract-component.js";

export default class EmptyPlaceholderComponent extends AbstractComponent {
  get template() {
    return `
      <div class="empty-placeholder">
        <p>Перетащите карточку сюда</p>
      </div>
    `;
  }
}