const socket = io();
socket.emit("connection", "Nuevo cliente conectado");

// Escucha el evento "nuevoProducto" emitido por el servidor
socket.on("nuevoProducto", (producto) => {
    console.log("Nuevo producto recibido:", producto);
  // Agrega el nuevo producto a la lista existente de productos en el lado del cliente
  addProductToList(producto);
});



function addProductToList(producto) {
  // Crea un nuevo elemento de lista (<li>) para representar el producto
  const newProductElement = document.createElement("li");
  newProductElement.setAttribute("data-product-id", producto.id);
  
  // Construye el contenido del nuevo producto utilizando los datos del objeto 'producto'
  newProductElement.innerHTML = `
      <div class="product-image">
        <img src="${producto.thumbnail}" alt="${producto.title}" />
      </div>
      <div class="product-details">
        <h2>${producto.title}</h2>
        <p>${producto.description}</p>
        <p>Precio: $${producto.price}</p>
        <p>Código: ${producto.code}</p>
        <p>Stock: ${producto.stock}</p>
        <p>Categoría: ${producto.category}</p>
        <p>ID: ${producto.id}</p>
        <p>Estado: ${producto.status ? "Activo" : "Inactivo"}</p>
        <button class="delete-button" data-id="${producto.id}">Eliminar</button>
      </div>
    `;

   /*  // Agrega el evento click al botón "Eliminar" del nuevo producto
  newProductElement.querySelector(".delete-button").addEventListener("click", () => {
    socket.emit("eliminarProducto", producto.id);
  }); */

  // Agrega el nuevo elemento de producto a la lista existente
  const productContainer = document.querySelector(".product-list");
  productContainer.appendChild(newProductElement);

   
}



// Capturar el evento submit del formulario
document.getElementById("productForm").addEventListener("submit", (event) => {
  event.preventDefault(); // Evitar el envío por defecto del formulario

  // Obtener los datos del formulario
  const formData = new FormData(event.target);
  const formDataObj = Object.fromEntries(formData.entries());
  console.log(formDataObj);
  // Enviar los datos al servidor utilizando fetch
  fetch("/realTime", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formDataObj),
  })
    .then((response) => response.json())
    .then((producto) => {
      console.log("Datos guardados en el servidor:", producto);
    })
    .catch((error) => {
      console.error("Error al enviar los datos al servidor:", error);
    });
});

// Escuchar el evento de clic en el botón "Eliminar"
document.addEventListener("click", async (event) => {
    if (event.target.classList.contains("delete-button")) {
      const productId = event.target.getAttribute("data-id");
      console.log(productId)
  
      try {
        // Enviar una solicitud DELETE al servidor para eliminar el producto
        const response = await fetch(`/realTime/${productId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log(response)
  
        if (response.ok) {
          // Si la eliminación fue exitosa, eliminar el producto del DOM
          const productElement = event.target.closest("li");
          console.log(productElement)
          productElement.remove();
        } else {
          // Si hubo un error en la eliminación, mostrar un mensaje de error
          console.error("Error al eliminar el producto.");
        }
      } catch (error) {
        console.error("Error al enviar la solicitud al servidor:", error);
      }
    }
  });
  
