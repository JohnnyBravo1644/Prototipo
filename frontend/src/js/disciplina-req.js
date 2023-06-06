var select = document.getElementById("nome-do-professor");
var professorContainer = document.getElementById("selecionar-professor");
var emailInput = document.getElementById("disciplina-email");

const selecionarProfessorDisciplina = () => {
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

                if (professorSelecionadoData) {
                    emailInput.value = professorSelecionadoData.email;
                } else {
                    emailInput.value = "";
                }
            });
        })
        .catch((error) => {
            console.error(error);
        });
};

selecionarProfessorDisciplina();

const carregarDisciplinas = () => {
    fetch('http://localhost:3002/disciplinas')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Erro ao obter os dados das disciplinas');
            }
            return response.json();
        })
        .then((data) => {
            const rows = Array.isArray(data) ? data : [];
            const dados = data.rows;

            document.getElementById('disciplinas').innerHTML = dados.reverse().reduce((acumulador, disciplina) => {
                console.log('Discplina', disciplina)
                return acumulador + `
                <tr>
                <th "col-sm-3"><input class="formulario-alterar" type="text" id="disciplina-nome-${disciplina.codigoDisciplina}" value="${disciplina.nome}"></th>
                <th "col-sm-3"><input class="formulario-alterar" type="text" id="disciplina-professor-${disciplina.codigoDisciplina}" value="${disciplina.nome}"></th>
                <th class="col-sm-9"><input class="formulario-alterar" type="text" id="disciplina-email-${disciplina.codigoDisciplina}" value="${disciplina.professor_email}"></th>
                <th class="col-sm-9"><input class="formulario-alterar" type="text" id="disciplina-dia-semana-${disciplina.codigoDisciplina}" value="${disciplina.dia_semana}"></th>
                <th class="col-sm-9"><input class="formulario-alterar" type="text" id="disciplina-periodo-${disciplina.codigoDisciplina}" value="${disciplina.periodo}"></th>
                <th class="col-sm-9"><button onclick="excluirDiscplina(${disciplina.codigoDisciplina})" id="deletar" class="btn btn-success">Deletar</button></th>
                <th class="col-sm-9"><button onclick="alterarDiscplinas(${disciplina.codigoDisciplina})" id="atualizar" class="btn btn-success">Atualizar</button></th>
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

carregarDisciplinas()