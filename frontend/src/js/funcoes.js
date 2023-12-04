//Carregando
function esconderIconeCarregando() {
    document.getElementById('loading').style.display = "none";
  };
  
  function mostrarIconeCarregando(){
    document.getElementById('loading').style.display = "block";
  }
  
  //Nav-Bar
  function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
  }
    
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
    document.body.style.backgroundColor = "white";
  }

  const limparCampos = () => {
    document.getElementById('nome').value = '';
    document.getElementById('formacao').value = '';
    document.getElementById('email').email = '';
  }

  function recarregarPagina() {
    // Recarrega a página
    location.reload();
}

  document.getElementById('hidden-modal').innerHTML = `
    <div class="modal fade" id="dynamicModal" tabindex="-1" aria-labelledby="dynamicModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="dynamicModalLabel">Alerta!</h1>
                </div>
                <div class="modal-body">
                    <p  id="mensagem-modal">Ação Realizada</p>
                </div>
                <div class="modal-footer">
                    <button onclick="recarregarPagina()" type="button" class="btn btn-outline-success" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
`;