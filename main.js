const profesor = {};
const alumnos = [];

function mostrarAlumnoForm() {
    const profesorNombre = document.getElementById("profesorNombre").value;
    const profesorApellido = document.getElementById("profesorApellido").value;
    const materia = document.getElementById("materia").value;

    if (profesorNombre && profesorApellido && materia) {
        profesor.nombre = profesorNombre;
        profesor.apellido = profesorApellido;
        profesor.materia = materia;

        // Guardar en localStorage
        localStorage.setItem("profesorNombre", profesorNombre);
        localStorage.setItem("profesorApellido", profesorApellido);
       
        let  proNombre = localStorage.getItem ("profesorNombre")
        console.log(proNombre) 
        
        const profesorForm = document.getElementById("profesorForm");
        const alumnoForm = document.getElementById("alumnoForm");
        profesorForm.style.display = "none";
        alumnoForm.style.display = "block";
    } else {
        alert("Completa todos los campos del profesor.");
    }
}

function agregarAlumno() {
    const nombre = document.getElementById("alumnoNombre").value;
    const apellido = document.getElementById("alumnoApellido").value;
    const notasInput = document.getElementById("notas").value;
    const notas = notasInput.split(",").map(nota => parseFloat(nota));

    if (nombre && apellido && validarNotas(notas)) {
        alumnos.push({ nombre, apellido, notas });

        // contador de alumnos
        const contadorAlumnos = document.getElementById("contadorAlumnos");
        contadorAlumnos.textContent = `Cantidad de Alumnos: ${alumnos.length}`;

        // Guardar en localStorage
        localStorage.setItem("alumnos", JSON.stringify(alumnos));

        document.getElementById("alumnoNombre").value = "";
        document.getElementById("alumnoApellido").value = "";
        document.getElementById("notas").value = "";
    } else {
        alert("Completa todos los campos del alumno y asegúrate de ingresar notas válidas (1-10).");
    }
}

function validarNotas(notas) {
    for (const nota of notas) {
        if (isNaN(nota) || nota < 1 || nota > 10) {
            return false;
        }
    }
    return true;
}

function calcularPromedios() {
    const resultadosDiv = document.getElementById("resultados");
    resultadosDiv.innerHTML = "";

    for (const alumno of alumnos) {
        const promedio = alumno.notas.reduce((total, nota) => total + nota, 0) / alumno.notas.length;
        const promedioFormateado = promedio.toFixed(2);
        resultadosDiv.innerHTML += `<p>${alumno.nombre} ${alumno.apellido} - Promedio: ${promedioFormateado}</p>`;
    }
}

// Modo Oscuro
const modoOscuroBtn = document.getElementById("modoOscuroBtn");
const body = document.body;

modoOscuroBtn.addEventListener("click", () => {
    // Alternar clase "dark-mode" en el body
    body.classList.toggle("dark-mode");
    modoOscuroBtn.innerText =  body.classList.contains("dark-mode") ? "modo claro" : "modo oscuro";

    // Guardar el estado actual del modo en localStorage para que el usuario vea el mismo tema la próxima vez que visite el sitio.
    const modoActual = body.classList.contains("dark-mode") ? "oscuro" : "normal";
    localStorage.setItem("modo", modoActual);
});

// Cargar el estado del modo desde localStorage al inicio (opcional)
window.onload = function () {
    const modoGuardado = localStorage.getItem("modo");
    if (modoGuardado === "oscuro") {
        body.classList.add("dark-mode");
    }
    modoOscuroBtn.innerText =  body.classList.contains("dark-mode") ? "modo claro" : "modo oscuro";

};

// Boton borrar datos
const borrarDatosBtn = document.getElementById("borrarDatosBtn");

borrarDatosBtn.addEventListener("click", () => {
    localStorage.clear();
    location.reload(); // Recarga la página para reflejar los cambios
});