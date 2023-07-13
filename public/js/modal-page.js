// Obtener el modal
var modal = document.getElementById("modal");

// Obtener el enlace que abre el modal
var modalLink = document.getElementById("modal-link");

// Obtener el elemento span que cierra el modal
var closeSpan = document.getElementsByClassName("close")[0];

// Función para mostrar el modal
function showModal() {
  modal.style.display = "block";
}

// Función para ocultar el modal
function hideModal() {
  modal.style.display = "none";
}

// Asignar eventos de clic para mostrar u ocultar el modal
modalLink.addEventListener("click", showModal);
closeSpan.addEventListener("click", hideModal);
window.addEventListener("click", function(event) {
  if (event.target == modal) {
    hideModal();
  }
});
