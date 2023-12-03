const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

const salaController = require('../controller/salaController');
const disciplinaController = require('../controller/disciplinaController');
const professorController = require('../controller/professorController');
const horarioController = require('../controller/horarioController');

app.get('/', (request, response) => {
  return response.status(200).send('O servidor está em funcionamento');
});

//Professores

app.get('/professores', professorController.importarProfessores);

app.get('/professores/:id', professorController.importarProfessorById);

app.post('/professor/inserir', professorController.cadastrarProfessor);

app.put('/professor/alterar/:id', professorController.alterarProfessor);

app.delete('/professor/deletar/:id', professorController.deletarProfessor);

//horarios

app.get('/horarios', horarioController.importarHorarios);

app.get('/horario/:id', horarioController.importarHorarioById);

app.post('/horario/inserir', horarioController.inserirHorario);


app.put('/horario/alterar/:id', horarioController.alterarHorario);

app.delete('/horario/deletar/:id', horarioController.deletarHorario);

//salas

app.get('/salas', salaController.importarSalas);

//disciplinas

app.get('/disciplinas', disciplinaController.importarDisciplinas);

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`server started`);
});