
const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');



const usuariosGet = async (req = request, res = response) => {



    //TODO:Validacion extra comprobar que mandan numeros y no letras como argumento
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true }

    const [total,usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);


res/*status(200)*/.json({
    msg: 'get Api controllador',
    total,
    usuarios

});
}

const usuariosPut = async (req, res = response) => {
    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    if (password) {

        //hash contraseña
        const salt = bcryptjs.genSaltSync(/*numero de vueltas de la encriptacon*/);
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);


    res/*status(200)*/.json({
        msg: 'put Api controllador',
        usuario
    });
}

const usuariosPost = async (req, res = response) => {


    //const {nombre,edad} = req.body;
    //const body = req.body;
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });


    //verificar existencia email
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        return res.status(400).json({ msg: 'Correo ya existente' });
    }

    //hash contraseña
    const salt = bcryptjs.genSaltSync(/*numero de vueltas de la encriptacon*/);
    usuario.password = bcryptjs.hashSync(password, salt);


    //guardar db
    await usuario.save();

    res/*status(200)*/.json({
        msg: 'post Api controllador',
        usuario
    });
}

const usuariosDelete = async(req, res = response) => {
const  {id} = req.params;


//Borrarlo fisicamente
//const usuario = await Usuario.findByIdAndDelete(id);    

//Borrarlo logicamente
const usuario = await Usuario.findByIdAndUpdate(id,{estado:false});

    res/*status(200)*/.json({
        msg: 'del Api controllador',
        usuario

    });
}

const usuariosPatch = (req, res = response) => {
    res/*status(200)*/.json({
        msg: 'patch Api controllador'
    });
}



module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete
}

