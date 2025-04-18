import { AbstractComponent } from "../framework/view/abstract-component.js";

const createFormAddTaskComponentTemplate = () => `
  <form class="form-add-task">
    <input id="add-task" type="text" class="task-input" placeholder="Введите название задачи" required>
    <button type="submit" class="task-submit">Добавить</button>
  </form>
`;

export default class FormAddTaskComponent extends AbstractComponent {
  #handleClick = null;

  constructor({ onClick }) {
    super();
    this.#handleClick = onClick;
    this.element.addEventListener('submit', this.#clickHandler);
  }

  get template() {
    return createFormAddTaskComponentTemplate();
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  }
}
