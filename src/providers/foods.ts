import pool from "../db/db";

// Soon abstract type to interface
function createFood(
  name: string,
  type: string,
  grp: string,
  fam: string,
  category: string,
  color: string
) {
  const queryCreateFood = new Promise(function (resolve, reject) {
    pool.query(
      "INSERT INTO foods (name, type, grp, fam, category, color) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;",
      [name, type, grp, fam, category, color],
      function (err, result) {
        if (err) reject(err);
        else {
          resolve(result);
        }
      }
    );
  });
  return queryCreateFood;
}

function readFoods(id?: number) {
  if (id) {
    const queryReadOneFood = new Promise(function (resolve, reject) {
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
    return queryReadOneFood;
  } else {
    const queryReadAllFoods = new Promise(function (resolve, reject) {
      pool.query("SELECT * FROM foods;", function (err, results) {
        if (err) reject(err);
        else {
          resolve(results);
        }
      });
    });
    return queryReadAllFoods;
  }
}

// Soon abstract type to interface
function updateFood(
  name: string,
  type: string,
  grp: string,
  fam: string,
  category: string,
  color: string,
  id: number
) {
  const queryUpdateFood = new Promise(function (resolve, reject) {
    pool.query(
      "UPDATE foods SET name = $1, type = $2, grp = $3, fam = $4, category = $5, color = $6 WHERE id = $7 RETURNING *;",
      [name, type, grp, fam, category, color, id],
      function (err, result) {
        if (err) reject(err);
        else {
          resolve(result);
        }
      }
    );
  });
  return queryUpdateFood;
}

function deleteFood(id: number) {
  const queryDeleteFood = new Promise(function (resolve, reject) {
    pool.query("DELETE FROM foods WHERE id = $1 RETURNING *;", [id], function (err, result) {
      if (err) reject(err);
      else {
        resolve(result);
      }
    });
  });
  return queryDeleteFood;
}

export default {
  createFood,
  readFoods,
  updateFood,
  deleteFood,
};
