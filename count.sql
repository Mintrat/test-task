SELECT *
FROM product as p1
INNER JOIN (
  SELECT MAX(id) as max_id, id_collection FROM product
  GROUP BY id_collection
) as p2
ON p1.id = p2.max_id OR p1.id = (
    SELECT id FROM product
    WHERE p2.max_id != p1.id
    GROUP by id DESC
    LIMIT 1
)