

document.addEventListener('DOMContentLoaded', () => {
    const inputEmail = document.getElementById('inputEmail');
    const inputPassword = document.getElementById('inputPassword');
    const formLogin = document.getElementById('formLogin');


    inputEmail.addEventListener('input', () => {
        if (inputEmail.validity.valid) {
            inputEmail.classList.remove('is-invalid');
            inputEmail.classList.add('is-valid');
        } else {
            inputEmail.classList.remove('is-valid');
            inputEmail.classList.add('is-invalid');
        }
    });
    
    inputPassword.addEventListener('input', () => {
        if (inputPassword.validity.valid) {
            inputPassword.classList.remove('is-invalid');
            inputPassword.classList.add('is-valid');
        } else {
            inputPassword.classList.remove('is-valid');
            inputPassword.classList.add('is-invalid');
        }
    });

    formLogin.addEventListener('submit', async (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (!formLogin.checkValidity()) {
            formLogin.classList.add('was-validated');
            return;
        }

        const loginData = {
            email : inputEmail.value,
            password : inputPassword.value
        };

        console.log(loginData);

        try {
            const respuesta = await fetch('/api/autenticacion/login',{
                method: 'POST',
                body: JSON.stringify(loginData),
                headers: {
                    "Content-Type": 'application/json'
                }
            });

            console.log(respuesta);
            if (!respuesta.ok) throw new Error('Error en el login', );

            const decodedData = await respuesta.json();

            // Guardar token en localstorage (no recomendado)
            location.href = decodedData.data.view;

        } catch (error) {
            alert('Ocurrio un error al iniciar sesion');   
        }
    });   
});