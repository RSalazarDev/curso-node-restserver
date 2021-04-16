const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPut, usuariosDelete, usuariosPost, usuariosPatch } = require('../controllers/usuarios');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const Role = require('../models/role')

const router = Router();







router.get('/', usuariosGet);



router.put('/:id', [
  check('id', 'No es un id valido').isMongoId(),
  check('id').custom(existeUsuarioPorId),
  check('rol').custom(esRoleValido),
  validarCampos
],
  usuariosPut);



router.delete('/:id', [
  check('id', 'No es un id valido').isMongoId(),
  check('id').custom(existeUsuarioPorId),
  validarCampos
],
  usuariosDelete);



router.post('/',
  [
    check('nombre', 'El nombre no es valido').not().isEmpty(),
    check('password', 'Pass debe ser mayor de 6 letras').isLength({ min: 6 }),
    check('correo', 'Correo no valido').isEmail().custom(emailExiste),
    check('rol').custom(esRoleValido),
    validarCampos
  ],
  usuariosPost);



router.patch('/', usuariosPatch);








module.exports = router;