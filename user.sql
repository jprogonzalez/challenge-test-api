CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,               -- ID único y clave primaria
    name VARCHAR(50) NOT NULL,                       -- Nombre del usuario
    last_name VARCHAR(50) NOT NULL,                  -- Apellido del usuario
    email VARCHAR(100) NOT NULL UNIQUE,              -- Email único
    password VARCHAR(255) NOT NULL,                  -- Contraseña encriptada
    role ENUM('admin', 'films', 'people', 'locations', 'species', 'vehicles') NOT NULL,  -- Rol con valores restringidos
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Fecha de creación
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Última actualización
    deleted_at TIMESTAMP NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_email ON users(email);
CREATE INDEX idx_role ON users(role);