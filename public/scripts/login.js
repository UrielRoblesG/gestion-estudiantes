document.addEventListener("DOMContentLoaded", () => {
  // Referencias actualizadas: submitButton usa el ID 'btnLogin'
  const formLogin = document.getElementById("formLogin");
  const inputEmail = document.getElementById("inputEmail");
  const inputPassword = document.getElementById("inputPassword");
  const submitButton = document.getElementById("btnLogin"); // ID del botón

  // Elementos de utilidad
  const statusMessage = document.getElementById("status-message");
  const buttonText = document.getElementById("button-text");
  const loader = document.getElementById("loader");

  submitButton.disabled = false;

  /**
   * Muestra un mensaje de estado en la UI usando clases de alerta de Bootstrap.
   * @param {string} message - El texto del mensaje.
   * @param {string} type - 'success' o 'error'.
   */
  function displayStatus(message, type) {
    statusMessage.textContent = message;
    statusMessage.classList.remove("d-none", "alert-danger", "alert-success");

    if (type === "error") {
      statusMessage.classList.add("alert-danger");
    } else if (type === "success") {
      statusMessage.classList.add("alert-success");
    }
  }

  /**
   * Oculta el mensaje de estado y borra las clases de validación del formulario.
   */
  function clearMessages() {
    statusMessage.classList.add("d-none");
    // Quita las clases de validación del formulario al iniciar una nueva acción o al editar
    formLogin.classList.remove("was-validated");
  }

  /**
   * Habilita o deshabilita el botón de envío y muestra/oculta el loader.
   * @param {boolean} isLoading - Indica si se está cargando.
   */
  function setFormLoading(isLoading) {
    submitButton.disabled = isLoading;
    if (isLoading) {
      buttonText.textContent = "Cargando...";
      loader.classList.remove("d-none"); // Muestra el spinner de Bootstrap
    } else {
      buttonText.textContent = "Iniciar sesión";
      loader.classList.add("d-none"); // Oculta el spinner de Bootstrap
    }
  }

  // --- Lógica de Validación en Tiempo Real (Proporcionada por el usuario) ---

  inputEmail.addEventListener("input", () => {
    clearMessages();
    if (inputEmail.validity.valid) {
      inputEmail.classList.remove("is-invalid");
      inputEmail.classList.add("is-valid");
    } else {
      inputEmail.classList.remove("is-valid");
      inputEmail.classList.add("is-invalid");
    }
  });

  inputPassword.addEventListener("input", () => {
    clearMessages();
    if (inputPassword.validity.valid) {
      inputPassword.classList.remove("is-invalid");
      inputPassword.classList.add("is-valid");
    } else {
      inputPassword.classList.remove("is-valid");
      inputPassword.classList.add("is-invalid");
    }
  });

  // --- Manejador de Envío (Lógica del usuario con utilidades integradas) ---
  formLogin.addEventListener("submit", async (event) => {
    event.preventDefault();
    event.stopPropagation();

    clearMessages(); // Limpia mensajes de estado anteriores

    // 1. Validación nativa de Bootstrap
    if (!formLogin.checkValidity()) {
      formLogin.classList.add("was-validated"); // Muestra el feedback de error de Bootstrap
      return;
    }

    setFormLoading(true);

    const loginData = {
      email: inputEmail.value.trim(),
      password: inputPassword.value,
    };

    // Endpoint de la API 
    const apiUrl = "/api/autenticacion/login";

    try {
      // Simulación de espera para mejor UX
      await new Promise((resolve) => setTimeout(resolve, 500));

      const respuesta = await fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify(loginData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!respuesta.ok) {
        // El servidor devolvió un código de error (4xx o 5xx)
        const errorData = await respuesta
          .json()
          .catch(() => ({
            message: "Error desconocido al procesar la respuesta.",
          }));
        // Usamos el mensaje del servidor o un fallback genérico
        throw new Error(
          errorData.message ||
            `Error ${respuesta.status}: Credenciales incorrectas.`
        );
      }

      // Caso de exito
      const decodedData = await respuesta.json();

      sessionStorage.setItem('token', decodedData.data.token);

      // Éxito: Usar la vista proporcionada por el servidor
      displayStatus("¡Acceso exitoso! Redirigiendo...", "success");

      setTimeout(() => {
        // Redirección a la ruta indicada por el servidor (ej: /home)
        location.href = decodedData.data.view;
      }, 1000);
    } catch (error) {
      // Error de red o error lanzado
      console.error("Ocurrió un error al iniciar sesión:", error.message);
      // Usa la utilidad displayStatus en lugar de alert()
      displayStatus(
        `Ocurrió un error al iniciar sesión: ${
          error.message || "Error de conexión."
        }`,
        "error"
      );
    } finally {
      setFormLoading(false);
    }
  });
});
