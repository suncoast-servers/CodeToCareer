SELECT email, COUNT(*)
FROM lab.orders
GROUP BY email;
