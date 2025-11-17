// Animación de entrada + año dinámico
document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".section");
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            } else {
                // Opcional: Para quitar la clase "visible" cuando la sección sale del viewport
                entry.target.classList.remove("visible");
            }
        });
    }, {threshold: 0.2});

    // Inicializa todas las secciones como invisibles
    sections.forEach(section => {
        section.classList.add("hidden");
        observer.observe(section);
    });

    // Añadir el año actual al footer
    document.getElementById("year").textContent = new Date().getFullYear();
});

// --- Efecto flip en la galería ---
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
    });
});

// Información de las asignaturas
const asignaturas = [
    {nombre: "Citología Ginecológica", horas: 105},
    {nombre: "Patología Clínica", horas: 42},
    {nombre: "Innovación", horas: 42},
    {nombre: "Biología Molecular", horas: 126},
    {nombre: "Inglés", horas: 63},
    {nombre: "Sostenibilidad", horas: 42},
    {nombre: "Técnicas Generales de Laboratorio", horas: 147}
];

// Generar dinámicamente los inputs del formulario
const formularioDiv = document.getElementById("formulario");

if (formularioDiv) {
    asignaturas.forEach(a => {
        const div = document.createElement("div");
        div.className = "materia-input";
        div.innerHTML = `
            <label>${a.nombre}</label>
            <input type="number" id="${a.nombre}" min="0" placeholder="Horas faltadas">
        `;
        formularioDiv.appendChild(div);
    });
}

// Función para calcular las faltas
function calcularFaltas() {
    const resultados = document.getElementById("resultados");
    resultados.innerHTML = "<h2>Resultados</h2>";

    asignaturas.forEach(a => {
        const horasFaltadas = parseInt(document.getElementById(a.nombre).value) || 0;
        const limite = Math.floor(a.horas * 0.20);
        const restantes = limite - horasFaltadas;

        let mensaje = "";
        let clase = "";

        if (restantes > 0) {
            mensaje = `En <strong>${a.nombre}</strong> puedes faltar aún ${restantes} horas (máx. ${limite}).`;
            clase = "ok";
        } else if (restantes === 0) {
            mensaje = `En <strong>${a.nombre}</strong> has llegado al límite de faltas.`;
            clase = "alerta";
        } else {
            mensaje = `⚠ En <strong>${a.nombre}</strong> te has pasado ${Math.abs(restantes)} horas del límite.`;
            clase = "error";
        }

        resultados.innerHTML += `<p class="${clase}">${mensaje}</p>`;
    });
}

function updateDaysTogether() {
    const startDate = new Date('2025-10-18'); // Cambia a la fecha de inicio de su relación
    const today = new Date();
    const diffTime = today - startDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    document.getElementById('daysTogether').textContent = diffDays;
}

// Actualiza al cargar
updateDaysTogether();
// Opcional: actualizar cada día (si quieren que cambie automáticamente a medianoche)
setInterval(updateDaysTogether, 1000 * 60 * 60); // actualiza cada hora


document.getElementById('playGame').addEventListener('click', () => {
    window.location.href = 'https://www.jetpunk.com/es'; // Cambia a la URL real del juego
});
