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