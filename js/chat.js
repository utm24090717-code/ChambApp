// chat.js
const sendBtn = document.getElementById('sendBtn');
const messageInput = document.getElementById('messageInput');
const chatMessages = document.getElementById('chatMessages');

// Función para enviar mensaje
function sendMessage() {
  const text = messageInput.value.trim();
  if (text === '') return;

  const message = document.createElement('div');
  message.classList.add('message', 'worker');
  message.innerHTML = `
    <p>${text}</p>
    <span class="time">${new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    })}</span>
  `;

  chatMessages.appendChild(message);
  messageInput.value = '';
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Evento botón "Enviar"
sendBtn.addEventListener('click', sendMessage);

// Evento tecla "Enter"
messageInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    sendMessage();
  }
});
