async function signupForm(event) {
    event.preventDefault(); // Evita que el formulario se envíe de forma tradicional

    // Obtener los valores de usuario y contraseña
    const name = document.getElementById("name").value;
    const last_name = document.getElementById("last_name").value;
    const mail = document.getElementById("mail").value;
    const user = document.getElementById("user").value;
    const password = document.getElementById("password").value;

    // Crear un objeto de datos para enviar al servidor
    const data = {
      name: name,
      last_name: last_name,
      mail: mail,
      user: user,
      password: password
    };

    try {
      // Realizar la solicitud Fetch al servidor
      const response = await fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        // La solicitud fue exitosa
        console.log("Usuario registrado correctamente");
        // Realizar acciones adicionales, como redireccionar a otra página
      } else {
        // Hubo un error en la solicitud
        console.log("Error al registrar el usuario");
      }
    } catch (error) {
      console.log("Error en la solicitud Fetch:", error);
    }
  }

  document.getElementById("signupForm").addEventListener("submit", signupForm);