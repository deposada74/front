import { Router } from "express"; // Importar la clase Router de Express para crear un enrutador
import jwt from "jsonwebtoken"; // Importar la biblioteca JWT para trabajar con tokens de autenticación
import dotenv from "dotenv"; // Importar dotenv para cargar las variables de entorno
dotenv.config(); // Cargar las variables de entorno desde el archivo .env

const loginRouter = Router(); // Crear una instancia de Router
loginRouter.get("/google", (req, res)=> {
    // Ruta GET "/google"
    // Esta ruta maneja la solicitud GET a "/google"

    const id = req.user.id;
    const name = req.user.displayName;
    const email = req.user.emails[0].value;
    const foto = req.user.photos[0].value;

    const payload = {
        nombre: name,
        correo: email,
        foto: foto
    };

    const token = jwt.sign(
        payload, 
        process.env.SECRET_KEY,
        {
            "expiresIn":process.env.EXPIRE_TOKEN
        });
    // Generar un token de autenticación utilizando el objeto payload, la clave secreta almacenada en las variables de entorno
    // y una configuración opcional que incluye el tiempo de expiración del token

    res.cookie("nous", token);
    // Configurar una cookie llamada "nous" en la respuesta y asignarle el valor del token generado

    res.redirect("/dash/inicio");
    // Redireccionar al usuario a la ruta "/dash/inicio"
});

export { loginRouter };
// Exportar el enrutador para que pueda ser utilizado por otros módulos
