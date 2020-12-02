DROP TABLE IF EXISTS ingredients;

CREATE TABLE ingredients (
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR UNIQUE NOT NULL,
    shelf_life VARCHAR,
    storage VARCHAR DEFAULT 'refrigerator',
    uom VARCHAR,
    _created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL NOT NULL PRIMARY KEY,
    email VARCHAR NOT NULL UNIQUE,
    pw VARCHAR NOT NULL,
    first_name VARCHAR,
    last_name VARCHAR,
    role VARCHAR DEFAULT 'guest',
    _created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS inputs CASCADE;

CREATE TABLE inputs (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    entry_method VARCHAR(30),
    _created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT u_id FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS order_details CASCADE;

CREATE TABLE order_details (
    input_id INT NOT NULL,
    ingredient_id INT NOT NULL,
    qty DECIMAL NOT NULL,
    CONSTRAINT order_id FOREIGN KEY(input_id) REFERENCES inputs(id) ON DELETE CASCADE,
    CONSTRAINT ingred_id FOREIGN KEY(ingredient_id) REFERENCES ingredients(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS recipes CASCADE;

CREATE TABLE recipes (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR NOT NULL,
    ingredient_id INT NOT NULL,
    qty DECIMAL NOT NULL,
    preparation_method VARCHAR,
    url VARCHAR,
    CONSTRAINT ingred_id FOREIGN KEY(ingredient_id) REFERENCES ingredients(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS meals;

CREATE TABLE meals (
    user_id INT NOT NULL,
    recipe_id INT NOT NULL,
    reserved_for_date DATE,
    reserved_for_time TIME,
    _committed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);