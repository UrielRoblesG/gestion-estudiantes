
import {generarUUID} from '../utils/generar.uuid.js';

/**
 * Clase para representar a un Estudiante con los campos especificados.
 */
export class Estudiante {
  /**
   * @param {string} nombre - El nombre del estudiante.
   * @param {string} apellidoPaterno - El apellido paterno del estudiante.
   * @param {string} apellidoMaterno - El apellido materno del estudiante.
   * @param {Date} fechaNacimiento - La fecha de nacimiento (objeto Date).
   * @param {string} email - El correo electrónico.
   * @param {string} [telefono] - El número de teléfono (opcional).
   * @param {string} carreraPrograma - El nombre de la carrera o programa.
   * @param {number} semestre - El semestre actual.
   * @param {Date} fechaIngreso - La fecha de ingreso (objeto Date).
   */
  constructor(
    nombre,
    apellidoPaterno,
    apellidoMaterno,
    fechaNacimiento,
    email,
    carreraPrograma,
    semestre,
    fechaIngreso,
    telefono = null
  ) {
    // 1. Campos autogenerados
    this.id = generarUUID(); // id : string (autogenerado)
    this.matricula = this.generarMatricula(
      fechaIngreso,
      nombre,
      apellidoPaterno
    ); // matricula: string (autogenerado con funcion)

    // 2. Campos requeridos en constructor
    this.nombre = nombre; // nombre : string
    this.apellidoPaterno = apellidoPaterno; // apellidoPaterno : string
    this.apellidoMaterno = apellidoMaterno; // apellidoMaterno : string
    this.fechaNacimiento = fechaNacimiento; // fechaNacimiento : Date
    this.email = email; // email : string
    this.carreraPrograma = carreraPrograma; // carreraPrograma : string
    this.semestre = semestre; // semestre : number
    this.fechaIngreso = fechaIngreso; // fechaIngreso : Date

    // 3. Campo opcional
    this.telefono = telefono; // telefono : string (opcional)

    // 4. Campos con valor por defecto
    // estado : string ('activo' | 'inactivo' | 'graduado', | 'bajaTemperal')
    this.estado = "activo";

    // materiasInscritas : string[] (lista de strings)
    this.materiasInscritas = [];
  }

  /**
   * Genera una matrícula simple combinando año de ingreso e iniciales.
   * ESTO ES UNA FUNCIÓN DE EJEMPLO, la lógica de matrícula es muy específica.
   * @param {Date} fechaIngreso - La fecha de ingreso.
   * @param {string} nombre - El nombre.
   * @param {string} apellidoPaterno - El apellido paterno.
   * @returns {string} La matrícula generada.
   */
  generarMatricula(fechaIngreso, nombre, apellidoPaterno) {
    const anio = fechaIngreso.getFullYear().toString().substring(2, 4); // Últimos 2 dígitos del año
    const inicialNombre = nombre.charAt(0).toUpperCase();
    const inicialApellidoPaterno = apellidoPaterno.charAt(0).toUpperCase();
    const sufijoAleatorio = Math.floor(100 + Math.random() * 900); // 3 dígitos aleatorios

    return `M${anio}${inicialApellidoPaterno}${inicialNombre}${sufijoAleatorio}`;
  }

  /**
   * Método para cambiar el estado del estudiante.
   * @param {('activo' | 'inactivo' | 'graduado' | 'bajaTemperal')} nuevoEstado - El nuevo estado.
   */
  cambiarEstado(nuevoEstado) {
    const estadosValidos = ["activo", "inactivo", "graduado", "bajaTemperal"];
    if (estadosValidos.includes(nuevoEstado)) {
      this.estado = nuevoEstado;
    } else {
      console.error(
        `Estado inválido: ${nuevoEstado}. El estado no fue cambiado.`
      );
    }
  }

  /**
   * Método para inscribir una materia.
   * @param {string} materia - El nombre de la materia a inscribir.
   */
  inscribirMateria(materia) {
    if (!this.materiasInscritas.includes(materia)) {
      this.materiasInscritas.push(materia);
    } else {
      console.warn(`La materia ${materia} ya está inscrita.`);
    }
  }

  /**
   * Crea una instancia de Estudiante a partir de un objeto plano.
   * NOTA: Este método asume que el objeto ya trae el 'id' y la 'matricula'
   * si existen, y respeta la estructura de la clase.
   * * @param {object} obj - El objeto plano con las propiedades del estudiante.
   * @returns {Estudiante} Una nueva instancia de Estudiante.
   */
  static fromObject(obj) {
    // 1. Crear la instancia usando los campos principales del constructor.
    // Se asegura que las fechas sean objetos Date, incluso si vienen como strings (común en JSON).
    const fechaNacimiento =
      obj.fechaNacimiento instanceof Date
        ? obj.fechaNacimiento
        : new Date(obj.fechaNacimiento);
    const fechaIngreso =
      obj.fechaIngreso instanceof Date
        ? obj.fechaIngreso
        : new Date(obj.fechaIngreso);

    const estudiante = new Estudiante(
      obj.nombre,
      obj.apellidoPaterno,
      obj.apellidoMaterno,
      fechaNacimiento,
      obj.email,
      obj.carreraPrograma,
      obj.semestre,
      fechaIngreso,
      obj.telefono // Opcional
    );

    // 2. Sobrescribir los campos autogenerados, estado y arrays si existen en el objeto.
    // Esto es crucial para mantener el ID y la matrícula si ya estaban asignados (e.g., al cargar desde DB).
    if (obj.id) {
      // IMPORTANTE: Si un ID viene en el objeto, lo usamos en lugar de autogenerar uno nuevo.
      estudiante.id = obj.id;
    }
    if (obj.matricula) {
      // IMPORTANTE: Si una matrícula viene en el objeto, la usamos en lugar de autogenerar una nueva.
      estudiante.matricula = obj.matricula;
    }
    if (obj.estado) {
      estudiante.estado = obj.estado;
    }
    if (Array.isArray(obj.materiasInscritas)) {
      estudiante.materiasInscritas = obj.materiasInscritas;
    }

    return estudiante;
  }
}
