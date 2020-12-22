import pool from '../db';
// import { TUserInventory } from '../db/models';

// This inventory is comprised of anything that's been received, not committed to a meal past or future, and not expired
function readUserAvailableInventory(userId: number): unknown {
  const queryReadUserInventory = new Promise((resolve, reject) => {
    pool.query(
      `
      SELECT
          ig.name AS Item,
          SUM(od.qty) AS Quantity,
          ig.uom AS Unit_of_Measure,
          ig.shelf_life - ROUND(
              EXTRACT(
                  EPOCH
                  FROM
                      NOW()
              ) / 86400 - EXTRACT(
                  EPOCH
                  FROM
                      ig._created
              ) / 86400
          ) AS Days_Until_Expiration
      FROM
          ingredients ig
          RIGHT JOIN order_details od ON ig.id = od.ingredient_id
          LEFT JOIN inputs ip ON od.input_id = ip.id
          LEFT JOIN users u ON ip.user_id = u.id
      WHERE
          u.id = $1
          AND ig.shelf_life - ROUND(
              EXTRACT(
                  EPOCH
                  FROM
                      NOW()
              ) / 86400 - EXTRACT(
                  EPOCH
                  FROM
                      ig._created
              ) / 86400
          ) >= 0
          AND od.qty > 0
          AND od.qty IS NOT NULL
          AND NOT EXISTS(
              SELECT
                  *
              FROM
                  inputs ip
              WHERE
                  ip.entry_method = 'ordered'
                  AND (
                      EXTRACT(
                          EPOCH
                          FROM
                              ip._created
                      ) / 86400 + 3
                  ) < EXTRACT(
                      EPOCH
                      FROM
                          NOW()
                  ) / 86400
          )
      GROUP BY
          ig.name,
          ig.uom,
          ig._created,
          ig.shelf_life
      ORDER BY
          Days_Until_Expiration ASC;
      `,
      [userId],
      (err, results) => {
        if (err) reject(err);
        else resolve(results);
      },
    );
  });
  return queryReadUserInventory;
}

// Placeholder for future query once commitment data-update method changed
// function readUserInventoryCommittedAndUncommitted(userId: number): unknown {
//   const queryReadUserInventory = new Promise<TUserInventory[]>((resolve, reject) => {
//     pool.query(`PLACEHOLDER`, [userId], (err, results) => {
//       if (err) reject(err);
//       else resolve(results.rows);
//     });
//   });
//   return queryReadUserInventory;
// }

export default {
  readUserAvailableInventory,
  // readUserInventoryCommittedAndUncommitted,
};
