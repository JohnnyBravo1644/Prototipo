const selecionarProfessor = () => {
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

            document.getElementById('selecionar-professor').innerHTML = dados.reverse().reduce((acumulador, professor) => {
                return acumulador + ` <option>${professor.nome}</option> `;
            }, '');
        })
        .catch((error) => {
            console.error(error);
        });
}