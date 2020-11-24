import pool from "../db";

function readAll() {
  const values = new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM foods", function (err, results) {
      if (err) reject(err);
      else resolve(results);
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

// function readOne(id: number) {
//   return "SELECT * FROM foods WHERE id = ?", id;
// }

// const create = (
//   name: string,
//   type: string,
//   grp: string,
//   fam: string,
//   category: string,
//   color: string
// ) => (
//   "INSERT INTO foods(name, type, grp, fam, category, color) VALUES(?, ?, ?, ?, ?, ?)",
//   [name, type, grp, fam, category, color]
// );
// // Conv to obj soon & chng code such that query is INSERT INTO foods SET ?

// const udpate = (
//   name: string,
//   type: string,
//   grp: string,
//   fam: string,
//   category: string,
//   color: string,
//   id: number
// ) => (
//   "UPDATE foods SET name = ?, type = ?, grp = ?, fam = ?, category = ?, color = ? WHERE id = ?",
//   [name, type, grp, fam, category, color, id]
// );
// // Conv to obj soon & chng code such that query is UPDATE foods SET ?

// const destroy = (id: number) => ("DELETE FROM foods WHERE id = ?", id);
