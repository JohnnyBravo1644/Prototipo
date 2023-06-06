const carregarProfesores = () => {
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

            document.getElementById('disciplinas').innerHTML = dados.reverse().reduce((acumulador, disciplina) => {
                console.log('Discplina', disciplina)
                return acumulador + `
                <tr>
                <th "col-sm-3"><input class="formulario-alterar" type="text" id="disciplina-nome-${disciplina.id}" value="${disciplina.nomeDaDisciplina}"></th>
                <th "col-sm-3"><input class="formulario-alterar" type="text" id="disciplina-professor-${disciplina.id}" value="${disciplina.nomeDoProfessor}"></th>
                <th class="col-sm-9"><input class="formulario-alterar" type="text" id="disciplina-email-${disciplina.id}" value="${disciplina.email}"></th>
                <th class="col-sm-9"><input class="formulario-alterar" type="text" id="disciplina-periodo-${disciplina.id}" value="${disciplina.periodo}"></th>
                <th class="col-sm-9"><button onclick="excluirDiscplina(${disciplina.id})" id="deletar" class="btn btn-success">Deletar</button></th>
                <th class="col-sm-9"><button onclick="alterarDiscplinas(${disciplina.id})" id="atualizar" class="btn btn-success">Atualizar</button></th>
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


carregarProfesores()