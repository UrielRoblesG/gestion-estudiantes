// src/models/Alumno.model.js
import { Schema, model } from "mongoose";
import { generarMatricula }from "../utils/generar.matricula.js";

const AlumnoSchema = new Schema({
    matricula: {
        type: String,
        unique: true,
        trim: true,
    },
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    apellidoPaterno: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'El email no es válido'],
    },
    carrera: {
        type: String,
        required: true,
        trim: true,
    },
    semestre: {
        type: Number,
        required: true,
        min: 1,
    },
    fechaIngreso: {
        type: Date,
        required: true,
        default: Date.now,
        immutable: true
    },
    estado: {
        type: String,
        enum: ['activo', 'inactivo', 'egresado', 'baja temporal'],
        default: 'activo',
    },
    materiasInscritas: {
        type: [String], // Array de Strings
        default: [],
    },
    perfil: {
        type: String, // URL a la imagen
        default: null,
    },
    telefono: {
        type: String, // telefono
        default: null,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        select: false
    },
    isDeleted: {
        type: Boolean,
        default: false,
        select: false // Ocultar por defecto en las consultas (buena práctica)
    },
    deletedAt: {
        type: Date,
        default: null,
        select: false
    },
});

AlumnoSchema.pre('find', function (next) {
    this.where({isDeleted: false});
    next();
});

// Middleware para actualizar `updatedAt` en cada save
AlumnoSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});


AlumnoSchema.pre('save', function (next) {
    this.matricula = generarMatricula(this.fechaIngreso, this.nombre, this.apellidoPaterno);
    next();
});

export default model('Alumno', AlumnoSchema);

