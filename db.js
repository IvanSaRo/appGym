const mysql = require("mysql");
//se puede copiar para otra conexion a BBDD
exports.connect = () => {
  const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE
  });

  global.db = pool; //cuando nos conectemos a db nos devuelve pool(de conexiones)
  // vamos a app.js
};
