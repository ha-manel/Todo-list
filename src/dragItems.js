const getDragAfterElement = (container, y) => {
  const draggableElements = [...container.querySelectorAll('.todo-task:not(.dragging)')];

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset, element: child };
    }
    return closest;
  }, { offset: Number.NEGATIVE_INFINITY }).element;
};

const dragItem = () => {
  const draggables = document.querySelectorAll('.todo-task');
  const container = document.getElementById('todo-list');
  const newOrder = [];
  draggables.forEach((draggable) => {
    draggable.addEventListener('dragstart', () => {
      draggable.classList.add('dragging');
    });

    draggable.addEventListener('dragend', () => {
      draggable.classList.remove('dragging');
    });

    draggable.addEventListener('drop', () => {
      const newDrags = document.querySelectorAll('.todo-task');
      newDrags.forEach((drag, index) => {
        drag.id = index;
        newOrder.push({ description: drag.firstChild.lastChild.value, isCompleted: drag.classList.contains('active'), index: Number(drag.id) });
      });
      localStorage.setItem('tasks', JSON.stringify(newOrder));
    });

    container.addEventListener('dragover', (e) => {
      e.preventDefault();
      const afterElement = getDragAfterElement(container, e.clientY);
      const dragged = document.querySelector('.dragging');
      if (afterElement == null) {
        container.appendChild(dragged);
      } else {
        container.insertBefore(dragged, afterElement);
      }
    });
  });
};
export default (dragItem);