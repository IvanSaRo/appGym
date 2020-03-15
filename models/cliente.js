const getAll = () => {
  return new Promise((resolve, reject) => {
    db.query("select * from clientes", (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
};

const getById = pCLiente => {
  return new Promise((resolve, reject) => {
    db.query("select * from clientes where id = ?", [pCLiente], (err, rows) => {
      console.log(rows);
      if (err) reject(err);
      // como devuelve en forma de array que puede estar vacío hago el siguiente if
      if (rows.length === 0) {
        resolve(null);
      }
      resolve(rows[0]);
    });
  });
};

const create = ({
  nombre,
  apellidos,
  direccion,
  email,
  edad,
  sexo,

  cuota,
  fecha_nacimiento,
  dni
}) => {
  return new Promise((resolve, reject) => {
    db.query(
      "insert into clientes (nombre, apellidos, direccion, email, edad, sexo, fecha_inscripcion, cuota, fecha_nacimiento, dni) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        nombre,
        apellidos,
        direccion,
        email,
        edad,
        sexo,
        new Date(),
        cuota,
        fecha_nacimiento,
        dni
      ],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

const deleteById = pCLienteId => {
  return new Promise((resolve, reject) => {
    db.query(
      "delete from clientes where id = ?",
      [pCLienteId],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

const update = (pBody, pClienteId) => {
  return new Promise((resolve, reject) => {
    db.query(
      "update clientes set ? where id = " + pClienteId,
      [pBody],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};
module.exports = {
  getAll: getAll,
  getById: getById,
  create: create,
  deleteById: deleteById,
  update: update
};
