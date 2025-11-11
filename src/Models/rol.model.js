import { model, Schema, Types } from "mongoose";


const RolSchema = new Schema({
    nombre: {
        type:String,
        required : true,
        unique: true
    }
});

export default model('Rol', RolSchema);