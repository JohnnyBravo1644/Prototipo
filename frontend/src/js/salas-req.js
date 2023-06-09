const selecionarSalaDisciplina = () => {
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
          option.textContent = sala.capacidade_sala;
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
          // Restante do seu código aqui...
  
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
selecionarSalaDisciplina();