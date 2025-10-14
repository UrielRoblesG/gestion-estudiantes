

export const calcularEdad = (fechaNacimiento) => {
    const dif = Date.now() - fechaNacimiento.getTime();
    const edad = new Date(dif);
    return Math.abs(edad.getUTCFullYear() - 1970);
}