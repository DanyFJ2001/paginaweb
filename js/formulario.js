const productos = [];

const agregarProducto = async (id, producto, precio) => {
    try {
        let indice = productos.findIndex(p => p.id === id);
        if (indice !== -1) {
            productos[indice].cantidad++;
            await putJson(productos[indice]);
        } else {
            let nuevoProducto = {
                id: id,
                producto: producto,
                precio: precio,
                cantidad: 1,
            };
            await postJson(nuevoProducto);
            productos.push(nuevoProducto); 
        }
        actualizarTabla();
        mostrarCarrito();
    } catch (error) {
        console.error("Error al agregar producto:", error);
    }
};

async function putJson(data) {
    try {
        const response = await fetch(`http://localhost:3000/productos/${data.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error('Error al actualizar producto en el servidor');
        }
        const result = await response.json();
        console.log("Exitoso:", result);
    } catch (error) {
        console.error("Error:", error);
    }
}

async function postJson(data) {
    try {
        const response = await fetch(`http://localhost:3000/productos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error('Error al agregar producto en el servidor');
        }
        const result = await response.json();
        console.log("Exitoso:", result);
    } catch (error) {
        console.error("Error:", error);
    }
}

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

        document.getElementById('total').textContent = total;
    } catch (error) {
        console.error("Error al actualizar tabla:", error);
    }
};

const eliminarProducto = async (id) => {
    try {
        let indice = productos.findIndex(p => p.id === id);
        if (indice !== -1) {
            productos.splice(indice, 1); 
            await deleteJson(id);
            actualizarTabla();
        }
    } catch (error) {
        console.error("Error al eliminar producto:", error);
    }
};

async function deleteJson(id) {
    try {
        const response = await fetch(`http://localhost:3000/productos/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error('Error al eliminar producto en el servidor');
        }
        const result = await response.json();
        console.log("Exitoso:", result);
    } catch (error) {
        console.error("Error:", error);
    }
}

const mostrarCarrito = () => {
    document.getElementById('carrito').classList.add('active');
};

const ocultarCarrito = () => {
    document.getElementById('carrito').classList.remove('active');
};

document.getElementById('carrito-btn').addEventListener('click', mostrarCarrito);

// Manejo del botón de compra
document.getElementById('comprar-btn').addEventListener('click', (event) => {
    event.preventDefault(); // Evita que el formulario se envíe y la página se recargue
    // Aquí puedes obtener los datos del producto a agregar y llamar a la función agregarProducto
    // por ejemplo:
    let id = 'producto_id'; // Reemplaza con el ID real del producto
    let producto = 'Nombre del producto'; // Reemplaza con el nombre real del producto
    let precio = 100; // Reemplaza con el precio real del producto
    agregarProducto(id, producto, precio);
});
