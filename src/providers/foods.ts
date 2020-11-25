import pool from "../db";

function readAll() {
  const values = new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM foods", function (err, results) {
      if (err) reject(err);
      else {
        console.log(results);
        resolve(results);
      }
    });
  });
  return values;
}

export default {
  readAll,
  //   readOne,
  //   create,
  //   update,
  //   destroy,
};
