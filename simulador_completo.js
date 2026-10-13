
  let clientes = [];
  let creditos = [];

  let tasaInteres = 15;
  let clienteSeleccionado = null;
  let cuotaCalculada = 0;
  let montoCalculado = 0;
  let plazoCalculado = 0;
  let creditoAprobado = false;

  
//Para recuperar o mostrar información usar los métodos de la clase utilitarios, puede agregar métodos adicionales en utilitarios

function ocultarSecciones() {
    let secciones = document.querySelectorAll("section");

    secciones.forEach(function(seccion) {
        seccion.classList.remove("activa");
    });
}

function mostrarSeccion(id) {
    ocultarSecciones();

    document.getElementById(id).classList.add("activa");
}

function guardarTasa() {
    let componente = document.getElementById("tasaInteres");
    let valorTasa = Number(componente.value);
    let mensaje = document.getElementById("mensajeTasa");

    if (
        componente.value.trim() === "" ||
        !Number.isFinite(valorTasa) ||
        valorTasa < 10 ||
        valorTasa > 20
    ) {
        mensaje.textContent = "La tasa debe estar entre 10% y 20%";
        return;
    }

    mensaje.textContent =
        "Tasa configurada correctamente: " + valorTasa + "%";
}

