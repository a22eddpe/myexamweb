
function showDropdown(id) {
  document.getElementById(id).style.display = "flex";
}

function hideDropdown(id) {
  document.getElementById(id).style.display = "none";
}

function showpage(pageid, lastpage){
  var pages = document.getElementsByClassName("page");
  for(page of pages){
    page.style.display="none";
  }
  document.getElementById(pageid).style.display="block";
  if(lastpage){
    updateHistory(pageid);
  }
}   

function historyChange(event){
  showpage(event.state, false);
}    

function updateHistory(token){
  history.pushState(token, "Titel: "+token, "");
}

function setupHistory(){ 
  window.onpopstate = function(event) { historyChange(event); };
}

document.addEventListener('DOMContentLoaded', function() {
  const toggleBtn = document.getElementById('darkmodeToggle');
  if (localStorage.getItem('darkmode') === 'true') {
      document.body.classList.add('darkmode');
      toggleBtn.textContent = 'Återställ standardvy';
  } else {
      document.body.classList.remove('darkmode');
      toggleBtn.textContent = 'Aktivera högkontrast';
  }

  toggleBtn.addEventListener('click', function() {
      if (document.body.classList.contains('darkmode')) {
          document.body.classList.remove('darkmode');
          toggleBtn.textContent = 'Aktivera högkontrast';
          localStorage.setItem('darkmode', 'false');
      } else {
          document.body.classList.add('darkmode');
          toggleBtn.textContent = 'Återställ standardvy';
          localStorage.setItem('darkmode', 'true');
      }
  });
});

function makeTextLarger() {
  const boxes = document.querySelectorAll(".infoBox");
  boxes.forEach(box => box.style.fontSize = "30px");
}

function makeTextSmaller() {
  const boxes = document.querySelectorAll(".infoBox");
  boxes.forEach(box => box.style.fontSize = "15px");
}

function showpage(pageid, lastpage){
  var pages = document.getElementsByClassName("page");
  for (const page of pages){
    page.style.display = "none";
  }

  const target = document.getElementById(pageid);
  if (target) {
    target.style.display = "block";
  } else {
    console.warn("Sidan hittades inte:", pageid);
  }

  if (lastpage){
    updateHistory(pageid);
  }
}