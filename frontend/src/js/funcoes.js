//Carregando
function esconderIconeCarregando() {
    document.getElementById('loading').style.display = "none";
  };
  
  function mostrarIconeCarregando(){
    document.getElementById('loading').style.display = "block";
  }
  
  //Nav-Bar
  function openNav() {
      document.getElementById("mySidenav").style.display = "block";
    };
    
  function closeNav() {
    document.getElementById("mySidenav").style.display = "none";
  };

  const limparCampos = () => {
    document.getElementById('nome').value = '';
    document.getElementById('formacao').value = '';
    document.getElementById('email').email = '';
  }