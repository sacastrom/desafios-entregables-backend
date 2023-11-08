document.addEventListener("DOMContentLoaded", () => {
  // Obtener todos los botones "Agregar al carrito"
  const addToCartButtons = document.querySelectorAll(".add-to-cart-button");
  let botonCerrarSesion = document.getElementById("cerrarSesion");
  

  botonCerrarSesion.addEventListener("click", async (e) => {
    e.preventDefault();
    console.log("holaaa");
    let response = await fetch("/logout");
    let data = await response.json();
    setTimeout(() => {
      window.location.href = "http://localhost:8080";
    }, 2000);
    console.log(data);
  });

  

  // Agregar un evento de clic a cada botón
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      //const cidString = e.target.id;
      const cidString = button.getAttribute("data-cart-id"); // Valor de pid como cadena de texto
      console.log('Este es el id del carrito', cidString)
      //const cidString = prompt("Ingrese el ID del carrito"); // Valor de cid como cadena de texto
      //const cidString = button.getAttribute("id"); // Valor de pid como cadena de texto
      const pidString = button.getAttribute("data-id"); // Valor de pid como cadena de texto
      console.log('Este es el id del producto', pidString)
      
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

// LOGICA PARA EL BOTON IR AL CARRITO
document.querySelectorAll('.cart-button').forEach(button => {
  button.addEventListener('click', moveToCart);
});

function moveToCart(event) {
  event.preventDefault();

  const cartId = event.target.id;
 
  fetch(`views/cart/${cartId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      // Redirigir al carrito si la respuesta es exitosa
      window.location.href = `views/cart/${cartId}`;
    } else {
      // Manejar errores aquí
      throw new Error('Error al ir al carrito');
    }
  })
  .catch(error => {
    alert(error.message);
  });
}
