import pool from "../db";

// Soon abstract type to interface
function createUser(username: string, email: string, pw: string) {
  const queryCreateUser = new Promise(function (resolve, reject) {
    pool.query(
      "INSERT INTO users (username, email, pw) VALUES ($1, $2, $3) RETURNING *;",
      [username, email, pw],
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

function readUsers(id?: number) {
  if (id) {
    const queryReadOneUser = new Promise(function (resolve, reject) {
      pool.query(
        "SELECT * FROM users WHERE id = $1;",
        [id],
        function (err, result) {
          if (err) reject(err);
          else {
            resolve(result);
          }
        }
      );
    });
    return queryReadOneUser;
  } else {
    const queryReadAllUsers = new Promise(function (resolve, reject) {
      pool.query("SELECT * FROM users;", function (err, results) {
        if (err) reject(err);
        else {
          resolve(results);
        }
      });
    });
    return queryReadAllUsers;
  }
}

// Soon abstract type to interface
function updateUser(username: string, email: string, pw: string, id: number) {
  const queryUpdateUser = new Promise(function (resolve, reject) {
    pool.query(
      "UPDATE users SET username = $1, email = $2, pw = $3 WHERE id = $4 RETURNING *;",
      [username, email, pw, id],
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

export default {
  createUser,
  readUsers,
  updateUser,
  deleteUser,
};
