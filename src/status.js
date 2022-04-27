export default class Status {
  constructor() {
    this.tasksArray = JSON.parse(localStorage.getItem('tasks')) || [];
  }

  // complete tasks and update task status
  completeTask = () => {
    this.tasksArray = JSON.parse(localStorage.getItem('tasks')) || [];
    const checkboxes = document.querySelectorAll('.check-task');
    const todoTask = document.querySelectorAll('.todo-task');
    checkboxes.forEach((checkbox, index) => {
      checkbox.addEventListener('click', () => {
        todoTask[index].classList.toggle('active');
        this.tasksArray[index].isCompleted = !this.tasksArray[index].isCompleted;
        localStorage.setItem('tasks', JSON.stringify(this.tasksArray));
      });
    });
  }

  // clear the completed tasks
  clearCompleted = () => {
    const clearBtn = document.querySelector('#clear-completed');
    clearBtn.addEventListener('click', () => {
      this.tasksArray = JSON.parse(localStorage.getItem('tasks')) || [];
      this.tasksArray = this.tasksArray.filter((item) => item.isCompleted === false);
      localStorage.setItem('tasks', JSON.stringify(this.tasksArray));
      document.location.reload();
    });
  }
}