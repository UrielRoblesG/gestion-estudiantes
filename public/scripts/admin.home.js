const obtenerAlumnos = async () => {
  const uri = "/api/alumnos";
  const token =
    "eyJpZCI6IjRhZjA0ZTg3LWI4MmMtNGRhMS1hMTMyLWYwMWZmYmFhZGIxZCIsImVtYWlsIjoiYWRtaW5AY29ycmVvLmNvbSIsInJvbCI6IkFkbWluIiwiZW1pdGlkb0VuIjoiMjAyNS0xMS0wM1QxODozNDozMi40OTJaIn0=";

  try {
    const response = await fetch(uri, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Error en la solicitud: ${response.statusText} (${response.status})`
      );
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Hubo un error al obtener los alumnos:", error);
    return [];
  }
};

const mostrarAlerta = (msg = "") => {
  const alert = document.getElementById("msg-alert");

  alert.textContent = msg;

  alert.classList.remove("d-none");
  alert.classList.add('d-block');

  setTimeout(() => {
      alert.classList.remove('d-block');
      alert.classList.add("d-none");
  }, 2500);
};

document.addEventListener("DOMContentLoaded", async (event) => {
  // Datos de los alumnos (copiados del JSON proporcionado)
  const alumnosData = await obtenerAlumnos();

  if (alumnosData.length == 0) {
    mostrarAlerta('No se obtuvieron registros de los alumnos.');
    return;
  }

  // Función para formatear la fecha a un formato más legible
  function formatFecha(dateString) {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  const obtenerEstado = (estado = "") => {
    if (estado === "activo") {
      return { claseEstado: "text-success", estadoIcono: "✅" };
    } else if (estado === "inactivo") {
      return { claseEstado: "text-danger", estadoIcono: "❌" };
    } else {
      return { claseEstado: "text-warning", estadoIcono: "⚠️" };
    }
  };

  const alumnosGrid = document.getElementById("alumnos-grid");

  alumnosData.forEach((alumno) => {
    // Crear el elemento de la columna para el grid de Bootstrap
    const card = document.createElement("div");
    card.classList.add("col");

    // Determinar la clase para el estado
    const { claseEstado, estadoIcono } = obtenerEstado(alumno.estado);

    // Crear el contenido de la tarjeta con clases de Bootstrap
    card.innerHTML = `
                <div class="card shadow-sm h-100 border-primary">
                    <div class="card-body d-flex flex-column align-items-center text-center">
                        <img src="${
                          alumno.perfil
                        }" class="profile-img" alt="Foto de Perfil">
                        <h5 class="card-title text-primary">${alumno.nombre} ${
      alumno.apellidoPaterno
    }</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${
                          alumno.carreraPrograma
                        }</h6>
                        <ul class="list-group list-group-flush w-100 text-start mt-2">
                            <li class="list-group-item"><strong>Matrícula:</strong> ${
                              alumno.matricula
                            }</li>
                            <li class="list-group-item"><strong>Semestre:</strong> ${
                              alumno.semestre
                            }</li>
                            <li class="list-group-item"><strong>Email:</strong> <a href="mailto:${
                              alumno.email
                            }">${alumno.email}</a></li>
                            <li class="list-group-item"><strong>Teléfono:</strong> ${
                              alumno.telefono
                            }</li>
                            <li class="list-group-item"><strong>Ingreso:</strong> ${formatFecha(
                              alumno.fechaIngreso
                            )}</li>
                            <li class="list-group-item"><strong>Estado:</strong> <span class="${claseEstado}"><strong>${estadoIcono} ${alumno.estado.toUpperCase()}</strong></span></li>
                        </ul>
                    </div>
                    <div class="card-footer text-center">
                        <a href="alumno/${
                          alumno.id
                        }" class="btn btn-sm btn-outline-primary">Ver Detalles</a>
                    </div>
                </div>
            `;
    alumnosGrid.appendChild(card);
  });
});
