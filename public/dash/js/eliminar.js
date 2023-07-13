const deleteButtons = document.querySelectorAll('.btn-delete');

deleteButtons.forEach(button => {
    button.addEventListener('click', async (event) => {
        event.preventDefault();

        const id = button.dataset.id;

        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esto eliminará permanentemente el producto.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                const url = `http://localhost:3000/api/pro/${id}`;

                try {
                    const response = await fetch(url, { method: 'DELETE' });

                    if (response.ok) {
                        Swal.fire({
                            title: 'Eliminado',
                            text: 'El producto ha sido eliminado.',
                            icon: 'success',
                        }).then(() => {
                            // Recargar la página para ver los cambios
                            location.reload();
                        });
                    } else {
                        Swal.fire({
                            title: 'Error',
                            text: 'Error al eliminar el producto.',
                            icon: 'error',
                        });
                    }
                } catch (error) {
                    console.error('Error al realizar la solicitud de eliminación', error);
                    Swal.fire({
                        title: 'Error',
                        text: 'Error al eliminar el producto.',
                        icon: 'error',
                    });
                }
            }
        });
    });
});