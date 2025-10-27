import multer from "multer";
import path from "path";
import fs from "fs";

/**
 * @file multer.config.js
 * @description Configuración de Multer para manejar la subida de imágenes de perfil de alumnos.
 * Guarda los archivos en la carpeta `/uploads` con un nombre único basado en la marca de tiempo.
 */

// Definir carpeta donde se guardarán las imágenes
const carpetaUploads = path.resolve("./uploads");

// Crear carpeta si no existe
if (!fs.existsSync(carpetaUploads)) {
  fs.mkdirSync(carpetaUploads, { recursive: true });
}

/**
 * Configuración del almacenamiento
 * Define la carpeta destino y el nombre del archivo guardado.
 */
const almacenamiento = multer.diskStorage({
  /**
   * Carpeta donde se almacenará el archivo.
   * @param {Express.Request} req
   * @param {Express.Multer.File} file
   * @param {Function} cb - Callback de Multer.
   */
  destination: (req, file, cb) => {
    cb(null, carpetaUploads);
  },
  /**
   * Define el nombre del archivo guardado en el servidor.
   * Ejemplo: "imagen-1738947900.jpg"
   * @param {Express.Request} req
   * @param {Express.Multer.File} file
   * @param {Function} cb
   */
  filename: (req, file, cb) => {
    const timeStamp = Date.now();

    const extension = path.extname(file.originalname);

    const filename = `${file.fieldname}-${timeStamp}${extension}`;

    cb(null, filename);
  },
});

/**
 * Filtro de tipos de archivo permitidos.
 * Solo acepta imágenes con formato PNG, JPG o JPEG.
 * @param {Express.Request} req
 * @param {Express.Multer.File} file
 * @param {Function} cb
 */
const filtros = (req, file, cb) => {
  const permitidos = ["image/png", "image/jpg", "image/jpeg"];

  if (!permitidos.includes(file.mimetype)) {
    cb(new Error("Tipo de archivo invalido"));
  } else {
    cb(null, true);
  }
};

/**
 * Configuración general de Multer.
 * - Límite de tamaño: 1 MB (1,000,000 bytes)
 * - Filtro de tipo de archivo
 * - Almacenamiento personalizado
 */
const multerConfig = multer({
  fileFilter: filtros,
  storage: almacenamiento,
  limits: 1000000,
});


/**
 * Middleware para subir una sola imagen de perfil.
 * El campo en el formulario debe llamarse "imagen".
 * 
 * @example
 * // En el controlador:
 * router.put('/api/alumnos/:id/foto', subirFotoPerfil, actualizarFotoPerfil);
 */
export const subirFotoPerfil = multerConfig.single("imagen");
