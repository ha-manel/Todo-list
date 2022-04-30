import Status from './status.js';
import dragItem from './dragItems.js';

const status = new Status();

export default class Tasks {
  constructor() {
    this.tasksArray = JSON.parse(localStorage.getItem('tasks')) || [];
  }

  populateList = () => {
    // display items
    const todoContainer = document.querySelector('#todo-list');
    todoContainer.innerHTML = '';
    this.tasksArray.forEach((task) => {
      const li = document.createElement('li');
      li.className = 'todo-task';
      li.draggable = true;
      li.id = task.index;
      li.innerHTML = `<div><button class="check-task"><i class="fa-regular fa-square"></i> <i class="fa-solid fa-check"></i></button> <input class="todo-input" type="text" value="${task.description}"></div><div><button class="delete-task"><i class="fa-solid fa-trash-can"></i></button><button class="move-task"><i class="fa-solid fa-ellipsis-vertical"></i></button><div>`;
      todoContainer.insertBefore(li, todoContainer.children[task.index - 1]);
      if (task.isCompleted) {
        li.classList.add('active');
      }
    });

    // delete item
    const deleteBtn = document.querySelectorAll('.delete-task');
    deleteBtn.forEach((button, index) => {
      button.addEventListener('click', () => {
        this.remove(index);
      });
    });

    // edit item
    const editInput = document.querySelectorAll('.todo-input');
    editInput.forEach((input, index) => {
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && input.value) {
          this.update(input.value, index);
        }
      });
      input.addEventListener('change', () => {
        if (input.value) {
          this.update(input.value, index);
        }
      });
    });

    // complete task and update status
    status.completeTask(this.tasksArray);

    // dragging feature
    dragItem(this.tasksArray);
  }

  add = (value) => {
    this.tasksArray.push({
      description: value,
      isCompleted: false,
      index: this.tasksArray.length + 1,
      isMoved: false,
    });
    localStorage.setItem('tasks', JSON.stringify(this.tasksArray));
    this.populateList();
  }

  update = (value, index) => {
    this.tasksArray[index].description = value;
    localStorage.setItem('tasks', JSON.stringify(this.tasksArray));
    this.populateList();
  }

  remove = (index) => {
    this.tasksArray.splice(index, 1);
    for (let i = 0; i < this.tasksArray.length; i += 1) {
      this.tasksArray[i].index = i;
    }
    localStorage.setItem('tasks', JSON.stringify(this.tasksArray));
    this.populateList();
  }
}