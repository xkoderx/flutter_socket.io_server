const { Router } = require("express");
const { crearUsuario, login, renewToken } = require("../controllers/auth");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const router = Router();
router.post(
  "/new",
  [
    check("nombre", "el nombre es obligatorio").not().isEmpty(),
    check("email", "el email es obligatorio").not().isEmpty(),
    check("password", "el pass es obligatorio").not().isEmail(),
    validarCampos,
  ],
  crearUsuario
);
router.post("/", [
  check("email", "el email es obligatorio").not().isEmpty(),
  check("password", "el pass es obligatorio").not().isEmail(),
  login,
]);
router.get("/renew", validarJWT, renewToken);
module.exports = router;
