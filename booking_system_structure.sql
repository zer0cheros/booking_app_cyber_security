
CREATE TABLE IF NOT EXISTS acce_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    two_factor_secret VARCHAR(255),
    two_factor_enabled BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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