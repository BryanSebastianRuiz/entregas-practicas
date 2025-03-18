const productos = [
    { nombre: "Camiseta", precio: 15, stock: 10 },
    { nombre: "Pantalón", precio: 20, stock: 17 },
    { nombre: "Zapatos", precio: 50, stock: 5 },
    { nombre: "Vestido", precio: 25, stock: 8 },
    { nombre: "Sudadera", precio: 30, stock: 20 }
];

let carrito = [];

function mostrarProductos() {
    const listaProductos = document.getElementById("lista-productos");
    listaProductos.innerHTML = "";

    productos.forEach((producto, index) => {
        const productoElemento = document.createElement("div");
        productoElemento.innerHTML = `
            <p><strong>${producto.nombre}</strong> - $${producto.precio} (Stock: ${producto.stock})</p>
            <button class="agregar" data-index="${index}">Agregar</button>
        `;
        listaProductos.appendChild(productoElemento);
    });

    document.querySelectorAll(".agregar").forEach(boton => {
        boton.addEventListener("click", (event) => {
            const index = event.target.dataset.index;
            agregarAlCarrito(productos[index].nombre, 1);
        });
    });
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
            <button class="restar" data-index="${index}">➖</button>
            <button class="sumar" data-index="${index}">➕</button>
            <button class="eliminar" data-index="${index}">🗑️ Eliminar</button>
        `;
        listaCarrito.appendChild(itemCarrito);
    });

    totalCarrito.innerText = `Total: $${total.toFixed(2)}`;

    document.querySelectorAll(".sumar").forEach(boton => {
        boton.addEventListener("click", (event) => {
            const index = event.target.dataset.index;
            modificarCantidad(index, 1);
        });
    });

    document.querySelectorAll(".restar").forEach(boton => {
        boton.addEventListener("click", (event) => {
            const index = event.target.dataset.index;
            modificarCantidad(index, -1);
        });
    });

    document.querySelectorAll(".eliminar").forEach(boton => {
        boton.addEventListener("click", (event) => {
            const index = event.target.dataset.index;
            eliminarDelCarrito(index);
        });
    });
}

function agregarAlCarrito(productoNombre, cantidad) {
    const producto = productos.find(p => p.nombre === productoNombre);
    
    if (!producto || producto.stock < cantidad) {
        alert(`No hay suficiente stock de "${productoNombre}".`);
        return;
    }
    
    let productoEnCarrito = carrito.find(p => p.nombre === productoNombre);
    
    if (productoEnCarrito) {
        productoEnCarrito.cantidad += cantidad;
        productoEnCarrito.total += producto.precio * cantidad;
    } else {
        carrito.push({
            nombre: producto.nombre,
            cantidad: cantidad,
            precio: producto.precio,
            total: producto.precio * cantidad
        });
    }
    
    producto.stock -= cantidad;
    
    mostrarProductos();
    mostrarCarrito();
}

function modificarCantidad(index, cambio) {
    let producto = carrito[index];
    let productoInventario = productos.find(p => p.nombre === producto.nombre);

    if (cambio === 1 && productoInventario.stock > 0) {
        producto.cantidad += 1;
        producto.total += producto.precio;
        productoInventario.stock -= 1;
    } else if (cambio === -1 && producto.cantidad > 1) {
        producto.cantidad -= 1;
        producto.total -= producto.precio;
        productoInventario.stock += 1;
    } else if (cambio === -1 && producto.cantidad === 1) {
        eliminarDelCarrito(index);
        return;
    }

    mostrarProductos();
    mostrarCarrito();
}

function eliminarDelCarrito(index) {
    const producto = carrito[index];
    
    productos.find(p => p.nombre === producto.nombre).stock += producto.cantidad;
    
    carrito.splice(index, 1);
    
    mostrarProductos();
    mostrarCarrito();
}

function procesarCompra() {
    const mensajeCompra = document.getElementById("mensaje-compra");

    if (carrito.length === 0) {
        mensajeCompra.innerHTML = `<span style="color: red;">El carrito está vacío</span>`;
        return;
    }
    
    let total = carrito.reduce((acc, item) => acc + item.total, 0);
    let descuentoAplicado = total > 100 ? total * 0.1 : 0;
    let totalFinal = total - descuentoAplicado;
    let contador = 3;
    
    function cuentaRegresiva() {
        if (contador === 0) {
            let mensajeFinal = `Compra confirmada y realizada con éxito<br>`;
            
            if (descuentoAplicado > 0) {
                mensajeFinal += `<strong>Descuento aplicado: $${descuentoAplicado.toFixed(2)}</strong><br>`;
            }
            
            mensajeFinal += `<strong>Total a pagar: $${totalFinal.toFixed(2)}</strong>`;
            mensajeCompra.innerHTML = mensajeFinal;
            
            setTimeout(() => {
                mensajeCompra.innerHTML += `<br>¡Gracias por su compra!`;
            }, 2000);
            
            setTimeout(() => {
                carrito = [];
                mostrarCarrito();
            }, 2500);
            
            return;
        }
        
        mensajeCompra.innerHTML = `Confirmando compra en <strong>${contador}</strong>`;
        contador--;
        
        setTimeout(cuentaRegresiva, 1000);
    }
    
    cuentaRegresiva();
}

document.addEventListener("DOMContentLoaded", () => {
    const botonProcesar = document.getElementById("pagar");
    if (botonProcesar) {
        botonProcesar.addEventListener("click", procesarCompra);
    }
    mostrarProductos();
});
