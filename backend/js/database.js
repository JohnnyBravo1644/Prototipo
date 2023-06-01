const { Pool } = require('pg');

try {
  const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Prototipo-TCC',
    password: '5068',
    port: 5432 // porta padrão do PostgreSQL
  });

  module.exports = pool;
} catch (error) {
  console.error('Erro ao conectar ao banco de dados:', error);
}