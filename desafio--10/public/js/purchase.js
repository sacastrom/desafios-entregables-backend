const cart = document.querySelector("h1").id;
const email = document.querySelector("h1").className;

let formComprar = document.getElementsByClassName("buy-button");

const totalProducts = [];

document.querySelectorAll(".buy-button").forEach((button) => {
  button.addEventListener("click", moveToCart);
});

async function moveToCart(event) {
  event.preventDefault();

  console.log("Estoy haciendo click en comprar");
  console.log(cart, email);
  try {
    const response = await fetch(`/api/carts/${cart}/purchase`, {
      method: "POST",
    });

    // Verificar el código de estado de la respuesta
    if (response.ok) {
      const data = await response.json();
      console.log(data); // Mostrar la respuesta del servidor en la consola

      // Mostrar una notificación de compra exitosa
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Compra exitosa",
        text: data.message,
        showConfirmButton: false,
        timer: 1500,
      });

      // Realizar cualquier otra acción necesaria después de una compra exitosa
    } else {
      const errorData = await response.json();
      console.error(errorData); // Mostrar el mensaje de error en la consola

      // Mostrar una notificación de error de compra
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Error al finalizar la compra",
        text: errorData.error,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  } catch (err) {
    console.error(err); // Mostrar cualquier error en la consola

    // Mostrar una notificación de error de compra
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Error al finalizar la compra",
      text: "Ocurrió un error al procesar la compra",
      showConfirmButton: false,
      timer: 1500,
    });
  }
}

function generateRandomPurchaseCode(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }

  return code;
}
