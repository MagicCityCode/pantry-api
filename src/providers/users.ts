/* eslint-disable prettier/prettier */
import pool from '../db';
import type { TUsers } from '../db/models';

// Soon abstract type to interface
function createUser(email: string, pw: string, firstName: string, lastName: string): unknown {
  const queryCreateUser = new Promise((resolve, reject) => {
    pool.query(
      'INSERT INTO users (email, pw, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING *;',
      [email, pw, firstName, lastName],
      (err, result) => {
        if (err) reject(err);
        else {
          resolve(result);
        }
      }
    );
  });
  return queryCreateUser;
}

function readUsers(id?: number): unknown {
  if (id) {
    const queryReadOneUser = new Promise<TUsers>((resolve, reject) => {
      pool.query('SELECT * FROM users WHERE id = $1;', [id], (err, result) => {
        if (err) reject(err);
        else {
          resolve(result.rows[0]);
        }
      });
    });
    return queryReadOneUser;
  }
  const queryReadAllUsers = new Promise<TUsers[]>((resolve, reject) => {
    pool.query('SELECT * FROM users;', (err, results) => {
      if (err) reject(err);
      else {
        resolve(results.rows);
      }
    });
  });
  return queryReadAllUsers;
}

// Soon abstract type to interface
function updateUser(email: string, pw: string, firstName: string, lastName: string, id: number): unknown {
  const queryUpdateUser = new Promise((resolve, reject) => {
    pool.query(
      'UPDATE users SET email = $1, pw = $2, first_name = $3, last_name = $4 WHERE id = $5 RETURNING *;',
      [email, pw, firstName, lastName, id],
      (err, result) => {
        if (err) reject(err);
        else {
          resolve(result);
        }
      },
    );
  });
  return queryUpdateUser;
}

function deleteUser(id: number): unknown {
  const queryDeleteUser = new Promise((resolve, reject) => {
    pool.query('DELETE FROM users WHERE id = $1 RETURNING *;', [id], (err, result) => {
      if (err) reject(err);
      else {
        resolve(result);
      }
    });
  });
  return queryDeleteUser;
}

// For auth
function findUserByEmail(email: string): unknown {
  const queryFindUser = new Promise<TUsers>((resolve, reject) => {
    pool.query('SELECT * FROM users WHERE email = $1;', [email], (err, result) => {
      if (err) reject(err);
      else {
        resolve(result.rows[0]);
      }
    });
  });
  return queryFindUser;
}

// Refactor later since pg's default return is a promise, don't need to specify new Promise above...
// function test() {
//   return pool
//     .query('SELECT * FROM users WHERE email = test@test.com;')
//     .then((res) => console.log(res));
// }

export default {
  createUser,
  readUsers,
  updateUser,
  deleteUser,
  findUserByEmail,
};
