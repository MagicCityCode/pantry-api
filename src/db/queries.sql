-- User's available (uncommitted & unexpired) inventory
-- Note: Items committed to meals will be offset via a regular cleanup inverse transaction equivalent to meals' recipes' required ingredients * quantity, eliminating need to account for depletion here)
SELECT
    ig.name AS Item,
    SUM(
        CASE
            WHEN (
                (
                    EXTRACT(
                        EPOCH
                        FROM
                            ip._created
                    ) + (ig.shelf_life * 24 * 60 * 60) -- <<< Convert shelf life days to seconds (wrap this in a conditional if start using anything other than default days for shelf life)
                ) > EXTRACT(
                    EPOCH
                    FROM
                        CURRENT_TIMESTAMP
                )
            ) THEN od.qty
            ELSE 0
        END
    ) AS Available_Unexpired_Quantity,
    ig.uom AS Unit_of_Measure
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
            ip.entry_method = 'ordered'
            AND (
                EXTRACT(
                    EPOCH
                    FROM
                        ip._created
                ) + 3
            ) < EXTRACT(
                EPOCH
                FROM
                    CURRENT_TIMESTAMP
            )
    )
GROUP BY
    Item,
    Unit_of_Measure;

-- User's [planned but uneaten] upcoming meals
SELECT
    r.name Meal,
    COUNT(r.id) Quantity,
    TO_CHAR(m.reserved_for_datetime, 'dd-Mon') AS Scheduled_for_Date,
FROM
    recipes r
WHERE
    DATEPART(HOUR, CURRENT_TIMESTAMP) < m.reserved_for_datetime
    AND u.id = '$1' -- <<< Authenticated user which will be an escape key
    RIGHT JOIN meals m ON r.id = m.recipe_id
    LEFT JOIN users u ON m.user_id = u.id
ORDER BY
    m.reserved_for_datetime ASC;