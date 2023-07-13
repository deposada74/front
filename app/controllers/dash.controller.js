import fetch from "node-fetch";
import axios from "axios";
import jwt from "jsonwebtoken";
import PDFDocument from "pdfkit";
import 'pdfkit-table';
import XLSX from "xlsx";

/**
 * Renderiza la página "tablas" con los datos obtenidos de la API.
 * Si el usuario no tiene una cookie válida, redirige a la página de inicio.
 */
const tablas = async (req, res) => {
    if (req.cookies.nous) {
        try {
            const token = jwt.verify(req.cookies.nous, process.env.SECRET_KEY);
            let ruta = process.env.API + 'pro';
            let option = {
                method: "GET"
            };
            let datos = {};

            const response = await fetch(ruta, option);
            const data = await response.json();

            datos = data;

            res.render("tablas", {
                "datos": datos,
                "menu": 0
            });
        } catch (error) {
            res.redirect("/");
        }
    } else {
        res.redirect("/");
    }
};

/**
 * Cierra la sesión del usuario y redirige a la página de inicio.
 * Elimina la cookie "nous" del cliente.
 */
const salir = async (req, res) => {
    res.clearCookie("nous");
    res.redirect("/");
};

/**
 * Genera un reporte en formato PDF de los productos obtenidos de la API.
 * El reporte incluye una tabla con los datos de los productos.
 * Descarga el reporte como un archivo PDF adjunto en la respuesta HTTP.
 */
export const pdf = async (req, res) => {
    try {
        const products = await getProducts(); // Función para obtener los productos de la API

        // Crear un nuevo documento PDF
        const doc = new PDFDocument();

        // Establecer encabezado
        doc.font("Helvetica-Bold").fontSize(18).text("Reporte de Productos", { align: "center" });
        doc.font("Helvetica-Bold").fontSize(14).text("Generado por NOUS", { align: "center" });

        // Establecer la fecha actual
        const currentDate = new Date().toLocaleDateString();
        doc.fontSize(12).text(`Fecha de creación del reporte: ${currentDate}`, { align: "center", margin: [0, 20] });

        // Generar tabla de productos
        generatePDFTable(doc, products);

        // Establecer el nombre del archivo y el tipo de contenido de la respuesta
        res.setHeader("Content-Disposition", "attachment; filename=reporte_productos.pdf");
        res.setHeader("Content-Type", "application/pdf");

        // Envía el documento PDF como respuesta
        doc.pipe(res);
        doc.end();
    } catch (error) {
        res.status(500).send(error.message);
        console.log(error.message);
    }
};

/**
 * Genera una tabla en el documento PDF con los productos proporcionados.
 * Utiliza los estilos y datos específicos para la tabla.
 */
const generatePDFTable = (doc, products) => {
    const tallaText = {
        1: 'S',
        2: 'M',
        3: 'L',
        4: 'X',
        5: 'XL'
    };

    const categoriaText = {
        1: 'HOMBRE',
        2: 'MUJER',
        3: 'NIÑO',
        4: 'NIÑA'
    };

    const tableHeaders = ["ID", "Nombre", "Descripcion", "Precio", "Talla", "Categoría"];

    // Establecer posición inicial de la tabla
    let y = doc.y + 30;

    // Establecer estilos para los encabezados de la tabla
    doc.font("Helvetica-Bold").fontSize(10);
    doc.fillColor("black");

    // Dibujar los encabezados de la tabla
    tableHeaders.forEach((header, columnIndex) => {
        doc.text(header, columnIndex * 100 + 50, y);
    });

    // Establecer estilos para las filas de la tabla
    doc.font("Helvetica").fontSize(10);

    // Dibujar las filas de la tabla
    products.forEach((product, rowIndex) => {
        y += 20; // Aumentar la posición vertical para cada fila

        const rowData = [
            product.idproducto,
            product.nombre,
            product.descripcion,
            product.precio,
            tallaText[product.talla],
            categoriaText[product.categoria]
        ];

        rowData.forEach((data, columnIndex) => {
            const cellWidth = 100;
            const cellHeight = 20;

            const textOptions = {
                width: cellWidth,
                height: cellHeight,
                lineBreak: false
            };

            doc.text(data, columnIndex * 100 + 50, y, textOptions);
        });
    });
};

/**
 * Genera un reporte en formato Excel de los productos obtenidos de la API.
 * El reporte se genera en un archivo de Excel y se descarga como adjunto en la respuesta HTTP.
 */
export const excel = async (req, res) => {
    try {
        const products = await getProducts(); // Función para obtener los productos de la API

        // Crear una nueva hoja de cálculo
        const workbook = XLSX.utils.book_new();

        // Crear una nueva hoja dentro del libro de Excel
        const worksheet = XLSX.utils.json_to_sheet(products);

        // Agregar la hoja al libro de Excel
        XLSX.utils.book_append_sheet(workbook, worksheet, "Productos");

        // Convertir el libro de Excel a un archivo de buffer
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });

        // Establecer el nombre del archivo y el tipo de contenido de la respuesta
        res.setHeader("Content-Disposition", "attachment; filename=reporte_productos.xlsx");
        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

        // Envía el archivo de Excel como respuesta
        res.send(excelBuffer);
    } catch (error) {
        res.status(500).send(error.message);
        console.log(error.message);
    }
};

// Funcion para obtener los productos
const getProducts = async () => {
    const response = await fetch(process.env.API + 'pro');
    const products = await response.json();
    return products;
};

// Controlador para borrar un producto


// Controlador para crear un nuevo producto
const create = async (req, res) => {
    const newProduct = {

        name: req.body.nombre,
        desc: req.body.descripcion,
        price: req.body.precio,
        link: req.body.enlace,
        size: req.body.talla,
        category: req.body.categoria
    };

    axios.post(process.env.API + 'pro', newProduct)
        .then(response => {
            console.log(response.data);
            // Aquí puedes realizar alguna acción adicional o mostrar un mensaje de éxito.
            res.redirect("/dash/inicio");
        })
        .catch(error => {
            console.error(error);
            // Aquí puedes manejar el error de alguna manera o mostrar un mensaje de error.
            res.redirect('/error'); // Redirige a una página de error o a donde desees.
        });
};

export const dash = {
    tablas,
    salir,
    pdf,
    excel,
    create
};
