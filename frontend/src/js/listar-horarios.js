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
                <th class="col-sm-3">${horario.disciplina.nome_disciplina}</th>
                <th class="col-sm-9">${horario.professor.nome}</th>
                <th class="col-sm-9">${horario.professor.email}</th>
                <th class="col-sm-9">
                ${horario.sala.bloco_sala} - ${horario.sala.numero_sala}</th>
                <th class="col-sm-9"><input class="formulario-alterar" type="text" id="disciplina-dia-semana-${horario.id}" value="${horario.dia_semana}"></th>
                <th class="col-sm-9"><input class="formulario-alterar" type="text" id="disciplina-periodo-${horario.id}" value="${horario.periodo}"></th>
                <th class="col-sm-9"><button onclick="excluirHorario(${horario.id})" id="deletar" class="btn btn-success">Deletar</button></th>
                <th class="col-sm-9"><button onclick="alterarHorario(${horario.id})" id="atualizar" class="btn btn-success">Atualizar</button></th>
                </tr>
                `;
            },
                '',);
            esconderIconeCarregando()
        })
        .catch((error) => {
            console.error(error);
        });
};
carregarHorario()