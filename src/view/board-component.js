import { AbstractComponent } from "../framework/view/abstract-component.js";

export default class BoardComponent extends AbstractComponent {
  get template() {
    return `
      <div class="task-board"></div>
    `;
  }
}