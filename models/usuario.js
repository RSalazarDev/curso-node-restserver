const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    nombre:{
        type:String,
        required: [true, 'Nombre obligatorio'],
    },
    correo:{
        type: String,
        required: [true, 'Correo obligatorio'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'Contraseña obligatoria'],
    },
    img:{
        type: String,
    },
    rol:{
        type: String,
        required: [true, 'Correo obligatorio'],
        enum: ['ADMIN_ROLE', 'USER_ROLE', 'VENTAS_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    }
});

UsuarioSchema.methods.toJSON = function(){
    const{__v,password,...usuario}=this.toObject();
    return usuario;
}

//Mongoose le añade el solo una s Usuario -> Usuarios  Producto-> Productos
module.exports = model('Usuario', UsuarioSchema);
