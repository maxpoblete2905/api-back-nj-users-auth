const mysql = require('mysql2/promise');
const { faker } = require('@faker-js/faker/locale/es');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Configuración de conexión con tus variables
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3307, // Usando tu puerto 3307
  user: process.env.DB_USERNAME || 'auth_user', // Usando tu nombre de usuario
  password: process.env.DB_PASSWORD || 'auth_pass', // Usando tu contraseña
  database: process.env.DB_DATABASE || 'auth_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

async function generateTestData(numUsers = 5) {
  try {
    console.log('🔵 Iniciando generación de datos...');
    
    // 1. Generar datos
    const passwordHash = await bcrypt.hash('Password123!', 10);
    const users = Array.from({ length: numUsers }, (_, i) => ({
      email: faker.internet.email().toLowerCase(),
      password_hash: passwordHash,
      name: faker.person.fullName(),
      age: faker.number.int({ min: 18, max: 60 }),
      gender_id: faker.number.int({ min: 1, max: 3 }),
      profile_picture_url: faker.image.avatar(),
      description: faker.lorem.sentence(),
      rut: `${faker.number.int({ min: 10, max: 30})}.${faker.number.int({ min: 100, max: 999 })}.${faker.number.int({ min: 100, max: 999 })}-${faker.number.int({ min: 1, max: 9 })}`,
      cedula_number: faker.string.numeric(9)
    }));

    const locations = users.map(() => ({
      latitude: faker.location.latitude({ min: -33.48, max: -33.42, precision: 6 }),
      longitude: faker.location.longitude({ min: -70.69, max: -70.62, precision: 6 })
    }));

    // 2. Conectar a la base de datos
    const pool = mysql.createPool(dbConfig);
    const connection = await pool.getConnection();
    console.log('✅ Conexión a MySQL establecida en puerto 3307');

    // 3. Insertar datos
    await connection.beginTransaction();

    try {
      // Insertar géneros si no existen
      await connection.query(`
        INSERT IGNORE INTO Gender (gender_id, gender_name) VALUES
        (1, 'Masculino'), (2, 'Femenino'), (3, 'Otro')
      `);

      // Insertar usuarios
      for (const user of users) {
        await connection.query('INSERT INTO User SET ?', user);
      }

      // Insertar ubicaciones
      for (let i = 0; i < locations.length; i++) {
        await connection.query(
          'INSERT INTO User_Location (user_id, latitude, longitude) VALUES (?, ?, ?)',
          [i + 1, locations[i].latitude, locations[i].longitude]
        );
      }

      await connection.commit();
      console.log(`✅ ${numUsers} usuarios insertados correctamente`);
    } catch (err) {
      await connection.rollback();
      throw err;
    } finally {
      connection.release();
      await pool.end();
    }
  } catch (error) {
    console.error('❌ Error durante la ejecución:');
    console.error('Mensaje:', error.message);
    console.error('Código:', error.code);
    console.error('Detalles completos:', error);
    process.exit(1);
  }
}

// Ejecutar directamente
generateTestData().then(() => process.exit(0));