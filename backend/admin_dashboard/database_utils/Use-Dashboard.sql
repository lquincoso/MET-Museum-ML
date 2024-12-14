CREATE DATABASE met_appreciation CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
DROP USER IF EXISTS 'met_admin'@'localhost';
CREATE USER 'met_admin'@'localhost' IDENTIFIED BY 'M3tpr0ject';

SHOW GRANTS FOR 'met_admin'@'localhost';

GRANT ALL PRIVILEGES ON met_appreciation.* TO 'met_admin'@'localhost';
FLUSH PRIVILEGES;

DROP DATABASE met_appreciation;

SHOW DATABASES;

use met_appreciation;
select * from api_profile;

select * from api_artworkrating;