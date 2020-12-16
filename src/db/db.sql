DROP TABLE IF EXISTS ingredients;

CREATE TABLE ingredients (
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR UNIQUE NOT NULL,
    shelf_life VARCHAR,
    -- On 12/02/20 changed shelf_life data type to DECIMAL
    -- On 12/02/20 added col shelf_life_unit VARCHAR(30)
    storage VARCHAR DEFAULT 'refrigerator',
    uom VARCHAR,
    _created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 12/02/20
ALTER TABLE
    ingredients
ALTER COLUMN
    shelf_life TYPE decimal USING shelf_life :: numeric;

-- 12/02/20
ALTER TABLE
    ingredients
ADD
    COLUMN shelf_life_unit varchar(30);

-- Later add default value of "days"; currently assuming all inputs are in days
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

-- For MVP queries/simplicity's sake, currently assuming each meal would be 1 serving size
CREATE TABLE meals (
    user_id INT NOT NULL,
    recipe_id INT NOT NULL,
    reserved_for_date DATE,
    reserved_for_time TIME,
    -- On 12/15/20 added col reserved_for_datetime TIMESTAMP
    -- On frontend, if user chooses between breakfast/lunch/dinner, default time to 8a, 12p, 6p for sorting
    _committed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 12/15/20
ALTER TABLE
    meals
ADD
    COLUMN reserved_for_datetime TIMESTAMP;