-- User's available (uncommitted & unexpired) inventory
-- Note: Items committed to meals will be offset via a regular cleanup inverse transaction equivalent to meals' recipes' required ingredients * quantity, eliminating need to account for depletion here)
DROP TABLE IF EXISTS temp_table_1;

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
    u.id = '$1' -- <<< Authenticated user which will be an escape key
    AND NOT EXISTS(
        SELECT
            *
        FROM
            inputs ip
        WHERE
            ip.entry_method = 'ordered' -- <<< MVP logic plug till implementation of live/dynamically-updating order statuses for items ordered rather than physically inputted; for now this is assuming an item will be unavailable to the user until 3 days after they theoretically order it from Amazon or some other vendor with multi-day shipping timeline expected
            AND (
                EXTRACT(
                    EPOCH
                    FROM
                        ip._created
                ) / 86400 -- <<< Convert shelf life days to seconds via 60 seconds * 60 minutes * 24 hours per day = 86,400 seconds per day (wrap this in a conditional if start using anything other than default days for shelf life)
                + 3 -- <<< See note above on MVP logic plug for items ordered that must ship non locally
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
        ) / 86400 -- <<< Convert shelf life days to seconds via 60 seconds * 60 minutes * 24 hours per day = 86,400 seconds per day (wrap this in a conditional if start using anything other than default days for shelf life)
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

DROP TABLE temp_table_3;

-- User's [planned but uneaten] upcoming meals
SELECT
    r.name Meal,
    COUNT(r.id) Quantity,
    TO_CHAR(m.reserved_for_datetime, 'dd-Mon') AS Scheduled_for_Date,
FROM
    recipes r
WHERE
    EXTRACT(
        EPOCH
        FROM
            CURRENT_TIMESTAMP
    ) < EXTRACT(
        EPOCH
        FROM
            m.reserved_for_datetime
    )
    AND u.id = '$1' -- <<< Authenticated user which will be an escape key
    RIGHT JOIN meals m ON r.id = m.recipe_id
    LEFT JOIN users u ON m.user_id = u.id
ORDER BY
    m.reserved_for_datetime ASC;