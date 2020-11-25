import pool from "../db";

// Soon abstract type to interface
function create(
  name: string,
  type: string,
  grp: string,
  fam: string,
  category: string,
  color: string
) {
  const queryCreate = new Promise(function (resolve, reject) {
    pool.query(
      "INSERT INTO foods (name, type, grp, fam, category, color) VALUES ($1, $2, $3, $4, $5, $6);",
      [name, type, grp, fam, category, color],
      function (err, result) {
        if (err) reject(err);
        else {
          resolve(result);
        }
      }
    );
  });
  return queryCreate;
}

function read(id?: number) {
  if (id) {
    const queryReadOne = new Promise(function (resolve, reject) {
      pool.query(
        "SELECT * FROM foods WHERE id = $1;",
        [id],
        function (err, result) {
          if (err) reject(err);
          else {
            resolve(result);
          }
        }
      );
    });
    return queryReadOne;
  } else {
    const queryReadAll = new Promise(function (resolve, reject) {
      pool.query("SELECT * FROM foods;", function (err, results) {
        if (err) reject(err);
        else {
          resolve(results);
        }
      });
    });
    return queryReadAll;
  }
}

// Soon abstract type to interface
function update(
  name: string,
  type: string,
  grp: string,
  fam: string,
  category: string,
  color: string,
  id: number
) {
  const queryUpdate = new Promise(function (resolve, reject) {
    pool.query(
      "UPDATE foods SET name = $1, type = $2, grp = $3, fam = $4, category = $5, color = $6 WHERE id = $7;",
      [name, type, grp, fam, category, color, id],
      function (err, result) {
        if (err) reject(err);
        else {
          resolve(result);
        }
      }
    );
  });
  return queryUpdate;
}

function destroy(id: number) {
  const queryDestroy = new Promise(function (resolve, reject) {
    pool.query("DELETE FROM foods WHERE id = $1", [id], function (err, result) {
      if (err) reject(err);
      else {
        resolve(result);
      }
    });
  });
  return queryDestroy;
}

export default {
  create,
  read,
  update,
  destroy,
};
