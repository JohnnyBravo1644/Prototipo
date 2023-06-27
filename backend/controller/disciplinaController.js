const database = require('../js/database');
const graduacaoController = require('../controller/graduacaoController') 

function importarDisciplinas(request, response) {
  database.query(`SELECT * FROM disciplinas`, async (err, result, fields) => {
    const disciplina = await Promise.all(
      result.rows.map(async (row) => {
        return new Promise(async (resolve) => {
          resolve({
            ...row,
            graduacao: await graduacaoController.getGraduacaoById(row.graduacao_id)
          })
        })
      }),
    )
    return response.status(200).send(disciplina);
  });
};

async function importarDisciplinaById(id) {
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
    importarDisciplinaById, importarDisciplinas
  }