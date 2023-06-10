var select = document.getElementById("nome-do-professor");
var professorContainer = document.getElementById("selecionar-professor");
var emailInput = document.getElementById("disciplina-email");

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

        body: JSON.stringify({nomeHorario: nomeHorario, professorId: professorId, diaSemana: diaSemana, periodo: periodo, salaId: salaId, quantidadeAlunos: quantidadeAlunos})
        
    }).then(async (resposta) => {
        mostrarMensagem(await resposta.json());
        console.log('Disciplina', disciplina);
        limparCampos();
    })
};

const carregarHorario = () => {
    fetch('http://localhost:3002/horarios')
    .then((response) => {
        if (!response.ok) {
            throw new Error('Erro ao obter os dados das disciplinas');
            }
            return response.json();
        })
        .then((data) => {
            const dados = data.rows;
            console.log(data)
            
            document.getElementById('disciplinas').innerHTML = data.reverse().reduce((acumulador, horario) => {
                console.log('Discplina', horario)
                return acumulador + `
                <tr>
                <th "col-sm-3"><input class="formulario-alterar" type="text" id="disciplina-nome-${horario.id}" value="${horario.disciplina.nome_disciplina}"></th>
                <th class="col-sm-9">${horario.professor.nome}</th>
                <th class="col-sm-9">${horario.professor.email}</th>
                <th class="col-sm-9">${horario.sala.bloco_sala} - ${horario.sala.numero_sala}</th>
                <th class="col-sm-9"><input class="formulario-alterar" type="text" id="disciplina-dia-semana-${horario.id}" value="${horario.dia_semana}"></th>
                <th class="col-sm-9"><input class="formulario-alterar" type="text" id="disciplina-periodo-${horario.id}" value="${horario.periodo}"></th>
                <th class="col-sm-9"><button onclick="excluirHorario(${horario.id})" id="deletar" class="btn btn-success">Deletar</button></th>
                <th class="col-sm-9"><button onclick="alterarHorario(${horario.id})" id="atualizar" class="btn btn-success">Atualizar</button></th>
                </tr>
                `;
            },
            '', );
            esconderIconeCarregando()
        })
        .catch((error) => {
            console.error(error);
        });
    };
    carregarHorario()

    const excluirHorario = (id) => {
        fetch (`http://localhost:3002/horario/deletar/${id}`,{
            method: 'DELETE',
        }).then(async (resposta) => {
            mostrarMensagem(await resposta.json('Disciplina deletada com sucesso'));
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

            dados.forEach(function (professor) {
                var option = document.createElement("option");
                option.textContent = professor.nome;
                option.value = professor.id;
                select.appendChild(option);
            });

            select.addEventListener("change", function () {
                var professorSelecionado = select.value;
                var professorSelecionadoData = dados.find(function (professor) {
                    if(professor.id == professorSelecionado){
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
