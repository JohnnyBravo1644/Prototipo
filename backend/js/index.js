const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

const pool = require('./database');

app.get('/', (request, response) => {
  return response.status(200).send('O servidor está em funcionamento');
});

//Professores

app.get('/professores', (request, response) => {
  pool.query(`SELECT * FROM professores`, (err, rows, fields) => {
    if (err) {

      console.error(err);
      return response.status(500).send('Erro ao obter os dados dos professores');
    }

    return response.status(200).json(rows);
  });
});


app.get('/professores/:id', (request, response) => {
  const id = request.params.id;

  pool.query('SELECT * FROM professores WHERE id = $1', [id], (err, result) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      return response.status(500).send('Erro no servidor');
    }

    const professor = result.rows[0];

    if (!professor) {
      return response.status(404).send('Professor não encontrado');
    }

    return response.status(200).send(professor);
  });
});

app.post('/professor/inserir', (request, response) => {
  const { nomeProfessor, formacaoProfessor, emailProfessor } = request.body;

  if (!nomeProfessor || !formacaoProfessor || !emailProfessor) {
    return response.status(400).send('Campos obrigatórios não foram fornecidos');
  }

  pool.query('INSERT INTO professores (nome, email, formacao) VALUES ($1, $2, $3)', [nomeProfessor, emailProfessor, formacaoProfessor], (err, result) => {
    if (err) {
      console.error(err);
      return response.status(500).send('Erro no servidor');
    }

    response.status(201).send('Professor cadastrado com sucesso');
  });
});

app.put('/professor/alterar/:id', (request, response) => {
  const id = request.params.id;
  if (!id) {
    return response.status(400).send('Dados invalidos!');
  }
  const { nomeProfessor, formacaoProfessor, emailProfessor } = request.body;

  pool.query(`UPDATE professores SET nome='${nomeProfessor}', formacao='${formacaoProfessor}', email='${emailProfessor}' WHERE id='${id}';`, (err, result) => {
    if (err) {
      console.error(err);
      return response.status(500).send("Ocorreu um erro ao atualizar o professor");
    }

    return response.status(200).send("Professor alterado com sucesso");
  });
});

//Disciplinas

async function getProfessorById(id) {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM professores WHERE id = $1', [id], (err, result) => {
      if (err) {
        console.error('Erro ao executar a consulta:', err);
        return response.status(500).send('Erro no servidor');
      }
  
      const professor = result.rows[0];
  
      if (!professor) {
        return response.status(404).send('Professor não encontrado');
      }
  
      resolve(professor);
    }) 
  });
}

async function getSalaById(id) {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM salas WHERE id = $1', [id], (err, result) => {
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
}

app.get('/disciplinas', (request, response) => {
  pool.query(`SELECT * FROM disciplinas`, async (err, result, fields) => {
    const disciplinas = await Promise.all(
      result.rows.map(async (row) => {
        return new Promise(async (resolve) => {
          resolve({
            ...row, 
            professor : await getProfessorById(row.professor_id),
            sala : await getSalaById(row.sala_id)
          })
        }) 
      }),
    )
    return response.status(200).send(disciplinas);
  });
});

app.get('/disciplina/:id', (request, response) => {
  const id = request.params.id;

  pool.query('SELECT * FROM disciplinas WHERE id = $1', [id], (err, result) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      return response.status(500).send('Erro no servidor');
    }

    const disciplina = result.rows[0];

    if (!disciplina) {
      return response.status(404).send('Disciplina não encontrada');
    }

    return response.status(200).send(disciplina);
  });
});

app.post('/disciplina/inserir', (request, response) => {
  const { nomeDisciplina, professorId, diaSemana, periodo, salaId, quantidadeAlunos } = request.body;

  if (!nomeDisciplina || !professorId || !diaSemana || !periodo || !salaId || !quantidadeAlunos) {
    return response.status(400).send('Campos obrigatórios não foram fornecidos');
  }

  pool.query(
    'SELECT * FROM disciplinas WHERE professor_id = $1 AND dia_semana = $2',
    [professorId, diaSemana],
    (err, result) => {
      if (err) {
        console.error(err);
        return response.status(500).send('Erro no servidor');
      }

      if (result.rows.length > 0) {
        return response.status(200).json({ massage: 'Professor está indisponível neste dia' });
      }

      pool.query(
        'SELECT capacidade_sala FROM salas WHERE id = $1',
        [salaId],
        (err, result) => {
          if (err) {
            console.error(err);
            return response.status(500).send('Erro no servidor');
          }

          const capacidadeSala = result.rows[0].capacidade_sala;

          if (capacidadeSala < quantidadeAlunos) {
            return response.status(200).json({ message: 'Esta sala não suporta a quantidade de alunos!' });
          }

          pool.query(
            'INSERT INTO disciplinas (nome, professor_id, dia_semana, periodo, sala_id, alunos_quantidade) VALUES ($1, $2, $3, $4, $5, $6)',
            [nomeDisciplina, professorId, diaSemana, periodo, salaId, quantidadeAlunos],
            (err, result) => {
              if (err) {
                console.error(err);
                return response.status(500).send('Erro no servidor');
              }

              response.status(201).send('Disciplina cadastrada com sucesso');
            }
          );
        }
      );
    }
  );
});


app.put('/disciplina/alterar/:id', (request, response) => {
  const id = request.params.id;
  if (!id) {
    return response.status(400).send('Dados inválidos!');
  }
  const { nomeDisciplina, professorId, diaSemana, periodo } = request.body;

  pool.query(
    'SELECT * FROM disciplinas WHERE professor_id = $1 AND dia_semana = $2 AND id <> $3',
    [professorId, diaSemana, id],
    (err, result) => {
      if (err) {
        console.error(err);
        return response.status(500).send('Erro no servidor');
      }

      if (result.rows.length > 0) {
        return response.status(400).send('O professor já possui aula neste dia');
      }

      pool.query(
        `UPDATE disciplinas SET nome='${nomeDisciplina}', professor_id='${professorId}', dia_semana='${diaSemana}', periodo='${periodo}' WHERE id='${id}';`,
        (err, result) => {
          if (err) {
            console.error(err);
            return response.status(500).send('Ocorreu um erro ao atualizar a disciplina');
          }

          return response.status(200).send('Disciplina alterada com sucesso');
        }
      );
    }
  );
});


app.delete('/disciplina/deletar/:id', (request, response) => {
  const id = request.params.id;
  if (!id) {
    return response.status(400).send('Dados invalidos!');
  }
  pool.query(`DELETE FROM disciplinas WHERE id = ${id}`, (err, result) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      return response.status(500).send('Erro no servidor');
    }

    return response.status(200).send("Disciplina deletada com sucesso");
  });
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`server started`);
});

//salas

app.get('/salas', (request, response) => {
  pool.query(`SELECT * FROM salas`, (err, rows, fields) => {
    if (err) {

      console.error(err);
      return response.status(500).send('Erro ao obter os dados das salas');
    }

    return response.status(200).json(rows);
  });
});