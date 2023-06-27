const database = require('../js/database');

async function getDisciplinaById(id) {
    return new Promise((resolve, reject) => {
      database.query('SELECT * FROM disciplinas WHERE id = $1', [id], (err, result) => {
        if (err) {
          console.error('Erro ao executar a consulta:', err);
          return response.status(500).send('Erro no servidor');
        }
  
        const disciplina = result.rows[0];
  
        if (!disciplina) {
          return response.status(404).send('Disciplina não encontrado');
        }
        resolve(disciplina);
      })
    });
  }

  module.exports = {
    getDisciplinaById
  }