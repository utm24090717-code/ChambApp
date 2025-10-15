// dashboard_worker.js
document.addEventListener('DOMContentLoaded', () => {
  const taskList = document.querySelector('.task-list');
  const searchInput = document.querySelector('.search-bar input');
  const searchBtn = document.querySelector('.btn-search');

  // Cargar tareas del localStorage
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  renderTasks(tasks);

  // 🔍 Buscar tareas
  searchBtn.addEventListener('click', () => {
    const term = searchInput.value.toLowerCase();
    const filteredTasks = tasks.filter(task =>
      task.title.toLowerCase().includes(term) ||
      task.description.toLowerCase().includes(term)
    );
    renderTasks(filteredTasks);
  });

  // 🧱 Renderizar tareas
  function renderTasks(tasksToRender) {
    taskList.innerHTML = `<h2>Tareas disponibles</h2>`;

    if (tasksToRender.length === 0) {
      taskList.innerHTML += `<p>No hay tareas disponibles por el momento.</p>`;
      return;
    }

    tasksToRender.forEach(task => {
      const card = document.createElement('div');
      card.classList.add('task-card');

      let actionButton = '';

      if (task.status === 'Pendiente') {
        actionButton = `<button class="btn-accept">Aceptar tarea</button>`;
      } else if (task.status === 'En curso') {
        actionButton = `<button class="btn-complete">Marcar como completada</button>`;
      } else if (task.status === 'Completada') {
        actionButton = `<button class="btn-done" disabled>Completada ✅</button>`;
      }

      card.innerHTML = `
        <h3>${task.title}</h3>
        <p>${task.description}</p>
        <div class="task-info">
          <span>Pago: <strong>$${task.price} MXN</strong></span>
          <span>Estado: ${task.status}</span>
        </div>
        ${actionButton}
      `;

      // Escuchar eventos según el estado
      if (task.status === 'Pendiente') {
        card.querySelector('.btn-accept').addEventListener('click', () => acceptTask(task.id));
      } else if (task.status === 'En curso') {
        card.querySelector('.btn-complete').addEventListener('click', () => completeTask(task.id));
      }

      taskList.appendChild(card);
    });
  }

  // ⚙️ Aceptar tarea
  function acceptTask(taskId) {
    tasks = tasks.map(task =>
      task.id === taskId ? { ...task, status: 'En curso' } : task
    );
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks(tasks);
    alert('Tarea aceptada. Ahora está en curso.');
  }

  // ✅ Completar tarea
  function completeTask(taskId) {
    tasks = tasks.map(task =>
      task.id === taskId ? { ...task, status: 'Completada' } : task
    );
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks(tasks);
    alert('Tarea marcada como completada.');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const taskButtons = document.querySelectorAll('.btn-accept');

  taskButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Paso 1: Cambia de "Aceptar tarea" → "Marcar como completada"
      if (button.classList.contains('btn-accept')) {
        button.textContent = 'Marcar como completada';
        button.classList.remove('btn-accept');
        button.classList.add('btn-complete');

      // Paso 2: Cambia de "Marcar como completada" → "Completada ✅"
      } else if (button.classList.contains('btn-complete')) {
        button.textContent = 'Completada ✅';
        button.classList.remove('btn-complete');
        button.classList.add('btn-done');
      }
    });
  });
});
