import { render } from './framework/render.js';
import HeaderComponent from './view/header-component.js';
import BoardComponent from './view/board-component.js';
import TaskListComponent from './view/task-list-component.js';
import FormAddTaskComponent from './view/form-add-task-component.js';

const bodyContainer = document.querySelector('body');

render(new HeaderComponent(), bodyContainer);


const boardComponent = new BoardComponent();
render(boardComponent, bodyContainer);
const boardElement = boardComponent.getElement();


const formAddTaskComponent = new FormAddTaskComponent();
render(formAddTaskComponent, boardElement);

const tasksContainer = document.createElement("div");
tasksContainer.classList.add("tasks-row");
boardElement.appendChild(tasksContainer);


const taskComponents = [];
for (let i = 0; i < 4; i++) {
  const taskListComponent = new TaskListComponent();
  render(taskListComponent, tasksContainer);
  taskListComponent.addTasks();
  taskComponents.push(taskListComponent);
}

const addButton = formAddTaskComponent.getElement().querySelector("#addTaskBtn");
const inputField = formAddTaskComponent.getElement().querySelector("#taskInput");

addButton.addEventListener("click", () => {
  const taskText = inputField.value.trim();
  if (taskText) {
    taskComponents[0].addTask(taskText); 
    inputField.value = "";
  }
});
