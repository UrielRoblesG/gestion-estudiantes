# Ejercicio: Validación de Body y Roles con Express-validator

## Objetivo

Aprender a:

- Usar **express-validator** con **Schema Validation**.  
- Validar campos de un **payload JSON** en una ruta POST.  
- Restringir acciones según el **rol del usuario** que envía la solicitud (basado en headers).

---

## 1. Estructura del proyecto

Crea la siguiente estructura:

``` kotlin
proyecto/
├─ server.js
└─ routes/
   └─ auth.routes.js

```

Instala las dependencias:

```bash
npm install express express-validator
```

---

## 2. Ruta `/api/autenticacion/registro`

La ruta recibirá un **POST** con este JSON en el body:

```json
{
  "email": "usuario@correo.com",
  "password": "12345678",
  "nombre": "Nombre Usuario",
  "rol": "administrador" 
}
```

Roles posibles: `"administrador"`, `"coordinador"`, `"alumno"`.

---

## 3. Validación del body con express-validator

Crea `middlewares/validarRegistro.js`:

- `email`: obligatorio, email válido.  
- `password`: obligatorio, mínimo 8 caracteres.  
- `nombre`: obligatorio.  
- `rol`: obligatorio, debe ser uno de los roles válidos.

---

## 4. Integración en la ruta

```js
import express from 'express';
import { registroDTO } from '../middlewares/validarRegistro.js';
import { validationResult } from 'express-validator';
import { validarRoles } from '../middlewares/validarRoles.js';

const router = express.Router();

router.post('/api/registro', registroDTO, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  res.json({ message: 'Usuario registrado correctamente', data: req.body });
});

export default router;
```

---
