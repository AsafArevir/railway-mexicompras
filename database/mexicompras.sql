CREATE DATABASE mexicompras;

USE DATABASE mexicompras;

-- TABLE USER
-- all pasword wil be encrypted using SHA1
CREATE TABLE users (
  id INT(11) NOT NULL,
  username VARCHAR(16) NOT NULL,
  password VARCHAR(60) NOT NULL,
  fullname VARCHAR(100) NOT NULL
);

ALTER TABLE users
ADD PRIMARY KEY (id);

ALTER TABLE users
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT;

DESCRIBE users;

INSERT INTO users (id, username, password, fullname) 
  VALUES (1, 'john', 'password1', 'John Carter');

SELECT * FROM users;
---------------------------------------------------------------
-- LINKS TABLE NOT USED FOR THE PROYECT
CREATE TABLE links (
  id INT(11) NOT NULL,
  title VARCHAR(150) NOT NULL,
  url VARCHAR(255) NOT NULL,
  description TEXT,
  user_id INT(11),
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id)
);

ALTER TABLE links
  ADD PRIMARY KEY (id);

ALTER TABLE links
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT;
DESCRIBE links;

-------------------------------------------------------
--TABLE ps
CREATE TABLE ps(
    id int(11) NOT NULL,
    user_id INT(11) NOT NULL,
    category VARCHAR(65) NOT NULL,
    nameps VARCHAR(65) NOT NULL,
    description TEXT,
    precio float,
    cantidad INT,
    fecha timestamp NOT NULL DEFAULT current_timestamp,
    total INT,
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id)
);
ALTER TABLE ps
  ADD PRIMARY KEY (id);

ALTER TABLE ps
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT;

DESCRIBE ps
-------------------------------------------------------------------
--TABLE BUDGET

CREATE TABLE budget(
    id int(11) NOT NULL,
    user_id INT(11) NOT NULL,
    fechai date,
    fechaf date,
    pinit float,
    pend float,
    CONSTRAINT fk_userb FOREIGN KEY(user_id) REFERENCES users(id)
);
ALTER TABLE budget
  ADD PRIMARY KEY (id);

ALTER TABLE budget
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT;
DESCRIBE budget;