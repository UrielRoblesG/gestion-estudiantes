/**
 * @fileoverview Módulo que exporta una función para calcular la edad
 * de una persona basándose en su fecha de nacimiento.
 */

/**
 * Calcula la edad de una persona en años, basándose en la diferencia
 * de tiempo entre la fecha actual y la fecha de nacimiento.
 *
 * NOTA: Este método funciona tomando la diferencia total en milisegundos
 * y convirtiéndola a una fecha, luego extrae el año. Es una técnica
 * funcional pero puede ser inexacta por unos días o por un año completo
 * si no considera con precisión meses y husos horarios (Timezones).
 *
 * @export
 * @param {Date} fechaNacimiento El objeto Date que representa la fecha de nacimiento de la persona.
 * @returns {number} La edad calculada en años.
 */
export const calcularEdad = (fechaNacimiento) => {
    // 1. Calcula la diferencia de tiempo en milisegundos entre la fecha actual y la de nacimiento.
    const dif = Date.now() - fechaNacimiento.getTime();

    // 2. Crea un nuevo objeto Date usando la diferencia de milisegundos.
    //    Esto crea una fecha relativa que empieza en el 'Unix Epoch' (1 de enero de 1970).
    const edad = new Date(dif);

    // 3. Obtiene el año de esta fecha relativa (edad).
    //    getUTCFullYear() devuelve el año UTC.
    //    Al restar 1970 (el año del Epoch), el resultado es la edad en años.
    //    Math.abs se usa para asegurar que el resultado sea un número positivo,
    //    aunque generalmente no es necesario si la fecha de nacimiento es anterior a Date.now().
    return Math.abs(edad.getUTCFullYear() - 1970);
}