

import { model, Schema, Types } from "mongoose";
import {hashPassword, compareHashedPassword} from '../utils/password.helper.js';
const UsuarioSchema = new Schema({
    email : {
        type : String,
        required : true,
        unique: true,
        match : [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'El email no es valido']
    },
    nombre : {
        type : String,
        required: true
    },
    password : {
        type: String,
        required : true
    },
    edad : {
        type: Number,
        required: true
    },
    rol : {
        type: Types.ObjectId,
        ref : 'Rol'
    },
    createAt : {
        type: Date,
        default: Date.now,
        inmutable: true,
    },
    updateAt : {
        type: Date,
        default: Date.now,
        select: false
    },
    deleteAt: {
        type: Date,
        default: null,
        select: false
    }
});


UsuarioSchema.pre('save', async function (next) {
    const user = this;

    if (!user.isModified('password')) {
        return next();
    }

    try {
        const hash = await hashPassword(user.password);
        user.password = hash;
        next();
    } catch (error) {
        next(error);
    }
});

UsuarioSchema.methods.compararPassword = compareHashedPassword;




export default model('Usuario', UsuarioSchema);