const database = require('../js/database')

async function getGraduacaoById(id) {
    return new Promise((resolve, reject) => {
      database.query('SELECT * FROM graduacao WHERE id = $1', [id], (err, result) => {
        if (err) {
          console.error('Erro ao executar a consulta:', err);
          return response.status(500).send('Erro no servidor');
        }
        
        const graduacao = result.rows[0];
        
        if (!graduacao) {
          return response.status(404).send('graduacao não encontrada');
        }
        
        resolve(graduacao);
      })
    });
  }
  

  module.exports = {
    getGraduacaoById
  }
  