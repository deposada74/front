import { dash } from "../controllers/dash.controller.js";
import { Router } from "express";
import dotenv from "dotenv";

dotenv.config();

const router = Router();

// Ruta para la página de inicio
router.get('/inicio', dash.tablas);

// Ruta para cerrar sesión
router.get('/exit', dash.salir);

// Ruta para generar un reporte PDF
router.get('/pdf', dash.pdf);

// Ruta para generar un reporte Excel
router.get('/excel', dash.excel);

// Ruta para crear un producto
router.post('/create', dash.create);

export default router;
