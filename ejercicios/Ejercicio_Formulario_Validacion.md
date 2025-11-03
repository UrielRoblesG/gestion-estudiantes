# 🧩 Ejercicio: Validación en tiempo real de un formulario de login

## 🎯 Objetivo  

Crear un formulario de inicio de sesión que valide los campos de **correo electrónico** y **contraseña** en tiempo real, mostrando retroalimentación visual según si los datos son válidos o no.

---

## 🧠 Instrucciones

1. **Analiza el formulario``login.html``.**  

2. **Analiza las clases de Bootstrap** .  
   - Las clases `form-control`, `is-valid` e `is-invalid` son para para mostrar estilos visuales de validación.
   - Asegúrate de que el formulario tenga la clase `needs-validation` y el atributo `novalidate` para desactivar la validación por defecto del navegador.

3. **Obtén los elementos del formulario desde JavaScript.**  
   - Usa `document.getElementById` para guardar en variables:
     - El formulario (`form`)
     - El campo de correo (`emailInput`)
     - El campo de contraseña (`passwordInput`)

4. **Agrega validación en tiempo real para el campo de correo electrónico.**  
   - Escucha el evento `"input"` en `emailInput`.
   - Si el valor es válido (`emailInput.validity.valid`):
     - Agrega la clase `"is-valid"`.
     - Quita la clase `"is-invalid"`.
   - En caso contrario:
     - Quita `"is-valid"` y agrega `"is-invalid"`.

5. **Agrega validación en tiempo real para la contraseña.**  
   - Escucha el evento `"input"` en `passwordInput`.
   - Si la contraseña tiene **6 o más caracteres**, márcala como válida.
   - Si tiene menos de 6, márcala como inválida.

6. **Controla el envío del formulario.**  
   - Escucha el evento `"submit"` del formulario.
   - Usa `event.preventDefault()` para evitar el envío automático.
   - Verifica si el formulario es válido con `form.checkValidity()`.
     - Si **no** es válido, agrega la clase `"was-validated"` al formulario.
     - Si **sí** es válido:
       - Muestra una alerta que diga `"Formulario válido. ¡Enviando datos!"`.
       - Limpia el formulario con `form.reset()`.
       - Quita las clases `"was-validated"` y `"is-valid"` de los campos.

---

## 💡 Resultado esperado  

Al escribir en los campos:

- El borde del **correo** se pondrá verde si el formato es válido, o rojo si no lo es.  
- El borde de la **contraseña** se pondrá verde si tiene al menos 6 caracteres, o rojo si no.  
- Al intentar enviar, el formulario validará todos los campos y mostrará un mensaje si los datos son correctos.
