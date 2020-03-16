const router = require("express").Router();

const Ejercicio = require("../../models/ejercicio");

//GET http://localhost:3000/api/ejercicios
router.get("/", async (req, res) => {
  const rows = await Ejercicio.getAll();
  res.json(rows);
});

//GET http://localhost:3000/api/ejercicios/?
router.get("/:ejercicioId", async (req, res) => {
  const ejercicio = await Ejercicio.getById(req.params.ejercicioId);
  res.json(ejercicio);
});

//POST http://localhost:3000/api/ejercicios
router.post("/", async (req, res) => {
  const result = await Ejercicio.create(req.body);
  if (result.affectedRows === 1) {
    const ejercicio = await Ejercicio.getById(result.insertId);
    res.json(ejercicio);
  } else {
    res.json({ error: "El ejercicio no ha sido incluido" });
  }
});

//DELETE http://localhost:3000/api/ejercicios/?
router.delete("/:ejercicioId", async (req, res) => {
  const result = await Ejercicio.deleteById(req.params.ejercicioId);
  if (result.affectedRows === 1) {
    res.json({ success: "Ejercicio eliminado de la tabla" });
  } else {
    res.json({ error: "No se ha podido borrar" });
  }
});

//PUT http://localhost:3000/api/clientes/:pClienteId
router.put("/:usuarioId", async (req, res) => {
  const result = await Ejercicio.update(req.body, req.params.usuarioId)
    .then(result => res.json(result))
    .catch(err => {
      res.json({ error: "No se ha podido editar el cliente" });
    });
});
module.exports = router;
