document.getElementById('create').addEventListener('click', function () {
    // Limpiar los campos del formulario en el modal
    document.getElementById('nombre').value = '';
    document.getElementById('descripcion').value = '';
    document.getElementById('precio').value = '';
    document.getElementById('enlace').value = '';
    document.getElementById('talla').value = '';
    document.getElementById('categoria').value = '';

    // Abrir el modal
    $('#createModal').modal('show');
});
