CREATE TABLE IF NOT EXISTS lab.orders (
    order_id INT PRIMARY KEY,
    email TEXT NOT NULL,
    amount_cents INT NOT NULL
);

INSERT INTO lab.orders (order_id, email, amount_cents)
VALUES (1, 'learner@example.com', 2500)
ON CONFLICT (order_id) DO NOTHING;
