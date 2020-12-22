-- User's available (uncommitted & unexpired) inventory
-- Note: Items committed to meals will be offset via a regular cleanup inverse transaction equivalent to meals' recipes' required ingredients * quantity, eliminating need to account for depletion here
-- Note: Items used (ie items committed to meals whose scheduled timeslot has already transpired) will be offset via a regular cleanup inverse transaction similarly to above
SELECT
    ig.name AS Item,
    SUM(od.qty) AS Quantity,
    ig.uom AS Unit_of_Measure,
    ig.shelf_life - ROUND(
        EXTRACT(
            EPOCH
            FROM
                NOW()
        ) / 86400 -- <<< Convert shelf life days to seconds via 60 seconds * 60 minutes * 24 hours per day = 86,400 seconds per day (wrap this in a conditional if start using anything other than default days for shelf life)
        - EXTRACT(
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
    u.id = '$1' -- <<< Authenticated user which will be an escape key
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
            ip.entry_method = 'ordered' -- <<< MVP logic plug till implementation of live/dynamically-updating order statuses for items ordered rather than physically inputted; for now this is assuming an item will be unavailable to the user until 3 days after they theoretically order it from Amazon or some other vendor with multi-day shipping timeline expected
            AND (
                EXTRACT(
                    EPOCH
                    FROM
                        ip._created
                ) / 86400 + 3 -- <<< See note above on MVP logic plug for items ordered that must ship non locally
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