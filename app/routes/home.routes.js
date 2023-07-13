// Importar el objeto Router de Express y la biblioteca node-fetch
import { Router } from "express";
import fetch from "node-fetch";

// Crear un objeto de enrutamiento de Express
const route = Router();

// Definir la ruta HTTP GET /hombre
route.get('/hombre', async (req, res) => {
    // Definir la ruta de la API REST a la que se hace la solicitud HTTP
    let ruta = process.env.API + 'pro';
    // Configurar la opción de la solicitud HTTP
    let option = {
        method: "GET"
    };
    // Inicializar el objeto de datos
    let datos = {};

    // Realizar la solicitud HTTP y esperar la respuesta
    const response = await fetch(ruta, option);
    // Analizar la respuesta como datos JSON y asignarlos a la variable datos
    const data = await response.json();
    datos = data;

    // Renderizar la vista HTML hombre.ejs, pasando los datos como objeto
    res.render("hombre", {
        "datos": datos
    })
});

// Definir la ruta HTTP GET /mujer
route.get('/mujer', async (req, res) => {
    // Definir la ruta de la API REST a la que se hace la solicitud HTTP
    let ruta = process.env.API + 'pro';
    // Configurar la opción de la solicitud HTTP
    let option = {
        method: "GET"
    };
    // Inicializar el objeto de datos
    let datos = {};

    // Realizar la solicitud HTTP y esperar la respuesta
    const response = await fetch(ruta, option);
    // Analizar la respuesta como datos JSON y asignarlos a la variable datos
    const data = await response.json();
    datos = data;

    // Renderizar la vista HTML mujer.ejs, pasando los datos como objeto
    res.render("mujer", {
        "datos": datos
    })
});

// Definir la ruta HTTP GET /nino
route.get('/nino', async (req, res) => {
    // Definir la ruta de la API REST a la que se hace la solicitud HTTP
    let ruta = process.env.API + 'pro';
    // Configurar la opción de la solicitud HTTP
    let option = {
        method: "GET"
    };
    // Inicializar el objeto de datos
    let datos = {};

    // Realizar la solicitud HTTP y esperar la respuesta
    const response = await fetch(ruta, option);
    // Analizar la respuesta como datos JSON y asignarlos a la variable datos
    const data = await response.json();
    datos = data;

    // Renderizar la vista HTML nino.ejs, pasando los datos como objeto
    res.render("nino", {
        "datos": datos
    })
});

// Definir la ruta HTTP GET /nina
route.get('/nina', async (req, res) => {
    // Definir la ruta de la API REST a la que se hace la solicitud HTTP
    let ruta = process.env.API + 'pro';
    // Configurar la opción de la solicitud HTTP
    let option = {
        method: "GET"
    };
    // Inicializar el objeto de datos
    let datos = {};

    // Realizar la solicitud HTTP y esperar la respuesta
    const response = await fetch(ruta, option);
    // Analizar la respuesta como datos JSON y asignarlos a la variable datos
    const data = await response.json();
    datos = data;

    // Iterar sobre los objetos ropa en los datos
    datos.forEach((ropa) => {
        ropa.enlace
    })

    // Renderizar la vista HTML nina.ejs, pasando los datos como objeto
    res.render("nina", {
        "datos": datos
    })
});

// Definir la ruta HTTP GET /
route.get('/', async (req, res) => {
    // Definir la ruta de la API REST a la que se hace la solicitud HTTP
    let ruta = process.env.API + 'pro';
    // Configurar la opción de la solicitud HTTP
    let option = {
        method: "GET"
    };
    // Inicializar el objeto de datos
    let datos = {};

    // Realizar la solicitud HTTP y esperar la respuesta
    const response = await fetch(ruta, option);
    // Analizar la respuesta como datos JSON y asignarlos a la variable datos
    const data = await response.json();
    datos = data;

    // Renderizar la vista HTML index.ejs, pasando los datos como objeto
    res.render("index", {
        "datos": datos
    })
});

// Definir la ruta HTTP GET /login
route.get('/login', (req, res) => {
    // Renderizar la vista HTML login.ejs
    res.render("login")
});

// Exportar el objeto de enrutamiento de Express por defecto
export default route;