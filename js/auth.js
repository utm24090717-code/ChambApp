// ====== auth.js ======

// --- REGISTRO DE USUARIO ---
const registerForm = document.querySelector(".register-box form");
if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const role = document.getElementById("role").value;

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    if (!role) {
      alert("Por favor selecciona un rol.");
      return;
    }

    // Simula guardar usuario en base de datos
    const user = { name, email, password, role };
    localStorage.setItem(email, JSON.stringify(user));
    alert("Cuenta creada con éxito. Ahora puedes iniciar sesión.");
    window.location.href = "login.html";
  });
}

// --- INICIO DE SESIÓN ---
const loginForm = document.querySelector(".login-box form");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    const storedUser = localStorage.getItem(email);

    if (!storedUser) {
      alert("No existe una cuenta con ese correo.");
      return;
    }

    const user = JSON.parse(storedUser);

    if (user.password !== password) {
      alert("Contraseña incorrecta.");
      return;
    }

    // Guardar sesión actual
    localStorage.setItem("loggedUser", JSON.stringify(user));

    // Redirigir según el rol
    if (user.role === "worker") {
      window.location.href = "dashboard_worker.html";
    } else if (user.role === "client") {
      window.location.href = "dashboard.html";
    } else {
      alert("Rol no válido. Contacta soporte.");
    }
  });
}

// --- FUNCIÓN PARA CERRAR SESIÓN (puedes llamarla desde un botón en el dashboard) ---
function logout() {
  localStorage.removeItem("loggedUser");
  window.location.href = "login.html";
}
