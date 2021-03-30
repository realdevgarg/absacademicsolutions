
// MOBILE HEADER 
function openNav() {
  document.getElementById("mySideNav").style.width = "100%";
closeNavAuto();
  }
  
  function closeNav() {
  document.getElementById("mySideNav").style.width = "0";
  }



function closeNavAuto(){
  let navs = document.querySelectorAll('.nav');
  for(let i = 0; i < navs.length; i++){
    navs[i].addEventListener('click', closeNav);
  }
}

closeNavAuto();