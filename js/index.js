const productos = [];

const agregarProducto = async (id, producto, precio) => {
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
        const result = await response.json();
        console.log("Exitoso:", result);
    } catch (error) {
        console.error("Error:", error);
    }
}

const actualizarTabla = () => {
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
};

const eliminarProducto = async (id) => {
    let indice = productos.findIndex(p => p.id === id);
    if (indice !== -1) {
        productos.splice(indice, 1); 
        await deleteJson(id);
        actualizarTabla();
    }
};

async function deleteJson(id) {
    try {
        const response = await fetch(`http://localhost:3000/productos/${id}`, {
            method: "DELETE",
        });
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

