
 /**
   * Genera un identificador único global (UUID) v4.
   * Se usa 'crypto.randomUUID()' si está disponible (entornos modernos),
   * o un placeholder simple si no.
   * @returns {string} El UUID generado.
   */
export const generarUUID = () => {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    // Fallback simple para entornos que no soportan crypto.randomUUID()
    return (
      "uuid-" +
      Math.random().toString(36).substring(2, 9) +
      Date.now().toString(36)
    );
  }
