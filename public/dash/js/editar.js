// Función para abrir el modal de edición al hacer clic en el botón de edición
var editButtons = document.querySelectorAll('.btn-edit');
editButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        var productId = this.getAttribute('data-id');
        var productName = this.getAttribute('data-name');
        var productDesc = this.getAttribute('data-desc');
        var productPrice = this.getAttribute('data-price');
        var productLink = this.getAttribute('data-link');
        var productSize = this.getAttribute('data-size');
        var productCategory = this.getAttribute('data-category');

        // Llenar los campos del formulario en el modal con los valores del producto
        document.getElementById('nombre').value = productName;
        document.getElementById('descripcion').value = productDesc;
        document.getElementById('precio').value = productPrice;
        document.getElementById('enlace').value = productLink;
        document.getElementById('talla').value = productSize;
        document.getElementById('categoria').value = productCategory;

        // Almacenar el ID del producto en un atributo personalizado en el modal
        document.getElementById('updateModal').setAttribute('data-product-id', productId);

        // Abrir el modal
        $('#updateModal').modal('show');
    });
});

// Función para enviar el formulario
document.getElementById('updateSubmit').addEventListener('click', function (e) {
    e.preventDefault(); // Evitar que el formulario se envíe de forma predeterminada

    var modal = document.getElementById('updateModal');
    var productId = modal.getAttribute('data-product-id');
    var nombre = document.getElementById('nombre').value;
    var descripcion = document.getElementById('descripcion').value;
    var precio = document.getElementById('precio').value;
    var enlace = document.getElementById('enlace').value;
    var talla = document.getElementById('talla').value;
    var categoria = document.getElementById('categoria').value;

    // Verificar si los campos están vacíos
    if (nombre.trim() === '' || descripcion.trim() === '' || precio.trim() === '' || enlace.trim() === '' || talla.trim() === '' || categoria.trim() === '') {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Debes llenar todos los campos'
        });
        return;
    }

    // Realizar la solicitud PUT con los datos del formulario
    var url = 'http://localhost:3000/api/pro/' + productId;
    var data = {
        name: nombre,
        desc: descripcion,
        price: precio,
        link: enlace,
        size: talla,
        category: categoria
    };

    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(function (response) {
            if (response.ok) {
                // Actualizar la vista de los productos u otra acción necesaria
                Swal.fire({
                    icon: 'success',
                    title: 'Actualizado!',
                    text: 'El producto a sido actualizado correctamente'
                });
                $('#updateModal').modal('hide');
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Fallo!',
                    text: 'Hubo un error al actualizar'
                });
            }
        })
        .catch(function (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Fallo!',
                text: 'Hubo un error al actualizar'
            });
        });
});
