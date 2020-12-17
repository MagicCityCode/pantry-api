import pool from '../db';
import { TUserInventory } from '../db/models';

function readUserInventory(userId: number): unknown {
  const queryReadUserInventory = new Promise<TUserInventory[]>((resolve, reject) => {
    pool.query(
      `DROP TABLE IF EXISTS temp_table_1;
       CREATE TEMP TABLE temp_table_1 AS
       SELECT
           ig.name AS Item,
           SUM(od.qty) AS Quantity,
           ig.uom AS Unit_of_Measure,
           ig._created AS Item_Stored_Date,
           NOW() AS Now,
           ig.shelf_life AS Shelf_Life
       FROM
           ingredients ig
           RIGHT JOIN order_details od ON ig.id = od.ingredient_id
           LEFT JOIN inputs ip ON od.input_id = ip.id
           LEFT JOIN users u ON ip.user_id = u.id
       WHERE
           u.id = $1
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
           Item,
           Unit_of_Measure,
           ig._created,
           ig.shelf_life;
       DROP TABLE IF EXISTS temp_table_2;
       CREATE TEMP TABLE temp_table_2 AS
       SELECT
           tt1.item,
           SUM(tt1.quantity) AS Quantity,
           tt1.unit_of_measure,
           ROUND(
               SUM(
                   EXTRACT(
                       EPOCH
                       FROM
                           tt1.now
                   ) - EXTRACT(
                       EPOCH
                       FROM
                           tt1.item_stored_date
                   )
               ) / 86400
           ) AS Days_Since_Stored,
           tt1.shelf_life AS Shelf_Life
       FROM
           temp_table_1 tt1
       WHERE
           tt1.Quantity > 0
           AND tt1.Quantity IS NOT NULL
       GROUP BY
           tt1.item,
           tt1.unit_of_measure,
           tt1.shelf_life
       ORDER BY
           Days_Since_Stored ASC;
       DROP TABLE IF EXISTS temp_table_3;
       CREATE TEMP TABLE temp_table_3 AS
       SELECT
           tt2.item,
           tt2.quantity,
           tt2.unit_of_measure,
           SUM(tt2.shelf_life - tt2.days_since_stored) AS Days_Until_Expiration
       FROM
           temp_table_2 tt2
       GROUP BY
           tt2.item,
           tt2.quantity,
           tt2.unit_of_measure;
       SELECT
           *
       FROM
           temp_table_3
       WHERE
           days_until_expiration >= 0;
       DROP TABLE temp_table_1;
       DROP TABLE temp_table_2;
       DROP TABLE temp_table_3;`,
      [userId],
      (err, results) => {
        if (err) reject(err);
        else resolve(results.rows);
      },
    );
  });
  return queryReadUserInventory;
}

export default {
  readUserInventory,
};
