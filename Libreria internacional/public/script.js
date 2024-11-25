
document.addEventListener('DOMContentLoaded', () => {
    const librosContainer = document.getElementById('libros');
    const uploadForm = document.getElementById('upload-form');

    // Manejador para el formulario de subir libros
    uploadForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const titulo = document.getElementById('titulo').value;
        const archivo = document.getElementById('archivo').files[0];

        if (archivo && archivo.type === 'application/pdf') {
            const libroDiv = document.createElement('div');
            libroDiv.innerHTML = `<h3>${titulo}</h3><a href="${URL.createObjectURL(archivo)}" target="_blank">Leer PDF</a>`;
            librosContainer.appendChild(libroDiv);
        } else {
            alert('Por favor, sube un archivo PDF válido.');
        }
    });
});
document.getElementById('upload-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('titulo', document.getElementById('titulo').value);
    formData.append('imagen', document.getElementById('imagen').files[0]);
    formData.append('archivo', document.getElementById('archivo').files[0]);

    try {
        const response = await fetch('http://localhost:3000/subir', {
            method: 'POST',
            body: formData
        });
        const result = await response.json();
        alert(result.message);
        cargarLibros();
    } catch (error) {
        console.error('Error:', error);
    }
});

const cargarLibros = async () => {
    try {
        const response = await fetch('http://localhost:3000/libros');
        const libros = await response.json();
        const container = document.getElementById('libros');
        container.innerHTML = '';
        libros.forEach(libro => {
            container.innerHTML += `
                <div>
                    <img src="${libro.imagen}" alt="${libro.titulo}" style="width:100px;height:auto;">
                    <h3>${libro.titulo}</h3>
                    <a href="${libro.archivo}" target="_blank">Leer PDF</a>
                </div>
            `;
        });
    } catch (error) {
        console.error('Error al cargar los libros:', error);
    }
};

// Cargar libros al iniciar
cargarLibros();
const libros = [
    {
    titulo: "Libro 1",
    imagen: "/uploads/images/libro1.jpg",
    archivo: "/uploads/pdf/libro1.pdf"
    } ];

  // En el frontend, simplemente pides este archivo con fetch
fetch('/libros.json')
    .then(response => response.json())
    .then(data => {
      // Renderizar el catálogo
    });
document.getElementById('upload-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('titulo', document.getElementById('titulo').value);
    formData.append('imagen', document.getElementById('imagen').files[0]);
    formData.append('archivo', document.getElementById('archivo').files[0]);

    try {
        const response = await fetch('/subir', {
            method: 'POST',
            body: formData
        });
        const result = await response.json();
        alert(result.message);
        cargaLibros();
    } catch (error) {
        console.error('Error:', error);
    }
});

const cargaLibros = async () => {
    try {
        const response = await fetch('/libros');
        const libros = await response.json();
        const container = document.getElementById('libros');
        container.innerHTML = '';
        libros.forEach(libro => {
            container.innerHTML += `
                <div>
                    <img src="${libro.imagen}" alt="${libro.titulo}" style="width:100px;height:auto;">
                    <h3>${libro.titulo}</h3>
                    <a href="${libro.archivo}" target="_blank">Leer PDF</a>
                </div>
            `;
        });
    } catch (error) {
        console.error('Error al cargar los libros:', error);
    }
};

// Cargar libros al iniciar
cargaLibros();
