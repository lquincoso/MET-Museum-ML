CREATE DATABASE image_interactions;
USE image_interactions;

#Table for each created user
CREATE TABLE users (
	user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
    deleted_at TIMESTAMP NULL DEFAULT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP  DEFAULT CURRENT_TIMESTAMP
);

#Table for interactions with images
CREATE TABLE interactions (
	interaction_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    INDEX idx_user_type (user_id, type),
    INDEX idx_image_id (image_id),
    deleted_at TIMESTAMP NULL DEFAULT NULL,
    image_id VARCHAR(100),
    CONSTRAINT unique_user_image_interaction UNIQUE (user_id, image_id, type),
    type ENUM('like','dislike','favorite'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- ===========================================

-- Get user's interaction statistics
SELECT 
    u.username,
    COUNT(CASE WHEN i.type = 'like' AND i.deleted_at IS NULL THEN 1 END) as likes,
    COUNT(CASE WHEN i.type = 'dislike' AND i.deleted_at IS NULL THEN 1 END) as dislikes,
    COUNT(CASE WHEN i.type = 'favorite' AND i.deleted_at IS NULL THEN 1 END) as favorites
FROM users u
LEFT JOIN interactions i ON u.user_id = i.user_id
WHERE u.deleted_at IS NULL
GROUP BY u.user_id;


-- Get most interacted images 
SELECT 
    image_id,
    COUNT(*) as total_interactions,
    COUNT(CASE WHEN type = 'like' THEN 1 END) as likes
FROM interactions
WHERE deleted_at IS NULL
GROUP BY image_id
ORDER BY total_interactions DESC
LIMIT 10;


-- Get recent user activity - -Not really usefull but will keep just in case we need it later
SELECT 
    u.username,
    i.type,
    i.image_id,
    i.created_at
FROM interactions i
JOIN users u ON i.user_id = u.user_id
WHERE i.deleted_at IS NULL AND u.deleted_at IS NULL
ORDER BY i.created_at DESC
LIMIT 20;
