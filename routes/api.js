const router = require("express").Router();
const apiProfesoresRouter = require("./api/profesores");
const apiEjerciciosRouter = require("./api/ejercicios");
const apiClientesRouter = require("./api/clientes");
router.use("/profesores", apiProfesoresRouter);
router.use("/ejercicios", apiEjerciciosRouter);
router.use("/clientes", apiClientesRouter);
module.exports = router;
