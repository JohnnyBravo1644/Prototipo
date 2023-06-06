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

            document.getElementById('professores').innerHTML = dados.reverse().reduce((acumulador, professor) => {
                console.log('Professor', professor)
                return acumulador + `
                <tr>
                <th "col-sm-3""><input class="formulario-alterar" type="text" id="professor-nome-${professor.id}"  value="${professor.nome}"></th>
                <th "col-sm-3"><input class="formulario-alterar" type="text" id="professor-formacao-${professor.id}"  value="${professor.formacao}"></th>
                <th class="col-sm-9"><input class="formulario-alterar" type="text" id="professor-email-${professor.id}"  value="${professor.email}"></th>
                <th class="col-sm-9"><button onclick="excluirProfessor(${professor.id})" class="btn btn-success">Deletar</button></th>
                <th class="col-sm-9"><button onclick="alterarProfessor(${professor.id})" class="btn btn-success">Atualizar</button></th>
            </tr>
                `;
            }, '');
            esconderIconeCarregando()
        })
        .catch((error) => {
            console.error(error);
        });
};
carregarProfesores()