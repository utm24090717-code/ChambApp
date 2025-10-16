// Esperar a que cargue el DOM
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const titleInput = document.getElementById('task-title');
  const descInput = document.getElementById('task-desc');
  const priceInput = document.getElementById('task-price');
  const taskList = document.querySelector('.task-list');

  // Cargar tareas existentes
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  renderTasks();

  // Cuando se envíe el formulario
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const task = {
      id: Date.now(),
      title: titleInput.value,
      description: descInput.value,
      price: priceInput.value,
      status: "Pendiente"
    };

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    form.reset();
    renderTasks();
  });

  // Renderizar tareas
  function renderTasks() {
    const taskSection = document.querySelector('.task-list');
    const container = document.createElement('div');
    container.innerHTML = `<h2>Mis tareas activas</h2>`;

    if (tasks.length === 0) {
      container.innerHTML += `<p>No tienes tareas publicadas aún.</p>`;
    } else {
      tasks.forEach(task => {
        const card = document.createElement('div');
        card.classList.add('task-card');
        card.innerHTML = `
          <h3>${task.title}</h3>
          <p>${task.description}</p>
          <div class="task-info">
            <span>Pago: <strong>$${task.price} MXN</strong></span>
            <span>Estado: ${task.status}</span>
          </div>
          <button class="btn-details">Ver detalles</button>
        `;
        container.appendChild(card);
      });
    }

    taskSection.innerHTML = "";
    taskSection.appendChild(container);

  }
});

// Al entrar al chat desde el dashboard del cliente
const chatLink = document.querySelector('a[href="/html/chat.html"]');
if (chatLink) {
  chatLink.addEventListener('click', () => {
    localStorage.setItem("userRole", "cliente");
  });
}
