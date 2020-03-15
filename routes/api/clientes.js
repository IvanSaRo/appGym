const router = require("express").Router();

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
router.post("/", async (req, res) => {
  const result = await Cliente.create(req.body);
  if (result.affectedRows === 1) {
    const cliente = await Cliente.getById(result.insertId);
    res.json(cliente);
  } else {
    res.json({ error: "El cliente no se ha insertado" });
  }
});

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
  const result = await Cliente.update(req.body, req.params.pClienteId);
  res.json(result);
});

module.exports = router;
