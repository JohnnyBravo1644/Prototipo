const database = require('../js/database')
const disciplinaController = require('../controller/disciplinaController');
const professorController = require('../controller/professorController');
const salaController = require('../controller/salaController');
const graduacaoController = require('../controller/graduacaoController');

function importarHorarios(request, response){
    database.query(`SELECT * FROM horarios`, async (err, result, fields) => {
        const horarios = await Promise.all(
          result.rows.map(async (row) => {
            return new Promise(async (resolve) => {
              resolve({
                ...row,
                professor: await professorController.getProfessorById(row.professor_id),
                sala: await salaController.getSalaById(row.sala_id),
                disciplina: await disciplinaController.importarDisciplinaById(row.disciplina_id)
              })
            })
          }),
        )
        return response.status(200).send(horarios);
      });
};

function importarHorarioById (request, response) {
    const id = request.params.id;

  database.query('SELECT * FROM horarios WHERE id = $1', [id], (err, result) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      return response.status(500).send('Erro no servidor');
    }

    const horario = result.rows[0];

    if (!horario) {
      return response.status(404).send('horario não encontrada');
    }

    return response.status(200).send(horario);
  });
};

function inserirHorario(request, response) {
    const { nomeHorario, professorId, diaSemana, periodo, salaId, quantidadeAlunos } = request.body;

  if (!nomeHorario || !professorId || !diaSemana || !periodo || !salaId || !quantidadeAlunos) {
    return response.status(400).send('Campos obrigatórios não foram fornecidos');
  }

  database.query(
    'SELECT * FROM horarios WHERE professor_id = $1 AND dia_semana = $2',
    [professorId, diaSemana],
    (err, result) => {
      if (err) {
        console.error(err);
        response.status(300).json({ message: 'Erro no servidor'});
      }

      if (result.rows.length > 0) {
        response.status(200).json({ massage: 'Professor está indisponível neste dia' });
      }

      database.query(
        'SELECT * FROM horarios WHERE dia_semana = $1 AND periodo = $2 AND sala_id = $3',
        [diaSemana, periodo, salaId],
        (err, result) => {
          if (err) {
            console.error(err);
            return response.status(500).send('Erro no servidor');
          }

          if (result.rows.length > 0) {
            return response.status(200).json({ message: 'A sala já está reservada para este horário' });
          }

          database.query(
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

              database.query(
                'INSERT INTO horarios (disciplina_id, professor_id, dia_semana, periodo, sala_id, alunos_quantidade) VALUES ($1, $2, $3, $4, $5, $6)',
                [nomeHorario, professorId, diaSemana, periodo, salaId, quantidadeAlunos],
                (err, result) => {
                  if (err) {
                    console.error(err);
                    return response.status(500).send('Erro no servidor');
                  }

                  response.status(201).json({ message: 'horario cadastrado com sucesso'});
                }
              );
            }
          );
        }
      )
    })
};

function alterarHorario(request, response) {
    const id = request.params.id;
  if (!id) {
    return response.status(400).send('Dados inválidos!');
  }
  const { nomeHorario, professorId, diaSemana, periodo, salaId } = request.body;

  database.query(
    'SELECT * FROM horarios WHERE professor_id = $1 AND dia_semana = $2',
    [professorId, diaSemana],
    (err, result) => {
      if (err) {
        console.error(err);
        return response.status(500).send('Erro no servidor');
      }

      if (result.rows.length > 0) {
        return response.status(200).json({ massage: 'Professor está indisponível neste dia' });
      }

      database.query(
        'SELECT * FROM horarios WHERE dia_semana = $1 AND periodo = $2 AND sala_id = $3 AND id <> $4',
        [diaSemana, periodo, salaId, id],
        (err, result) => {
          if (err) {
            console.error(err);
            return response.status(500).send('Erro no servidor');
          }

          if (result.rows.length > 0) {
            return response.status(400).send('A sala já está reservada para este horário');
          }

          database.query(
            `UPDATE horarios SET disciplina_id  ='${nomeHorario}', professor_id='${professorId}', dia_semana='${diaSemana}', periodo='${periodo}', sala_id='${salaId}' WHERE id='${id}';`,
            (err, result) => {
              if (err) {
                console.error(err);
                return response.status(500).send('Ocorreu um erro ao atualizar a horario');
              }

              response.status(201).json({ message: 'horario alterado com sucesso'});
            }
          );
        }
      );
    })
};

function deletarHorario(request, response) {
    const id = request.params.id;
  if (!id) {
    return response.status(400).send('Dados invalidos!');
  }
  database.query(`DELETE FROM horarios WHERE id = ${id}`, (err, result) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      return response.status(500).send('Erro no servidor');
    }

    response.status(201).json({ message: 'horario deletada com sucesso'});
  });
};

module.exports = {
    importarHorarios, importarHorarioById, inserirHorario, alterarHorario, deletarHorario
};