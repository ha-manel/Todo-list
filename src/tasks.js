import Status from './status.js';

const status = new Status();

export default class Tasks {
  constructor() {
    this.tasksArray = JSON.parse(localStorage.getItem('tasks')) || [];
  }

  saveAndRender = () => {
    localStorage.setItem('tasks', JSON.stringify(this.tasksArray));
    this.populateList();
  }

  populateList = () => {
    // display items
    const todoContainer = document.querySelector('#todo-list');
    todoContainer.innerHTML = '';
    this.tasksArray.forEach((task) => {
      const li = document.createElement('li');
      li.className = 'todo-task';
      li.id = task.index;
      li.innerHTML = `<div><button class="check-task"><i class="fa-regular fa-square"></i> <i class="fa-solid fa-check"></i></button> <input class="todo-input" type="text" value="${task.description}"></div><button class="delete-task"><i class="fa-solid fa-trash-can"></i></button>`;
      todoContainer.insertBefore(li, todoContainer.children[task.index]);
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

    // focus item
    const editInput = document.querySelectorAll('.todo-input');
    const todoTask = document.querySelectorAll('.todo-task');
    editInput.forEach((input, index) => {
      input.addEventListener('focus', () => {
        todoTask[index].classList.add('focus');
      });

      input.addEventListener('focusout', () => {
        todoTask[index].classList.remove('focus');
      });
    });

    // edit item
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
  }

  add = (value) => {
    this.tasksArray.push({
      description: value,
      isCompleted: false,
      index: this.tasksArray.length,
    });
    this.saveAndRender();
  }

  update = (value, index) => {
    this.tasksArray[index].description = value;
    this.saveAndRender();
  }

  remove = (index) => {
    this.tasksArray.splice(index, 1);
    this.tasksArray.forEach((task, index) => {
      task.index = index;
    });
    this.saveAndRender();
  }
}