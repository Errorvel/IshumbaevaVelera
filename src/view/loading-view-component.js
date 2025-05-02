import { AbstractComponent } from '../framework/view/abstract-component.js';

function createLoadingViewTemplate() {
  return `
    <p class="board__loading">
      Loading…
    </p>
  `;
}

export default class LoadingViewComponent extends AbstractComponent {
  get template() {
    return createLoadingViewTemplate();
  }
}