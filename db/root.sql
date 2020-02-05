CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(75),
    password VARCHAR(250),
    email VARCHAR,
    profile_img VARCHAR,
    is_admin BOOLEAN
)

CREATE TABLE packages (
   id PRIMARY SERIAL KEY,
   name VARCHAR 
)

CREATE TABLE package_contents (
package_id SERIAL PRIMARY KEY,
name VARCHAR,
qty INT
)

CREATE TABLE users_orders (
user_order_id SERIAL PRIMARY KEY,
id INT REFERENCES users(id),
paid BOOLEAN,
package INT,
qty INT,
price INT,
shipping_price INT,
address VARCHAR
);