const database = require('../js/database');

function importarSalas(request, response){
    database.query(`SELECT * FROM salas`, (err, rows, fields) => {
        if (err) {
    
          console.error(err);
          return response.status(500).send('Erro ao obter os dados das salas');
        }
        
        return response.status(200).json(rows);
      });
}

async function getSalaById(id) {
    return new Promise((resolve, reject) => {
      database.query('SELECT * FROM salas WHERE id = $1', [id], (err, result) => {
        if (err) {
          console.error('Erro ao executar a consulta:', err);
          return response.status(500).send('Erro no servidor');
        }
  
        const sala = result.rows[0];
  
  
        if (!sala) {
          return response.status(404).send('Sala não encontrado');
        }
        resolve(sala);
      })
    });
  };

module.exports = {
    importarSalas, getSalaById
}