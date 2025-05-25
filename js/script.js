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

  // Alto contraste
  document
    .getElementById("alto-contraste")
    .addEventListener("click", function () {
      document.body.classList.toggle("alto-contraste");

      // Guardar preferencia en localStorage
      if (document.body.classList.contains("alto-contraste")) {
        localStorage.setItem("altoContraste", "true");
      } else {
        localStorage.setItem("altoContraste", "false");
      }
    });

  // Cargar preferencia de alto contraste al inicio
  if (localStorage.getItem("altoContraste") === "true") {
    document.body.classList.add("alto-contraste");
  }
}
