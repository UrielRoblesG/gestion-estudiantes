
# Ejercicio: Validación en tiempo real de un formulario con JavaScript y Bootstrap

## Objetivo
Crear un formulario que valide los campos del registro de usuario **en tiempo real** usando **JavaScript puro** y las clases de validación de **Bootstrap** (`is-valid`, `is-invalid`, `was-validated`).

---

## Instrucciones

### 1. Preparar el formulario HTML
- Crea un formulario con `id="formRegistro"`.  
- Debe contener los siguientes campos con sus respectivos `id`:
  - `inputNombre` → campo de texto para el nombre  
  - `inputEmail` → campo de correo electrónico  
  - `selectRol` → lista desplegable para seleccionar el rol  
  - `inputPassword` → campo para contraseña  
  - `inputConfirmPassword` → campo para confirmar contraseña  
- Debajo del campo de correo, agrega un párrafo con `id="emailFeedback"` para mostrar mensajes de error.

---

### 2. Seleccionar los elementos con JavaScript
Usa `document.getElementById` para obtener una referencia a cada campo:

\`\`\`js
const form = document.getElementById("formRegistro");
const nombreInput = document.getElementById("inputNombre");
const emailInput = document.getElementById("inputEmail");
const rolSelect = document.getElementById("selectRol");
const passwordInput = document.getElementById("inputPassword");
const confirmPasswordInput = document.getElementById("inputConfirmPassword");
\`\`\`

---

### 3. Validaciones individuales
Crea funciones que verifiquen cada campo y agreguen o quiten las clases de Bootstrap según corresponda:

**Ejemplo para el nombre:**
\`\`\`js
function validarNombre() {
  if (nombreInput.value.trim() === "") {
    nombreInput.classList.add("is-invalid");
    nombreInput.classList.remove("is-valid");
  } else {
    nombreInput.classList.add("is-valid");
    nombreInput.classList.remove("is-invalid");
  }
}
\`\`\`

**Correo electrónico:**  
- Debe tener un formato válido con expresión regular.  
- Si está vacío o no es válido, muestra un mensaje en `emailFeedback`.

**Rol:**  
- Si no se selecciona ninguna opción, marca el select como inválido.

**Contraseña:**  
- La contraseña principal debe tener al menos 6 caracteres.  
- La confirmación debe coincidir con la principal.

---

### 4. Eventos en tiempo real
Agrega `eventListener` para que los campos se validen mientras el usuario escribe o selecciona:

\`\`\`js
nombreInput.addEventListener("input", validarNombre);
emailInput.addEventListener("input", validarEmail);
rolSelect.addEventListener("change", validarRol);
passwordInput.addEventListener("input", validarPassword);
confirmPasswordInput.addEventListener("input", validarConfirmacion);
\`\`\`

---

### 5. Validación al enviar el formulario
Agrega un evento `submit` para validar todo antes de enviar:

\`\`\`js
form.addEventListener("submit", (event) => {
  event.preventDefault();
  event.stopPropagation();

  validarNombre();
  validarEmail();
  validarRol();
  validarPassword();
  validarConfirmacion();

  if (!form.checkValidity()) {
    form.classList.add("was-validated");
  } else {
    alert("Formulario válido. ¡Cuenta creada exitosamente!");
    form.reset();
    form.classList.remove("was-validated");

    // Quitar clases de validación
    document
      .querySelectorAll(".is-valid, .is-invalid")
      .forEach((el) => el.classList.remove("is-valid", "is-invalid"));
  }
});
\`\`\`

---

## Resultado esperado
- Validación en **tiempo real** de todos los campos.  
- Campos válidos en **verde**, inválidos en **rojo**.  
- Al enviar el formulario, se valida todo nuevamente.  
- Si los datos son correctos, se muestra un mensaje de éxito y el formulario se limpia.
