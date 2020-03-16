const getAll = () => {
  return new Promise((resolve, reject) => {
    db.query("select * from profesores", (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
};

const getById = pProfesor => {
  return new Promise((resolve, reject) => {
    db.query(
      "select * from profesores where id = ?",
      [pProfesor],
      (err, rows) => {
        if (err) reject(err);
        if (rows.length === 0) {
          resolve(null);
        }
        resolve(rows[0]);
      }
    );
  });
};

const create = ({ nombre, experiencia }) => {
  return new Promise((resolve, reject) => {
    db.query(
      "insert into profesores (nombre, experiencia) values (?, ?)",
      [nombre, experiencia],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

const deleteById = pProfesorId => {
  return new Promise((resolve, reject) => {
    db.query(
      "delete from profesores where id = ?",
      [pProfesorId],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

const update = (pBody, pUsuarioId) => {
  return new Promise((resolve, reject) => {
    db.query(
      "update profesores set nombre = ?, experiencia = ? where id = " +
        pUsuarioId,
      [pBody.nombre, pBody.experiencia],
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
