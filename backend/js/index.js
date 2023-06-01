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
      return response.status(200).send(rows);
    });
  });
  
  app.get('/professor', (request, response) => {
    pool.query('SELECT * FROM professor', (err, rows, fields) => {
      response.send(rows);
    });
  });
  
  app.get('/professores/:id', (request, response) => {
    const id = request.params.id;
  
    pool.query('SELECT * FROM professores WHERE id = $1', [id], (err, result) => {
      if (err) {
        console.error('Erro ao executar a consulta:', err);
        return response.status(500).send('Erro no servidor');
      }
  
      const professor = result.rows[0]; // Acessa o primeiro resultado retornado
  
      if (!professor) {
        return response.status(404).send('Professor não encontrado');
      }
  
      return response.status(200).send(professor);
    });
  });
  
  app.post('/professor/inserir', (request, response) => {
    const { nomeProfessor, formacaoProfessor, emailProfessor} = request.body;
    
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
    if(! id) {
      return response.status(400).send('Dados invalidos!');
    }
    const {nomeProfessor, formacaoProfessor, emailProfessor} = request.body;
    
    pool.query(`UPDATE professores SET nome='${nomeProfessor}', formacao='${formacaoProfessor}', email='${emailProfessor}' WHERE id='${id}';`, (err, result) => {
      if (err) {
        console.error(err);
        return response.status(500).send("Ocorreu um erro ao atualizar o professor");
      }
      
      return response.status(200).send("Professor alterado com sucesso");
    });
  });
  
  app.delete('/professor/deletar/:id', (request, response) => {
    const id = request.params.id;
    if(! id) {
      return response.status(400).send('Dados invalidos!');
    }
    pool.query(`DELETE FROM professores WHERE id = ${id}`, (err, result) => {
      if (err) {
        console.error('Erro ao executar a consulta:', err);
        return response.status(500).send('Erro no servidor');
      }
  
      return response.status(200).send("Professor deletado com sucesso");
    });
  });

  //Disciplinas

  const PORT = 3002;
  app.listen(PORT, () => {
    console.log(`server started`);
  });