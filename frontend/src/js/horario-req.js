var select = document.getElementById("nome-do-professor");
var professorContainer = document.getElementById("selecionar-professor");

const inserirHorario = (disciplina = {}) => {
  const nomeHorario = document.getElementById('selecionar-disciplina').value;
  const professorId = document.getElementById('nome-do-professor').value;
  const diaSemana = document.getElementById('disciplina-dia-semana').value;
  const periodo = document.getElementById('disciplina-periodo').value;
  const salaId = document.getElementById('selecionar-sala').value;
  const quantidadeAlunos = document.getElementById('quantidade-de-alunos').value;

  fetch('http://localhost:3002/horario/inserir', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },

    body: JSON.stringify({ nomeHorario: nomeHorario, professorId: professorId, diaSemana: diaSemana, periodo: periodo, salaId: salaId, quantidadeAlunos: quantidadeAlunos })

  }).then(async (resposta) => {
    const data = await resposta.json();
    const elemento = document.getElementById('mensagem-modal');
    elemento.textContent = data.message;
    limparCampos();
  })
};

const excluirHorario = (id) => {
  fetch(`http://localhost:3002/horario/deletar/${id}`, {
    method: 'DELETE',
  }).then(async (resposta) => {
    const data = await resposta.json();
    const elemento = document.getElementById('mensagem-modal');
    elemento.textContent = data.message;
  })
};

const selecionarProfessorHorario = () => {
  fetch('http://localhost:3002/professores')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Erro ao obter os dados dos professores');
      }
      return response.json();
    })
    .then((data) => {
      const rows = Array.isArray(data) ? data : [];
      const dados = data.rows;

      const select = document.getElementById('nome-do-professor');

      dados.forEach(function (professor) {
        var option = document.createElement("option");
        option.textContent = professor.nome;
        option.value = professor.id;
        select.appendChild(option);
      });

      select.addEventListener("change", function () {
        var professorSelecionado = select.value;
        var professorSelecionadoData = dados.find(function (professor) {
          if (professor.id == professorSelecionado) {
            return professor;
          }
        });
      });
    })
    .catch((error) => {
      console.error(error);
    });
};
selecionarProfessorHorario();

const selecionarSalaHorario = () => {
  fetch('http://localhost:3002/salas')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Erro ao obter os dados das salas');
      }
      return response.json();
    })
    .then((data) => {
      const rows = Array.isArray(data) ? data : [];
      const dados = data.rows;

      const select2 = document.getElementById('selecionar-sala');

      dados.forEach(function (sala) {
        var option = document.createElement("option");
        option.textContent = sala.bloco_sala + ' - ' + sala.numero_sala;
        option.value = sala.id;
        select2.appendChild(option);
      });

      select2.addEventListener("change", function () {
        var salaSelecionado = select2.value;
        var salaSelecionadoData = dados.find(function (sala) {
          if (sala.id == salaSelecionado) {
            return sala;
          }
        });

      });
    })
    .catch((error) => {
      console.error(error);
    });
};
selecionarSalaHorario();

const selecionarDisciplinaHorario = () => {
  fetch('http://localhost:3002/disciplinas')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Erro ao obter os dados das disciplinas');
      }
      return response.json();
    })
    .then((data) => {
      const rows = Array.isArray(data) ? data : [];

      const selectDisciplina = document.getElementById('selecionar-disciplina');

      rows.forEach(function (disciplina) {
        var option = document.createElement("option");
        option.textContent = disciplina.nome_disciplina + ' - ' + disciplina.graduacao.nome_graduacao;
        option.value = disciplina.id;
        selectDisciplina.appendChild(option);
      });

      selectDisciplina.addEventListener("change", function () {
        var disciplinaSelecionado = selectDisciplina.value;
        var disciplinaSelecionadoData = rows.find(function (disciplina) {
          if (disciplina.id == disciplinaSelecionado) {
            return disciplina;
          }
        });
      });
    })
    .catch((error) => {
      console.error(error);
    });
};
selecionarDisciplinaHorario()
