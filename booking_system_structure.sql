-- enable the uuid-ossp extension 
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- enable crypto functions
CREATE EXTENSION pgcrypto;

CREATE TABLE IF NOT EXISTS acce_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(15) CHECK (role IN ('reserver', 'administrator')) NOT NULL,
    two_factor_secret VARCHAR(255),
    birthdate DATE NOT NULL,
    two_factor_enabled BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS acce_reservations (
    reservation_id SERIAL PRIMARY KEY,
    reserver_token INT REFERENCES acce_users(id) ON DELETE CASCADE,
    resource_id INT REFERENCES loot3ed_resources(resource_id),
    reservation_start TIMESTAMP NOT NULL,
    reservation_end TIMESTAMP NOT NULL,
    CHECK (reservation_end > reservation_start)
);

CREATE TABLE IF NOT EXISTS loot3ed_resources (
    resource_id SERIAL PRIMARY KEY,
    resource_name VARCHAR(100) NOT NULL,
    resource_description TEXT
);

-- CREATE TABLE IF NOT EXISTS L00t3d_sessions (
--     id SERIAL PRIMARY KEY,
--     user_id INT NOT NULL REFERENCES acce_users(id),
--     session_token VARCHAR(255) NOT NULL UNIQUE,
--     ip_address VARCHAR(45), 
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     expires_at TIMESTAMP NOT NULL
-- );

CREATE TABLE IF NOT EXISTS leet_accounts (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES acce_users(id),
    provider VARCHAR(50) NOT NULL, 
    provider_user_id VARCHAR(255) NOT NULL,
    access_token TEXT,
    refresh_token TEXT,
    expires_at TIMESTAMP,
    linked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS login_logs (
    id SERIAL PRIMARY KEY,
    pseudonymized_username VARCHAR(255) NOT NULL,
    ip_address VARCHAR(45),
    login_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE INDEX IF NOT EXISTS idx_login_logs_pseudonym ON login_logs (pseudonymized_username);