async function iniciarSesion(event) {
    event.preventDefault(); // Evita que el formulario se envíe de forma tradicional

    // Obtener los valores de usuario y contraseña
    const user = document.getElementById("user").value;
    const password = document.getElementById("password").value;

    // Crear un objeto de datos para enviar al servidor
    const dataUser = {
      user: user,
      password: password
    };

    try {
        const response = await fetch("/login",{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataUser)
        })
        const data = await response.json()
        /* console.log(data) */
        if (data.status === "OK") {
            setTimeout(() => {
              window.location.href = "/views";
            }, 1000);
          } else {
            alert("Usuario no válido");
          }
    } catch (error) {
      console.log("Error en la solicitud Fetch:", error);
    }
  }

  document.getElementById("login-form").addEventListener("submit", iniciarSesion);