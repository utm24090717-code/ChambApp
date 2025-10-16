const sendBtn = document.getElementById('sendBtn');
const messageInput = document.getElementById('messageInput');
const chatMessages = document.getElementById('chatMessages');

const role = localStorage.getItem("userRole") || "cliente"; // cliente o trabajador

// Cargar mensajes existentes
let messages = JSON.parse(localStorage.getItem("chatMessages")) || [];
renderMessages();

// Enviar mensaje
function sendMessage() {
  const text = messageInput.value.trim();
  if (text === '') return;

  const newMessage = {
    sender: role,
    text,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };

  messages.push(newMessage);
  localStorage.setItem("chatMessages", JSON.stringify(messages));

  messageInput.value = '';
  renderMessages();
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Renderizar mensajes
function renderMessages() {
  chatMessages.innerHTML = '';

  messages.forEach(msg => {
    const message = document.createElement('div');
    message.classList.add('message');

    // Cliente ve sus mensajes a la derecha, trabajador a la izquierda
    // Trabajador ve sus mensajes a la derecha, cliente a la izquierda
    const isOwn = msg.sender === role;

    message.classList.add(isOwn ? 'worker' : 'client');
    message.innerHTML = `
      <p>${msg.text}</p>
      <span class="time">${msg.time}</span>
    `;
    chatMessages.appendChild(message);
  });
}

// Evento botón "Enviar"
sendBtn.addEventListener('click', sendMessage);

// Evento tecla Enter
messageInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    sendMessage();
  }
});

// Refrescar chat cada 2 segundos
setInterval(() => {
  const updatedMessages = JSON.parse(localStorage.getItem("chatMessages")) || [];
  if (updatedMessages.length !== messages.length) {
    messages = updatedMessages;
    renderMessages();
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
}, 2000);
