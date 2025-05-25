// Esperar a que el documento esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
  console.log("La plataforma EcoEducador está lista!");

  // Configurar el juego de clasificación
  setupJuegoClasificacion();

  // Configurar calculadoras
  setupCalculadoras();

  // Configurar accesibilidad
  setupAccesibilidad();

  // Configurar ocultación del menú al hacer scroll
  setupOcultarMenu();
});

// Juego de clasificación de residuos
function setupJuegoClasificacion() {
  const residuos = document.querySelectorAll(".residuo");
  const contenedores = document.querySelectorAll(".contenedor");
  const mensaje = document.getElementById("mensaje-juego");

  residuos.forEach((residuo) => {
    residuo.addEventListener("dragstart", function (e) {
      e.dataTransfer.setData("text/plain", this.dataset.tipo);
      setTimeout(() => (this.style.display = "none"), 0);
    });

    residuo.addEventListener("dragend", function () {
      this.style.display = "block";
    });
  });

  contenedores.forEach((contenedor) => {
    contenedor.addEventListener("dragover", function (e) {
      e.preventDefault();
      this.style.borderColor = "#3cb371";
      this.style.backgroundColor = "#e8f5e9";
    });

    contenedor.addEventListener("dragleave", function () {
      this.style.borderColor = "#ccc";
      this.style.backgroundColor = "#f8f8f8";
    });

    contenedor.addEventListener("drop", function (e) {
      e.preventDefault();
      this.style.borderColor = "#ccc";
      this.style.backgroundColor = "#f8f8f8";

      const tipoResiduo = e.dataTransfer.getData("text/plain");
      const tipoContenedor = this.id;

      if (tipoResiduo === tipoContenedor) {
        mensaje.textContent = "¡Correcto! Bien clasificado.";
        mensaje.style.color = "green";

        const residuosArray = Array.from(residuos);
        const residuo = residuosArray.find(
          (r) => r.dataset.tipo === tipoResiduo && r.style.display === "none"
        );
        if (residuo) {
          residuo.style.display = "none";
          residuo.setAttribute("draggable", "false");
          residuo.style.opacity = "0.5";
          residuo.style.textDecoration = "line-through";
        }

        const todosClasificados = Array.from(residuos).every(
          (r) => r.style.display === "none"
        );
        if (todosClasificados) {
          mensaje.textContent =
            "¡Felicidades! Has clasificado todos los residuos correctamente.";
          mensaje.style.color = "#2e8b57";
          mensaje.style.fontWeight = "bold";
          mensaje.style.fontSize = "1.2rem";
        }
      } else {
        mensaje.textContent = "Incorrecto. Intenta de nuevo.";
        mensaje.style.color = "red";

        const residuosArray = Array.from(residuos);
        const residuo = residuosArray.find(
          (r) => r.dataset.tipo === tipoResiduo && r.style.display === "none"
        );
        if (residuo) {
          residuo.style.display = "block";
        }
      }
    });
  });
}

// Configurar las calculadoras
function setupCalculadoras() {
  document
    .getElementById("calcular-agua")
    .addEventListener("click", function () {
      const duchasPorSemana =
        parseInt(document.getElementById("duchas").value) || 0;
      const minutosPorDucha =
        parseInt(document.getElementById("tiempo-ducha").value) || 0;
      const usaReductor = document.getElementById("reductor").value === "si";

      const litrosPorMinuto = usaReductor ? 6 : 12;
      const consumoActual = duchasPorSemana * minutosPorDucha * litrosPorMinuto;
      const consumoConAhorro = duchasPorSemana * minutosPorDucha * 6;

      const ahorro = consumoActual - consumoConAhorro;
      const ahorroAnual = ahorro * 52;

      const resultado = document.getElementById("resultado-agua");
      resultado.innerHTML = `
        <h4>Resultados:</h4>
        <p>Actualmente usas: <strong>${consumoActual} litros/semana</strong></p>
        <p>Con un reductor podrías usar: <strong>${consumoConAhorro} litros/semana</strong></p>
        <p>Ahorro potencial: <strong>${ahorro} litros/semana</strong> (${ahorroAnual} litros/año)</p>
        <p>¡Eso equivale a ${Math.round(
          ahorroAnual / 1000
        )} metros cúbicos al año!</p>
    `;
    });

  document
    .getElementById("calcular-energia")
    .addEventListener("click", function () {
      const aparato = document.getElementById("aparato").value;
      const horasUso =
        parseFloat(document.getElementById("horas-uso").value) || 0;

      const potencia = {
        foco: 60,
        led: 10,
        tv: 150,
        nevera: 200,
      };

      const potenciaKw = potencia[aparato] / 1000;
      const consumoDiario = potenciaKw * horasUso;
      const consumoMensual = consumoDiario * 30;

      const costoPorKwh = 0.15;
      const costoMensual = consumoMensual * costoPorKwh;

      const resultado = document.getElementById("resultado-energia");
      resultado.innerHTML = `
        <h4>Resultados:</h4>
        <p>Consumo mensual: <strong>${consumoMensual.toFixed(
          2
        )} kWh</strong></p>
        <p>Costo aproximado: <strong>$${costoMensual.toFixed(
          2
        )}/mes</strong></p>
    `;
    });
}

// Configurar funciones de accesibilidad
function setupAccesibilidad() {
  document
    .getElementById("aumentar-texto")
    .addEventListener("click", function () {
      const currentSize = parseFloat(getComputedStyle(document.body).fontSize);
      document.body.style.fontSize = currentSize + 1 + "px";
    });

  document
    .getElementById("disminuir-texto")
    .addEventListener("click", function () {
      const currentSize = parseFloat(getComputedStyle(document.body).fontSize);
      if (currentSize > 12) {
        document.body.style.fontSize = currentSize - 1 + "px";
      }
    });
}

// Ocultar el menú al hacer scroll
function setupOcultarMenu() {
  const menu = document.querySelector("#menu");
  let lastScrollTop = 0;

  window.addEventListener("scroll", function () {
    let scrollTop = window.scrollY;

    if (scrollTop > lastScrollTop) {
      menu.style.transform = "translateY(-100%)";
    } else {
      menu.style.transform = "translateY(0)";
    }

    lastScrollTop = scrollTop;
  });
}
