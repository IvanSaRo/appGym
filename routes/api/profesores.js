const router = require("express").Router();

const Profesor = require("../../models/profesor");

// GET http://localhost:3000/api/profesores
router.get("/", async (req, res) => {
  const rows = await Profesor.getAll();
  res.json(rows);
});

// GET http://localhost:3000/api/profesores/?
router.get("/:profesorId", async (req, res) => {
  const profesor = await Profesor.getById(req.params.profesorId);
  res.json(profesor);
});

// POST http://localhost:3000/api/profesores
router.post("/", async (req, res) => {
  const result = await Profesor.create(req.body);
  if (result.affectedRows === 1) {
    const profesor = await Profesor.getById(result.insertId);
    res.json(profesor);
  } else {
    res.json({ error: "Profesor no añadido" });
  }
});

// DELETE http://localhost:3000/api/profesores/?
router.delete("/:profesorId", async (req, res) => {
  const result = await Profesor.deleteById(req.params.profesorId);
  if (result.affectedRows === 1) {
    res.json({ sucess: "Profesor Borrado" });
  } else {
    res.json({ error: "No borrado" });
  }
});

//PUT http://localhost:3000/api/clientes/:pClienteId
router.put("/:usuarioId", async (req, res) => {
  const result = await Profesor.update(req.body, req.params.usuarioId)
    .then(result => res.json(result))
    .catch(err => {
      res.json({ error: "No se ha podido editar el cliente" });
    });
});
module.exports = router;
