
const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({rol});
    if (!existeRol) {
      throw new Error(`Rol ${rol} no válido`);
    }
  }


  const emailExiste = async (email = '') => {
    const existeEmail = await Usuario.findOne({email});
    if (existeEmail) {
      throw new Error(`Email ${email} ya existente`);
    }
}
    const existeUsuarioPorId = async (id = '') => {
        const existeUsuario = await Usuario.findById({id});
        if (!existeUsuario) {
          throw new Error(`El id ${id} no existe`);
        }
      }

    
  module.exports = {
      esRoleValido,
      emailExiste,
      existeUsuarioPorId }