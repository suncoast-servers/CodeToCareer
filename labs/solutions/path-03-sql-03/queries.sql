SELECT lab.customers.email, lab.orders.amount_cents
FROM lab.orders
INNER JOIN lab.customers ON lab.orders.email = lab.customers.email;
