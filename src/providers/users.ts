import pool from "../db";
import type { TUsers } from "../db/models";

// Soon abstract type to interface
function createUser(
  email: string,
  pw: string,
  first_name: string,
  last_name: string
) {
  const queryCreateUser = new Promise(function (resolve, reject) {
    pool.query(
      "INSERT INTO users (email, pw, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING *;",
      [email, pw, first_name, last_name],
      function (err, result) {
        if (err) reject(err);
        else {
          resolve(result);
        }
      }
    );
  });
  return queryCreateUser;
}

function readUsers(id?: number): any {
  if (id) {
    const queryReadOneUser = new Promise<TUsers>(function (resolve, reject) {
      pool.query(
        "SELECT * FROM users WHERE id = $1;",
        [id],
        function (err, result) {
          if (err) reject(err);
          else {
            resolve(result.rows[0]);
          }
        }
      );
    });
    return queryReadOneUser;
  } else {
    const queryReadAllUsers = new Promise<TUsers>(function (resolve, reject) {
      pool.query("SELECT * FROM users;", function (err, results) {
        if (err) reject(err);
        else {
          resolve(results.rows[0]);
        }
      });
    });
    return queryReadAllUsers;
  }
}

// Soon abstract type to interface
function updateUser(
  email: string,
  pw: string,
  first_name: string,
  last_name: string,
  id: number
) {
  const queryUpdateUser = new Promise(function (resolve, reject) {
    pool.query(
      "UPDATE users SET email = $1, pw = $2, first_name = $3, last_name = $4 WHERE id = $5 RETURNING *;",
      [email, pw, first_name, last_name, id],
      function (err, result) {
        if (err) reject(err);
        else {
          resolve(result);
        }
      }
    );
  });
  return queryUpdateUser;
}

function deleteUser(id: number) {
  const queryDeleteUser = new Promise(function (resolve, reject) {
    pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING *;",
      [id],
      function (err, result) {
        if (err) reject(err);
        else {
          resolve(result);
        }
      }
    );
  });
  return queryDeleteUser;
}

// For auth
function findUserByEmail(email: string): any {
  const queryFindUser = new Promise<TUsers>(function (resolve, reject) {
    pool.query(
      "SELECT * FROM users WHERE email = $1;",
      [email],
      function (err, result) {
        if (err) reject(err);
        else {
          resolve(result.rows[0]);
        }
      }
    );
  });
  return queryFindUser;
}

// Refactor later since pg's default return is a promise, don't need to specify new Promise above...
// function test() {
//   return pool
//     .query("SELECT * FROM users WHERE email = test@test.com;")
//     .then((res) => console.log(res));
// }

// type user = {
//   id: number;
//   email: string;
//   pw: string;
//   first_name: string;
//   last_name: string;
//   _created: string;
// };

export default {
  createUser,
  readUsers,
  updateUser,
  deleteUser,
  findUserByEmail,
};
