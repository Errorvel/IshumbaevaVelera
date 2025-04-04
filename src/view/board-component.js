import { createElement } from '../framework/render.js';
import ClearButtonComponent from './clear-button-component.js';
function createBoardComponentTemplate() {
  return `<div class="task-board"></div>`; 
}

export default class BoardComponent {
  getTemplate() {
    return createBoardComponentTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
      
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
