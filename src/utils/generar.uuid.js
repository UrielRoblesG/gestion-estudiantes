/**
 * @fileoverview Módulo de utilidad para generar identificadores únicos.
 */

/**
 * Genera un Identificador Único Universal (UUID) de tipo v4.
 *
 * Esta función prioriza el uso del API nativo y criptográficamente seguro
 * `crypto.randomUUID()` para generar identificadores globalmente únicos.
 *
 * Incluye un mecanismo de reserva (fallback) simple y no criptográfico
 * para entornos antiguos o restringidos que no dispongan de la API 'crypto'.
 *
 * @export
 * @returns {string} El UUID generado (formato oficial UUID v4 o un identificador simple de fallback).
 */
export const generarUUID = () => {
    // 1. Intento de uso de la API nativa y segura (prioritario en navegadores y Node.js modernos)
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
        return crypto.randomUUID();
    }

    // 2. Fallback simple (no garantiza unicidad criptográfica ni cumple el estándar UUID v4)
    // Combina un prefijo, una cadena aleatoria corta, y la marca de tiempo actual.
    // Aunque es poco probable, este método podría generar colisiones.
    return (
        "uuid-" +
        Math.random().toString(36).substring(2, 9) +
        Date.now().toString(36)
    );
}