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