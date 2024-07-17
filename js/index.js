const productos = [];

const agregarProducto = (id, producto, precio) => {
    try {
        let indice = productos.findIndex(p => p.id === id);
        if (indice !== -1) {
            productos[indice].cantidad++;
        } else {
            let nuevoProducto = {
                id: id,
                producto: producto,
                precio: precio,
                cantidad: 1,
            };
            productos.push(nuevoProducto);
        }
        actualizarTabla();
        mostrarCarrito();
    } catch (error) {
        console.error("Error al agregar producto:", error);
    }
};

const actualizarTabla = () => {
    try {
        let tbody = document.getElementById('tbody');
        let total = 0;
        tbody.innerHTML = "";
        productos.forEach(item => {
            let fila = tbody.insertRow();
            let celdaProducto = fila.insertCell(0);
            let celdaCantidad = fila.insertCell(1);
            let celdaPrecio = fila.insertCell(2);
            let celdaTotal = fila.insertCell(3);
            let celdaBoton = fila.insertCell(4);

            celdaProducto.textContent = item.producto;
            celdaCantidad.textContent = item.cantidad;
            celdaPrecio.textContent = item.precio;
            celdaTotal.textContent = item.precio * item.cantidad;

            let boton = document.createElement('button');
            boton.textContent = 'Borrar';
            boton.addEventListener("click", () => {
                eliminarProducto(item.id);
            });
            celdaBoton.appendChild(boton);

            total += item.precio * item.cantidad;
        });

        document.getElementById('total').textContent = total.toFixed(2);
    } catch (error) {
        console.error("Error al actualizar tabla:", error);
    }
};

const eliminarProducto = (id) => {
    try {
        let indice = productos.findIndex(p => p.id === id);
        if (indice !== -1) {
            productos.splice(indice, 1);
            actualizarTabla();
        }
    } catch (error) {
        console.error("Error al eliminar producto:", error);
    }
};

const mostrarCarrito = () => {
    document.getElementById('carrito').classList.add('active');
};

const ocultarCarrito = () => {
    document.getElementById('carrito').classList.remove('active');
};

document.getElementById('carrito-btn').addEventListener('click', mostrarCarrito);

document.querySelector('.compra').addEventListener('click', function() {
    alert('¡Gracias por su compra! 😊');
    

});
document.querySelector('.cerrar-carrito').addEventListener('click', function() {
    document.getElementById('carrito').style.display = 'none';
    location.reload(); // Recargar la página
});

