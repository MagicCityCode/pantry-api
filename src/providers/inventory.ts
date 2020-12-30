import pool from '../db';
// import { TUserInventory } from '../db/models';

// This inventory is comprised of anything that's been received, not committed to a meal past or future, and not expired
function readUserAvailableInventoryWithDaysTillExpiration(userId: number): unknown {
  const queryReadUserInventory = new Promise((resolve, reject) => {
    pool.query(
      `
      SELECT
          ip.id AS Input_ID,
          ig.id AS Ingredient_ID,
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
          ig.shelf_life,
          ip.id,
          ig.id
      ORDER BY
          Item ASC,
          Unit_of_Measure ASC,
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

function readUserAllUnexpiredInventoryDaysTillExpirationUnspecified(userId: number): unknown {
  const queryReadUserInventory = new Promise((resolve, reject) => {
    pool.query(
      `
            SELECT
            ig.name AS Item,
            SUM(od.qty) AS Quantity,
            ig.uom AS Unit_of_Measure
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
            ig.uom
        ORDER BY
            Item ASC,
            Unit_of_Measure ASC;
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

export default {
  readUserAvailableInventoryWithDaysTillExpiration,
  readUserAllUnexpiredInventoryDaysTillExpirationUnspecified,
};
