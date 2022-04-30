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
  draggables.forEach((draggable) => {
    draggable.addEventListener('dragstart', () => {
      draggable.classList.add('dragging');
    });

    draggable.addEventListener('dragend', () => {
      draggable.classList.remove('dragging');
    });

    //   draggable.addEventListener('drop', () => {
    //     const newDrag = document.querySelectorAll('.todo-task');
    //     newDrag.forEach((item, newIndex) => {
    //       const obj = array.find((x) => x.index == item.id && x.isMoved === false);
    //       console.log(obj);
    //       const itemIndex = array.indexOf(obj);
    //       array[itemIndex].index = newIndex + 1;
    //       array[itemIndex].isMoved = true;
    //       item.id = newIndex + 1;
    //     });

    //     array.forEach((item) => {
    //       item.isMoved = false;
    //     });
    //     console.log(array);
    //     localStorage.setItem('tasks', JSON.stringify(array));
    //   });
    // });

    draggable.addEventListener('drop', () => {
      const newDrags = document.querySelectorAll('.todo-task');
      const newOrder = [];
      newDrags.forEach((drag, index) => {
        drag.id = index;
        newOrder.push({ description: drag.firstChild.lastChild.value, isCompleted: drag.classList.contains('active'), index: drag.id });
        console.log(drag.firstChild.lastChild.value);
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