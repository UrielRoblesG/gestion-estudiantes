/**
 * Genera una matrícula simple combinando año de ingreso e iniciales.
 * ESTO ES UNA FUNCIÓN DE EJEMPLO, la lógica de matrícula es muy específica.
 * @param {Date} fechaIngreso - La fecha de ingreso.
 * @param {string} nombre - El nombre.
 * @param {string} apellidoPaterno - El apellido paterno.
 * @returns {string} La matrícula generada.
 */
export const generarMatricula = (fechaIngreso, nombre, apellidoPaterno) => {
  const anio = fechaIngreso.getFullYear().toString().substring(2, 4); // Últimos 2 dígitos del año
  const inicialNombre = nombre.charAt(0).toUpperCase();
  const inicialApellidoPaterno = apellidoPaterno.charAt(0).toUpperCase();
  const sufijoAleatorio = Math.floor(100 + Math.random() * 900); // 3 dígitos aleatorios

  return `M${anio}${inicialApellidoPaterno}${inicialNombre}${sufijoAleatorio}`;
};
