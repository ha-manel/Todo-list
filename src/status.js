export default class Status {
  // complete tasks and update task status
  completeTask = (array) => {
    const checkboxes = document.querySelectorAll('.check-task');
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener('click', () => {
        const todoTask = document.querySelectorAll('.todo-task');
        const newCheckboxes = document.querySelectorAll('.check-task');
        const index = Array.prototype.indexOf.call(newCheckboxes, checkbox);
        array = JSON.parse(localStorage.getItem('tasks')) || [];
        todoTask[index].classList.toggle('active');
        array[todoTask[index].id].isCompleted = !array[todoTask[index].id].isCompleted;
        localStorage.setItem('tasks', JSON.stringify(array));
        console.log(array);
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