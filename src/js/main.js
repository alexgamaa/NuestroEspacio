// Animación de entrada + año dinámico
document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".section");
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add("visible");
        });
    }, { threshold: 0.2 });

    sections.forEach(section => {
        section.classList.add("hidden");
        observer.observe(section);
    });

    document.getElementById("year").textContent = new Date().getFullYear();
});
// --- Efecto flip en la galería ---
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
    });
});
const asignaturas = [
    { nombre: "Programación", horas: 266 },
    { nombre: "Inglés", horas: 68 },
    { nombre: "Lenguaje de Marcas", horas: 100 },
    { nombre: "Sistemas Informáticos", horas: 166 },
    { nombre: "Base de Datos", horas: 166 },
    { nombre: "Entornos", horas: 100 },
    { nombre: "Proyecto", horas: 34 }
];

const formularioDiv = document.getElementById("formulario");

// Crear inputs dinámicamente
asignaturas.forEach(a => {
    const div = document.createElement("div");
    div.className = "materia-input";
    div.innerHTML = `
    <label>${a.nombre}</label>
    <input type="number" id="${a.nombre}" min="0" placeholder="Horas faltadas">
  `;
    formularioDiv.appendChild(div);
});

function calcularFaltas() {
    const resultados = document.getElementById("resultados");
    resultados.innerHTML = "<h2>Resultados</h2>";

    asignaturas.forEach(a => {
        const horasFaltadas = parseInt(document.getElementById(a.nombre).value) || 0;
        const limite = Math.floor(a.horas * 0.15);
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
