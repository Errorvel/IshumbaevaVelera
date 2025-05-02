import Observable from '../framework/observable.js';
import { UserAction, UpdateType, Status } from '../const.js';
import { generateId } from '../utils.js';

export default class TasksModel extends Observable {
  #tasksApiService = null;
  #boardtasks = [];

  constructor({ tasksApiService }) {
    super();
    this.#tasksApiService = tasksApiService;
  }

  get tasks() {
    return this.#boardtasks;
  }

  async init() {
    try {
      const tasks = await this.#tasksApiService.tasks;
      this.#boardtasks = tasks;
    } catch (err) {
      this.#boardtasks = [];
    }
    this._notify(UpdateType.INIT);
  }

  async addTask(title) {
    const newTask = {
      title,
      status: 'backlog',
      id: generateId(),
    };
    try {
      const createdTask = await this.#tasksApiService.addTask(newTask);
      this.#boardtasks.push(createdTask);
      this._notify(UserAction.ADD_TASK, createdTask);
      return createdTask;
    } catch (err) {
      console.error('Ошибка при добавлении задачи на сервер:', err);
      throw err;
    }
  }

  async updateTaskStatus(taskId, newStatus, beforeTaskId = null) {
    const task = this.#boardtasks.find(t => t.id === taskId);
    if (!task) {
      throw new Error(`Task ${taskId} not found`);
    }
    const previousStatus = task.status;
    const previousIndex = this.#boardtasks.indexOf(task);

    task.status = newStatus;

    try {
      const updated = await this.#tasksApiService.updateTask(task);
      Object.assign(task, updated);
      this.#boardtasks.splice(previousIndex, 1);

      if (beforeTaskId) {
        const beforeIndex = this.#boardtasks.findIndex(t => t.id === beforeTaskId);
        if (beforeIndex !== -1) {
          this.#boardtasks.splice(beforeIndex, 0, task);
        } else {
          // если beforeTaskId не найден добавляем в конец
          this.#boardtasks.push(task);
        }
      } else {
        this.#boardtasks.push(task);
      }

      this._notify(UserAction.UPDATE_TASK, task);
    } catch (err) {
      console.error('Ошибка при обновлении задачи на сервере:', err);
      task.status = previousStatus;
      const currentIndex = this.#boardtasks.indexOf(task);
      if (currentIndex !== -1) {
        this.#boardtasks.splice(currentIndex, 1);
      }
      this.#boardtasks.splice(previousIndex, 0, task);
      throw err;
    }
  }

  deleteTask(taskId) {
    this.#boardtasks = this.#boardtasks.filter(task => task.id !== taskId);
    this._notify(UserAction.DELETE_TASK, { id: taskId });
  }

  async clearBasketTasks() {
    const basketTasks = this.#boardtasks.filter(task => task.status === 'basket');
    try {
      await Promise.all(
        basketTasks.map(task => this.#tasksApiService.deleteTask(task.id))
      );
      this.#boardtasks = this.#boardtasks.filter(task => task.status !== 'basket');
      this._notify(UserAction.DELETE_TASK, { status: 'basket' });
    } catch (err) {
      console.error('Ошибка при удалении задач из корзины на сервере:', err);
      throw err;
    }
  }

  hasBasketTasks() {
    return this.#boardtasks.some(task => task.status === 'basket');
  }
}
