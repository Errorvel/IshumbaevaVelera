import { render } from '../framework/render.js';
import { Status, StatusLabel } from '../const.js';
import TaskComponent from '../view/task-component.js';
import TaskListComponent from '../view/task-list-component.js';
import EmptyPlaceholderComponent from '../view/empty-placeholder-component.js';
import ClearButtonComponent from '../view/clear-button-component.js';
import BoardComponent from '../view/board-component.js';

export default class TasksBoardPresenter {
  #boardContainer = null;
  #tasksModel = null;
  #tasksBoardComponent = new BoardComponent();

  constructor({ boardContainer, tasksModel }) {
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;
    this.#tasksModel.addObserver(this.#handleModelChange.bind(this));
  }

  init() {
    this.#renderBoard();
  }

  createTask() {
    const input = document.querySelector('#add-task');
    const title = input?.value.trim();
    if (!title) return;

    this.#tasksModel.addTask(title);
    input.value = '';
  }

  get tasks() {
    return this.#tasksModel.tasks;
  }

  #handleModelChange() {
    this.#clearBoard();
    this.#renderBoard();
  }

  #clearBoard() {
    this.#tasksBoardComponent.element.innerHTML = '';
  }

  #renderTask(task, listContainer) {
    const taskComponent = new TaskComponent({ task });
    render(taskComponent, listContainer);
  }

  #handleTaskDrop(taskId, newStatus, newIndex) {
    this.#tasksModel.updateTaskStatus(taskId, newStatus, newIndex);
  }

  #renderTasksList(status, container) {
    const listCmp = new TaskListComponent({
      status,
      title: StatusLabel[status],
      onTaskDrop: this.#handleTaskDrop.bind(this),
    });
    render(listCmp, container);

    const listContainer = listCmp.element.querySelector('.tasks-container');
    const items = this.tasks.filter(t => t.status === status);

    if (items.length === 0) {
      render(new EmptyPlaceholderComponent(), listContainer);
    } else {
      items.forEach(task => this.#renderTask(task, listContainer));
    }

    if (status === Status.BASKET) {
      render(
        new ClearButtonComponent({
          onClear: () => this.#tasksModel.deleteTasksByStatus(Status.BASKET),
        }),
        listContainer
      );
    }
  }

  #renderBoard() {
    render(this.#tasksBoardComponent, this.#boardContainer);

    Object.values(Status).forEach(status => {
      this.#renderTasksList(status, this.#tasksBoardComponent.element);
    });
  }
}
