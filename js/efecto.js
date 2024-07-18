function cambiarColor() {
    var btnEnviar = document.querySelector('.btn-primary');

    btnEnviar.addEventListener('mouseover', function() {
        btnEnviar.style.backgroundColor = '#ccc'; 
        btnEnviar.style.borderColor = '#ff0000'; 
    });

    btnEnviar.addEventListener('mouseout', function() {
        btnEnviar.style.backgroundColor = '#fff'; 
        btnEnviar.style.borderColor = '#007bff'; 
    });
}


