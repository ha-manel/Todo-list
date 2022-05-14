export default class Status {
  // complete tasks and update task status
  completeTask = (array) => {
    const todoTask = document.querySelectorAll('.todo-task');
    const checkboxes = document.querySelectorAll('.check-task');
    checkboxes.forEach((checkbox, index) => {
      checkbox.addEventListener('click', () => {
        todoTask[index].classList.toggle('active');
        array[index].isCompleted = !array[index].isCompleted;
        localStorage.setItem('tasks', JSON.stringify(array));
        const todoInput = document.querySelectorAll('.todo-input');
        if (todoTask[index].classList.contains('active')) {
          todoInput[index].setAttribute('readOnly', true);
        } else {
          todoInput[index].removeAttribute('readOnly');
        }
      });
    });
  }

  // clear the completed tasks
  clearCompleted = (tasks) => {
    const clearBtn = document.querySelector('#clear-completed');
    clearBtn.addEventListener('click', () => {
      tasks.tasksArray = tasks.tasksArray.filter((item) => item.isCompleted === false);
      tasks.saveAndRender();
    });
  }
}