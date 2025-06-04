 // Validaciones
        const form = document.getElementById('subscriptionForm');
        const fields = [
            'nombre', 'email', 'password', 'repeat-password', 'edad',
            'telefono', 'direccion', 'ciudad', 'cp', 'dni'
        ];

        const validators = {
            nombre: value => {
                if (value.trim().length <= 6) return "Debe tener más de 6 letras.";
                if (!/\s/.test(value.trim())) return "Debe contener al menos un espacio entre nombre y apellido.";
                return "";
            },
            email: value => {
                if (!/^[\w\.-]+@[\w\.-]+\.\w{2,}$/.test(value.trim())) return "Ingrese un email válido.";
                return "";
            },
            password: value => {
                if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)) return "Al menos 8 caracteres, letras y números.";
                return "";
            },
            "repeat-password": value => {
                const pass = document.getElementById('password').value;
                if (value !== pass) return "Las contraseñas no coinciden.";
                return "";
            },
            edad: value => {
                if (!/^\d+$/.test(value) || parseInt(value) < 18) return "Debe ser un número entero mayor o igual a 18.";
                return "";
            },
            telefono: value => {
                if (!/^\d{7,}$/.test(value)) return "Debe tener al menos 7 dígitos, solo números.";
                return "";
            },
            direccion: value => {
                if (value.trim().length < 5) return "Debe tener al menos 5 caracteres.";
                if (!/[A-Za-z]/.test(value) || !/\d/.test(value)) return "Debe contener letras y números.";
                if (!/\s/.test(value.trim())) return "Debe contener un espacio en el medio.";
                return "";
            },
            ciudad: value => {
                if (value.trim().length < 3) return "Debe tener al menos 3 caracteres.";
                return "";
            },
            cp: value => {
                if (value.trim().length < 3) return "Debe tener al menos 3 caracteres.";
                return "";
            },
            dni: value => {
                if (!/^\d{7,8}$/.test(value)) return "Debe ser un número de 7 u 8 dígitos.";
                return "";
            }
        };

        fields.forEach(field => {
            const input = document.getElementById(field);
            const errorDiv = document.getElementById('error-' + field);

            input.addEventListener('blur', () => {
                const error = validators[field](input.value);
                errorDiv.textContent = error;
            });

            input.addEventListener('focus', () => {
                errorDiv.textContent = "";
            });
        });

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            let hasError = false;
            let messages = [];
            let data = {};

            fields.forEach(field => {
                const input = document.getElementById(field);
                const errorDiv = document.getElementById('error-' + field);
                const error = validators[field](input.value);
                errorDiv.textContent = error;
                data[field] = input.value;
                if (error) {
                    hasError = true;
                    messages.push(`${field.charAt(0).toUpperCase() + field.slice(1)}: ${error}`);
                }
            });

            if (hasError) {
                alert("Errores en el formulario:\n\n" + messages.join('\n'));
            } else {
                let resumen = `
Nombre completo: ${data.nombre}
Email: ${data.email}
Edad: ${data.edad}
Teléfono: ${data.telefono}
Dirección: ${data.direccion}
Ciudad: ${data.ciudad}
Código Postal: ${data.cp}
DNI: ${data.dni}
                `;
                alert("¡Formulario enviado correctamente!\n\n" + resumen);
                form.reset();
            }
        });