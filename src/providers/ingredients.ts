import pool from '../db';

function createIngredient(
  name: string,
  shelfLife: number,
  shelfLifeUnit: string,
  storage: string,
  uom: string,
) {
  const queryCreateIngredient = new Promise((resolve, reject) => {
    pool.query(
      'INSERT INTO ingredients (name, shelf_life, shelf_life_unit, storage, uom) VALUES ($1, $2, $3, $4, $5) RETURNING *;',
      [name, shelfLife, shelfLifeUnit, storage, uom],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      },
    );
  });
  return queryCreateIngredient;
}

function readIngredients(id?: number) {
  if (id) {
    const queryReadOneIngredient = new Promise((resolve, reject) => {
      pool.query('SELECT * FROM ingredients WHERE id = $1;', [id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
    return queryReadOneIngredient;
  }
  const queryReadAllIngredients = new Promise((resolve, reject) => {
    pool.query('SELECT * FROM ingredients;', (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
  return queryReadAllIngredients;
}

// Add patch functionality soon
function updateIngredient(
  name: string,
  shelfLife: number,
  shelfLifeUnit: string,
  storage: string,
  uom: string,
  id: number,
) {
  const queryUpdateIngredient = new Promise((resolve, reject) => {
    pool.query(
      'UPDATE ingredients SET name = $1, shelf_life = $2, shelf_life_unit = $3, storage = $4, uom = $5 WHERE id = $6 RETURNING *;',
      [name, shelfLife, shelfLifeUnit, storage, uom, id],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      },
    );
  });
  return queryUpdateIngredient;
}

function deleteIngredient(id: number) {
  const queryDeleteIngredient = new Promise((resolve, reject) => {
    pool.query('DELETE FROM ingredients WHERE id = $1 RETURNING *;', [id], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
  return queryDeleteIngredient;
}

export default {
  createIngredient,
  readIngredients,
  updateIngredient,
  deleteIngredient,
};
