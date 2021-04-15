const {response} = require('express');


const usuariosGet =  (req = request, res = response)=>{

const {q,nombre = 'noname',apikey, page = 1, limit} = req.query;

    res/*status(200)*/.json({
         msg: 'get Api controllador',
         q,nombre,apikey,page,limit
         
    });
  }

  const usuariosPut = (req, res = response)=>{
    const id = req.params.id; //Si vienen mas de 1 id {id} desestructuras.

    res/*status(200)*/.json({
         msg: 'put Api controllador',
         id
    });
  }

  const usuariosPost =  (req, res = response)=>{

    const {nombre,edad} = req.body;


    res/*status(200)*/.json({
         msg: 'post Api controllador',
         nombre,edad
    });
  }

  const usuariosDelete =  (req, res = response)=>{
    res/*status(200)*/.json({
         msg: 'del Api controllador'
    });
  }
 
  const usuariosPatch =  (req, res = response)=>{
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

  