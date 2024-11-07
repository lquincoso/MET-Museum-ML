-- Use the image_interactions database
USE image_interactions;

-- Disable foreign key checks to allow inserting data without order dependency
SET FOREIGN_KEY_CHECKS = 0;

-- Clear existing data (optional)
TRUNCATE TABLE interactions;
TRUNCATE TABLE users;

-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;

-- Insert sample users
INSERT INTO users (username, status, email, password_hash, created_at) VALUES
('john_doe', 'active', 'john_doe@example.com', 'hashed_password1', '2022-11-15 08:23:45'),
('jane_smith', 'inactive', 'jane_smith@example.com', 'hashed_password2', '2023-01-20 12:45:10'),
('alice_jones', 'active', 'alice_jones@example.com', 'hashed_password3', '2023-03-05 16:30:25'),
('bob_brown', 'suspended', 'bob_brown@example.com', 'hashed_password4', '2023-05-18 09:15:55'),
('charlie_black', 'active', 'charlie_black@example.com', 'hashed_password5', '2023-07-22 11:05:35');

-- Insert sample interactions
INSERT INTO interactions (user_id, image_id, type, created_at) VALUES
(1, 'image_001', 'like', '2023-01-10 10:00:00'),
(1, 'image_002', 'favorite', '2023-02-15 11:00:00'),
(2, 'image_001', 'dislike', '2023-03-20 12:00:00'),
(3, 'image_003', 'like', '2023-04-25 13:00:00'),
(3, 'image_004', 'like', '2023-05-30 14:00:00'),
(3, 'image_005', 'favorite', '2023-06-04 15:00:00'),
(4, 'image_002', 'dislike', '2023-07-09 16:00:00'),
(5, 'image_003', 'like', '2023-08-14 17:00:00'),
(5, 'image_001', 'favorite', '2023-09-19 18:00:00'),
(1, 'image_004', 'like', '2023-10-24 19:00:00'),
(2, 'image_005', 'dislike', '2023-11-29 20:00:00'),
(3, 'image_001', 'like', '2023-12-04 21:00:00'),
(5, 'image_002', 'favorite', '2024-01-09 22:00:00'),
(4, 'image_005', 'dislike', '2024-02-14 23:00:00'),
(2, 'image_003', 'like', '2024-03-21 08:00:00'),
(1, 'image_005', 'favorite', '2024-04-26 09:00:00'),
(5, 'image_004', 'like', '2024-05-31 10:00:00'),
(3, 'image_002', 'dislike', '2024-07-05 11:00:00'),
(2, 'image_004', 'like', '2024-08-10 12:00:00'),
(4, 'image_003', 'favorite', '2024-09-15 13:00:00');

-- Insert interactions over the past 12 months for monthly interactions chart
INSERT INTO interactions (user_id, image_id, type, created_at) VALUES
(1, 'image_006', 'like', '2023-11-15 10:00:00'),
(2, 'image_007', 'favorite', '2023-12-20 11:00:00'),
(3, 'image_008', 'like', '2024-01-25 12:00:00'),
(4, 'image_009', 'dislike', '2024-02-28 13:00:00'),
(5, 'image_010', 'like', '2024-03-05 14:00:00'),
(1, 'image_011', 'favorite', '2024-04-10 15:00:00'),
(2, 'image_012', 'dislike', '2024-05-15 16:00:00'),
(3, 'image_013', 'like', '2024-06-20 17:00:00'),
(4, 'image_014', 'favorite', '2024-07-25 18:00:00'),
(5, 'image_015', 'like', '2024-08-30 19:00:00'),
(1, 'image_016', 'dislike', '2024-09-04 20:00:00'),
(2, 'image_017', 'like', '2024-10-09 21:00:00');

-- Insert interactions for today to test "Active Today" metric
INSERT INTO interactions (user_id, image_id, type, created_at) VALUES
(1, 'image_018', 'like', NOW() - INTERVAL 2 HOUR),
(3, 'image_019', 'favorite', NOW() - INTERVAL 1 HOUR),
(5, 'image_020', 'like', NOW());

-- Optionally, insert some soft-deleted users and interactions
INSERT INTO users (username, status, email, password_hash, created_at, deleted_at) VALUES
('deleted_user', 'inactive', 'deleted_user@example.com', 'hashed_password6', '2023-01-01 00:00:00', '2023-06-01 00:00:00');

INSERT INTO interactions (user_id, image_id, type, created_at, deleted_at) VALUES
(6, 'image_021', 'like', '2023-02-01 00:00:00', '2023-07-01 00:00:00');

-- Recalculate any necessary indexes or optimize tables (optional)
