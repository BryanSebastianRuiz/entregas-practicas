document.addEventListener("DOMContentLoaded", () => {
    cargarProductos();
});

let carrito = [];

function cargarProductos() {
    fetch("https://fakestoreapi.com/products")
        .then(response => response.json())
        .then(productos => mostrarProductos(productos))
        .catch(error => console.error("Error al cargar productos:", error));
}

function mostrarProductos(productos) {
    const listaProductos = document.getElementById("lista-productos");
    listaProductos.innerHTML = "";

    productos.forEach((producto) => {
        const productoElemento = document.createElement("div");
        productoElemento.innerHTML = `
            <p><strong>${producto.title}</strong> - $${producto.price}</p>
            <img src="${producto.image}" alt="${producto.title}" width="100">
            <button class="agregar" data-id="${producto.id}" data-precio="${producto.price}" data-nombre="${producto.title}">Agregar</button>
        `;
        listaProductos.appendChild(productoElemento);
    });

    document.querySelectorAll(".agregar").forEach(boton => {
        boton.addEventListener("click", (event) => {
            const id = event.target.dataset.id;
            const nombre = event.target.dataset.nombre;
            const precio = parseFloat(event.target.dataset.precio);
            agregarAlCarrito(id, nombre, precio);
        });
    });
}

function agregarAlCarrito(id, nombre, precio) {
    let productoEnCarrito = carrito.find(p => p.id === id);
    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
        productoEnCarrito.total += precio;
    } else {
        carrito.push({ id, nombre, cantidad: 1, precio, total: precio });
    }
    mostrarCarrito();
}

function mostrarCarrito() {
    const listaCarrito = document.getElementById("lista-carrito");
    const totalCarrito = document.getElementById("total-carrito");
    listaCarrito.innerHTML = "";
    let total = 0;

    carrito.forEach((producto, index) => {
        total += producto.total;
        const itemCarrito = document.createElement("div");
        itemCarrito.innerHTML = `
            <p><strong>${producto.nombre}</strong> - ${producto.cantidad} x $${producto.precio} = $${producto.total}</p>
            <button class="eliminar" data-index="${index}">🗑️ Eliminar</button>
        `;
        listaCarrito.appendChild(itemCarrito);
    });
    totalCarrito.innerText = `Total: $${total.toFixed(2)}`;

    document.querySelectorAll(".eliminar").forEach(boton => {
        boton.addEventListener("click", (event) => {
            const index = event.target.dataset.index;
            eliminarDelCarrito(index);
        });
    });
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    mostrarCarrito();
}

document.getElementById("pagar").addEventListener("click", () => {
    const mensajeCompra = document.getElementById("mensaje-compra");
    if (carrito.length === 0) {
        mensajeCompra.innerHTML = `<span style="color: red;">El carrito está vacío</span>`;
        return;
    }
    mensajeCompra.innerHTML = "Compra realizada con éxito. ¡Gracias por su compra!";
    carrito = [];
    mostrarCarrito();
});