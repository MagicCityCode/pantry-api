-- User's available (uncommitted & unexpired) inventory
SELECT
    i.name 'Ingredient',
    SUM(
        CASE
            o.qty
            WHEN (CURRENT_TIMESTAMP - n._created) <=
            AND i.shelf_life
        ) 'Quantity',
        i.uom 'Unit_of_Measure'
        FROM
            ingredients i
        WHERE
            NOT EXISTS(
                SELECT
                    *
                FROM
                    inputs n
                WHERE
                    n.entry_method = 'ordered'
                    AND (n._created + 3) < CURRENT_TIMESTAMP
            )
            AND u.id = ?
            RIGHT JOIN order_details o ON i.id = o.ingredient_id
            FULL OUTER JOIN n ON o.input_id = n.user_id
            FULL OUTER JOIN users u ON n.user_id = u.id
        GROUP BY
            'Ingredient',
            'Unit_of_Measure';

-- User's planned but uneaten upcoming meals
SELECT
    r.name 'Meal',
    COUNT(r.id) 'Quantity',
    m.reserved_for_date 'Scheduled_Date',
    m.reserved_for_time 'Scheduled_Time'
FROM
    recipes r
WHERE
    DATEPART(HOUR, CURRENT_TIMESTAMP) > CONCAT(
        DATEPART(HOUR, m.reserved_for_date),
        DATEPART(HOUR, m.reserved_for_time)
    )
    AND u.id = ?
    FULL OUTER JOIN meals m ON r.id = m.recipe_id
    FULL OUTER JOIN users u ON m.user_id = u.id
ORDER BY
    CONCAT(
        DATEPART(HOUR, m.reserved_for_date),
        DATEPART(HOUR, m.reserved_for_time)
    ) ASC;