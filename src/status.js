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
      });
    });
  }

  // clear the completed tasks
  clearCompleted = (tasks) => {
    const clearBtn = document.querySelector('#clear-completed');
    clearBtn.addEventListener('click', () => {
      tasks.tasksArray = tasks.tasksArray.filter((item) => item.isCompleted === false);
      localStorage.setItem('tasks', JSON.stringify(tasks.tasksArray));
      tasks.populateList();
    });
  }
}