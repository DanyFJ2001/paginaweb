
        const validarEmail = (email) => {
            let regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regexEmail.test(email);
        }

        const validarPassword = (password) => {
            let regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
            return regexPassword.test(password);
        }

        const mostrarErrores = (errores) => {
            let mensaje = "";
            for (let i = 0; i < errores.length; i++) {
                mensaje += "*" + errores[i] + "\n";
            }
            alert(mensaje);
        }

        const validarFormulario = () => {
            let nombre = document.querySelector('#nombre').value.trim();
            let email = document.querySelector('#email').value.trim();
            let mensaje = document.querySelector('#mensaje').value.trim();

            let errores = [];

            if (nombre === "") {
                errores.push("El nombre es obligatorio");
            }

            if (email === "" || !validarEmail(email)) {
                errores.push("El email no es válido");
            }

            if (mensaje === "") {
                errores.push("El mensaje no puede estar vacío");
            }

            if (errores.length > 0) {
                mostrarErrores(errores);
                return false; // Evita que se envíe el formulario si hay errores
            }

            return true; // Envía el formulario si no hay errores
        }
    