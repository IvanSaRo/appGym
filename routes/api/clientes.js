const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const Cliente = require("../../models/cliente");

//GET hhtp://localhost:3000/api/clientes
router.get("/", async (req, res) => {
  const rows = await Cliente.getAll();
  res.json(rows);
});

// GET http://localhost:3000/api/clientes/?
router.get("/:clienteId", async (req, res) => {
  const cliente = await Cliente.getById(req.params.clienteId);
  res.json(cliente);
});

//POST http://localhost:3000/api/clientes/

router.post(
  "/",
  [
    check("nombre").isLength({ min: 2 }),
    check("apellidos").isLength({ min: 2 }),
    check("direccion").isLength({ min: 5 }),
    check("email").isEmail(),
    check("edad").isNumeric(),
    check("sexo").isLength({ min: 1 }),
    check("cuota").isDecimal(),
    check("fecha_nacimiento"),
    check("dni").custom(value => {
      return /^[a-zA-Z0-9]{5,10}$/.test(value);
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json(errors.array());
    }
    const result = await Cliente.create(req.body);
    res.json(result);
  }
);

//DELETE http://localhost:3000/api/cliente/?
router.delete("/:clienteId", async (req, res) => {
  const result = await Cliente.deleteById(req.params.clienteId);
  if (result.affectedRows === 1) {
    res.json({ success: "Cliente borrado" });
  } else {
    res.json({ error: "No se ha borrado" });
  }
});

//PUT http://localhost:3000/api/clientes/:pClienteId
router.put("/:pClienteId", async (req, res) => {
  const result = await Cliente.update(req.body, req.params.pClienteId)
    .then(result => res.json(result))
    .catch(err => {
      res.json({ error: "No se ha podido editar el cliente" });
    });
});

module.exports = router;
