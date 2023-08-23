document.addEventListener("DOMContentLoaded", () => {
    // Obtener todos los botones "Agregar al carrito"
    const addToCartButtons = document.querySelectorAll(".add-to-cart-button");
  
    // Agregar un evento de clic a cada botón
    addToCartButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const cidString = prompt("Ingrese el ID del carrito"); // Valor de cid como cadena de texto
        const pidString = button.getAttribute("data-id"); // Valor de pid como cadena de texto
  
        // Realizar la solicitud POST para agregar el producto al carrito
        fetch(`/api/carts/${cidString}/product/${pidString}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          //body: JSON.stringify(producto),
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("Error al agregar el producto al carrito.");
            }
          })
          .then((data) => {
            console.log(data); // Imprimir la respuesta del servidor si es exitosa
          })
          .catch((error) => {
            console.error(error); // Manejar el error si la solicitud no es exitosa
          });
      });
    });
  });