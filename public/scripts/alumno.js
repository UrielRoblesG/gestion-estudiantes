const obtenerAlumno = async (id = "") => {
  try {
    const uri = `/api/alumnos/${id}`;
    const token =
      "eyJpZCI6IjRhZjA0ZTg3LWI4MmMtNGRhMS1hMTMyLWYwMWZmYmFhZGIxZCIsImVtYWlsIjoiYWRtaW5AY29ycmVvLmNvbSIsInJvbCI6IkFkbWluIiwiZW1pdGlkb0VuIjoiMjAyNS0xMS0wM1QxODozNDozMi40OTJaIn0=";

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

    const decodedData = await response.json();
    return decodedData.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

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

document.addEventListener("DOMContentLoaded", async () => {
  //* Obtener el ID desde la URL
  const partesPath = window.location.pathname.split("/");
  const alumnoId = partesPath[partesPath.length - 1];
  try {
    const alumno = await obtenerAlumno(alumnoId);
    const alumnoInfo = document.getElementById("alumno-info");
    alumnoInfo.innerHTML = `
    <div class="card profile-card">
          <div class="card-header bg-primary text-white">
            <h5 class="mb-0">Información Detallada del Alumno</h5>
          </div>

          <div class="card-body">
            <div class="row align-items-center mb-4">
              <div class="col-md-3 text-center">
                <img
                  src="${alumno.perfil}"
                  alt="Foto de Perfil"
                  class="img-fluid rounded-circle profile-img"
                />
              </div>
              <div class="col-md-9">
                <h4 class="card-title mb-1">${alumno.nombre} ${
      alumno.apellidoPaterno
    } ${alumno.apellidoMaterno}</h4>
                <h6 class="card-subtitle mb-2 text-muted">
                  Matrícula: **${alumno.matricula}**
                  <span class="badge badge-activo ms-2">${alumno.estado}</span>
                </h6>
                <p class="card-text">
                  **ID Único:** ${alumno.id}
                </p>
              </div>
            </div>

            <h5 class="border-bottom pb-2 mb-3 text-primary">
              Detalles Académicos y Contacto
            </h5>

            <div class="row">
              <div class="col-md-6 mb-3">
                <p class="mb-1">**Programa:** ${alumno.carreraPrograma}</p>
                <p class="mb-1">**Semestre:** ${alumno.semestre}</p>
                <p class="mb-1">**Ingreso:** ${formatFecha(
                  alumno.fechaIngreso
                )}</p>
              </div>
              <div class="col-md-6 mb-3">
                <p class="mb-1">**Email:** ${alumno.email}</p>
                <p class="mb-1">**Teléfono:** ${alumno.telefono}</p>
                <p class="mb-1">**Nacimiento:** ${formatFecha(
                  alumno.fechaNacimiento
                )}</p>
              </div>
            </div>

            <h5 class="border-bottom pb-2 mb-3 text-primary">
              Materias Inscritas
            </h5>
            <p>
            ${alumno.materiasInscritas.map(
              (m) => `<span class="badge text-bg-secondary me-2">${m}</span>\n`
            )}
              
            </p>

            <div class="text-end mt-4">
              <a href="/admin/alumno/editar" class="btn btn-outline-primary btn-sm"
                >Editar Perfil</a
              >
              <a href="/admin/alumno/historial" class="btn btn-outline-danger btn-sm"
                >Ver Historial</a
              >
            </div>
          </div>

          <div class="card-footer text-muted text-center">
            Última actualización: ${formatFecha(Date.now())}
          </div>
        </div>
  `;
  } catch (error) {
    // Manejamos el error con un mensaje en la pantalla
    console.error(error);
  }
});
