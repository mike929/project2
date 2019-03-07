-- Create the database
DROP DATABASE IF EXISTS analysis_db;
CREATE DATABASE analysis_db;
USE analysis_db;

-- Create the table burgers
CREATE TABLE search
(
	id INT NOT NULL AUTO_INCREMENT,
	search_term VARCHAR(255) NOT NULL,
	date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id)
);
