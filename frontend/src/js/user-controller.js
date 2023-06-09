const inserirDiscplina = (disciplina = {}) => {
    const nomeDaDisciplina = document.getElementById('nome-da-disciplina').value;
    const professorId = document.getElementById('nome-do-professor').value;
    const diaSemana = document.getElementById('disciplina-dia-semana').value;
    const periodo = document.getElementById('disciplina-periodo').value;
    const salaId = document.getElementById('selecionar-sala').value;
    const quantidadeAlunos = document.getElementById('quantidade-de-alunos').value;

        fetch('http://localhost:3002/disciplina/inserir', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

        body: JSON.stringify({nomeDisciplina: nomeDaDisciplina, professorId: professorId, diaSemana: diaSemana, periodo: periodo, salaId: salaId, quantidadeAlunos: quantidadeAlunos})

    }).then(async (resposta) => {
        mostrarMensagem(await resposta.json());
        console.log('Disciplina', disciplina);
        limparCampos();
    })
};

//requisições de professores

const inserirProfessor = (professor = {}) => {
    const nome = document.getElementById('nome').value;
    const formacao = document.getElementById('formacao').value;
    const email = document.getElementById('email').value;
        fetch('http://localhost:3002/professor/inserir', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        body: JSON.stringify({nomeProfessor: nome, formacaoProfessor: formacao, emailProfessor: email})
    }).then(async (resposta) => {
        mostrarMensagem(await resposta.json());
        console.log('professor', professor);
        limparCampos()
    })
};