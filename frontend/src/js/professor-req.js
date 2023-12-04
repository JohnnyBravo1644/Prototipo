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
        const data = await resposta.json();
        const elemento = document.getElementById('mensagem-modal');
        elemento.textContent = data.message;
        limparCampos();
    })
};

const alterarProfessor = (id) => {
    const nome = document.getElementById(`professor-nome-${id}`).value;
    const formacao = document.getElementById(`professor-formacao-${id}`).value;
    const email = document.getElementById(`professor-email-${id}`).value;
    fetch(`http://localhost:3002/professor/alterar/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({nomeProfessor: nome, formacaoProfessor: formacao, emailProfessor: email})
    }).then(async (resposta) => {
        const data = await resposta.json();
        const elemento = document.getElementById('mensagem-modal');
        elemento.textContent = data.message;
        carregarProfesores();
    })
}

const excluirProfessor = (id) => {
    fetch (`http://localhost:3002/professor/deletar/${id}`,{
        method: 'DELETE',
    }).then(async (resposta) => {
        const data = await resposta.json();
        const elemento = document.getElementById('mensagem-modal');
        elemento.textContent = data.message;
        carregarProfesores();
    })
};