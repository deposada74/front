// Obtener el modal y el botón para abrirlo
var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");

// Obtener el elemento span que cierra el modal
var span = document.getElementsByClassName("close")[0];

// Cuando el usuario haga clic en el botón, abrir el modal
btn.onclick = function () {
    modal.style.display = "block";
}

// Cuando el usuario haga clic en la 'x', cerrar el modal
span.onclick = function () {
    modal.style.display = "none";
}

// Cuando el usuario haga clic fuera del modal, cerrarlo
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('#navbar');
