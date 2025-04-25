import { tasks } from "../mock/task.js";
import { generateID } from "../utils.js";

export default class TasksModel {
  #boardtasks = tasks;
  #observers = [];

  get tasks() {
    return this.#boardtasks;
  }

  getTasksByStatus(status) {
    return this.#boardtasks.filter(task => task.status === status);
  }

  deleteTasksByStatus(status) {
    this.#boardtasks = this.#boardtasks.filter(task => task.status !== status);
    this._notifyObservers();
  }

  addTask(title) {
    const newTask = {
      title,
      status: 'backlog',
      id: generateID(),
    };
    this.#boardtasks.push(newTask);
    this._notifyObservers();
    return newTask;
  }

  updateTaskStatus(taskId, newStatus, newIndex) {
    const idx = this.#boardtasks.findIndex(task => task.id === taskId);
    if (idx === -1) {
      return;
    }
    const [task] = this.#boardtasks.splice(idx, 1);
    task.status = newStatus;

  
    const statusIndices = this.#boardtasks
      .map((t, i) => t.status === newStatus ? i : -1)
      .filter(i => i !== -1);

    let insertPos;
    if (statusIndices.length === 0) {
      insertPos = this.#boardtasks.length;
    } else if (newIndex >= statusIndices.length) {
      insertPos = statusIndices[statusIndices.length - 1] + 1;
    } else {
      insertPos = statusIndices[newIndex];
    }

    this.#boardtasks.splice(insertPos, 0, task);
    this._notifyObservers();
  }

  addObserver(observer) {
    this.#observers.push(observer);
  }

  removeObserver(observer) {
    this.#observers = this.#observers.filter(obs => obs !== observer);
  }

  _notifyObservers() {
    this.#observers.forEach(observer => observer());
  }
}