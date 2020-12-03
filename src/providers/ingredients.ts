import pool from "../db";

function createIngredient(
  name: string,
  shelf_life: number,
  shelf_life_unit: string,
  storage: string,
  uom: string
) {
  const queryCreateIngredient = new Promise(function (resolve, reject) {
    pool.query(
      "INSERT INTO ingredients (name, shelf_life, shelf_life_unit, storage, uom) VALUES ($1, $2, $3, $4, $5) RETURNING *;",
      [name, shelf_life, shelf_life_unit, storage, uom],
      function (err, result) {
        if (err) reject(err);
        else {
          resolve(result);
        }
      }
    );
  });
  return queryCreateIngredient;
}

function readIngredients(id?: number) {
  if (id) {
    const queryReadOneIngredient = new Promise(function (resolve, reject) {
      pool.query(
        "SELECT * FROM ingredients WHERE id = $1;",
        [id],
        function (err, result) {
          if (err) reject(err);
          else {
            resolve(result);
          }
        }
      );
    });
    return queryReadOneIngredient;
  } else {
    const queryReadAllIngredients = new Promise(function (resolve, reject) {
      pool.query("SELECT * FROM ingredients;", function (err, results) {
        if (err) reject(err);
        else {
          resolve(results);
        }
      });
    });
    return queryReadAllIngredients;
  }
}

// Add patch functionality soon
function updateIngredient(
  name: string,
  shelf_life: number,
  shelf_life_unit: string,
  storage: string,
  uom: string,
  id: number
) {
  const queryUpdateIngredient = new Promise(function (resolve, reject) {
    pool.query(
      "UPDATE ingredients SET name = $1, shelf_life = $2, shelf_life_unit = $3, storage = $4, uom = $5 WHERE id = $6 RETURNING *;",
      [name, shelf_life, shelf_life_unit, storage, uom, id],
      function (err, result) {
        if (err) reject(err);
        else {
          resolve(result);
        }
      }
    );
  });
  return queryUpdateIngredient;
}

function deleteIngredient(id: number) {
  const queryDeleteIngredient = new Promise(function (resolve, reject) {
    pool.query(
      "DELETE FROM ingredients WHERE id = $1 RETURNING *;",
      [id],
      function (err, result) {
        if (err) reject(err);
        else {
          resolve(result);
        }
      }
    );
  });
  return queryDeleteIngredient;
}

export default {
  createIngredient,
  readIngredients,
  updateIngredient,
  deleteIngredient,
};
