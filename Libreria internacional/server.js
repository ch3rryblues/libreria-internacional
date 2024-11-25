const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();

// Configuración de almacenamiento para multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folder = file.fieldname === 'archivo' ? 'public/uploads/pdf' : 'public/uploads/images';
        cb(null, folder);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Ruta para subir libros
app.post('/subir', upload.fields([{ name: 'archivo' }, { name: 'imagen' }]), (req, res) => {
    const { titulo } = req.body;
    const archivo = `/uploads/pdf/${req.files['archivo'][0].filename}`;
    const imagen = `/uploads/images/${req.files['imagen'][0].filename}`;

    // Leer libros existentes
    const librosFile = path.join(__dirname, 'public/libros.json');
    const libros = JSON.parse(fs.readFileSync(librosFile, 'utf8'));

    // Agregar nuevo libro
    libros.push({ titulo, archivo, imagen });

    // Guardar de nuevo
    fs.writeFileSync(librosFile, JSON.stringify(libros, null, 2));

    res.json({ success: true, message: 'Libro subido con éxito.' });
});

// Ruta para obtener los libros
app.get('/libros', (req, res) => {
    const librosFile = path.join(__dirname, 'public/libros.json');
    const libros = JSON.parse(fs.readFileSync(librosFile, 'utf8'));
    res.json(libros);
});

// Iniciar el servidor
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
