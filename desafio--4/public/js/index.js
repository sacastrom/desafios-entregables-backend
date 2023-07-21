const socket = io();
socket.emit("connection", "Nuevo cliente conectado");

// Escucha el evento "nuevoProducto" emitido por el servidor
socket.on("nuevoProducto", (producto) => {
    console.log("Nuevo producto recibido:", producto);
  // Agrega el nuevo producto a la lista existente de productos en el lado del cliente
  addProductToList(producto);
});

socket.on("productoEliminado", (productId) => {
    // Eliminar el elemento correspondiente de la lista de productos en el cliente
    const productElement = document.querySelector(`[data-id="${productId}"]`);
    console.log(productElement)
    if (productElement) {
      productElement.remove();
    }
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

  // Agrega el nuevo elemento de producto a la lista existente
  const productContainer = document.querySelector(".product-list");
  productContainer.appendChild(newProductElement);

    // Agrega el evento click al botón "Eliminar" del nuevo producto
    newProductElement.querySelector(".delete-button").addEventListener("click", () => {
        socket.emit("eliminarProducto", producto.id);
      });
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

// Agregar evento click a los botones "Eliminar"
document.querySelectorAll(".delete-button").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.getAttribute("data-id");
      socket.emit("eliminarProducto", productId);
    });
  });
