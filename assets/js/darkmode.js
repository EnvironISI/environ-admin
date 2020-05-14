function clickTheme() {
  var themeDarker = document.getElementById('slider').checked;
  var navbar = document.getElementsByClassName("navbar")[1];
  var eder = document.getElementsByClassName("eder")[0];
  var ederbranco = document.getElementsByClassName("ederbranco")[0];
  var darkmode = document.getElementsByClassName("darkmode")[0];
  var bg = document.getElementsByClassName("sidenav");
  var loading = document.getElementById('loading');
  if (themeDarker) {
    bg[0].classList.replace("navbar-light", "navbar-dark");
    bg[0].classList.replace("bg-white", "bg-dark");
    document.body.style = `font-family: Open Sans, sans-serif;
font-size: 1rem;
font-weight: 400;
line-height: 1.5;

margin: 0;

text-align: left;

color: white;
background-color: #303030;`
    document.getElementsByClassName("footer")[0].style = `padding: 30px 0; background: #303030;`
    navbar.classList.replace("bg-gradient-hugo-daniel", "bg-gradient-dark")
    if (eder) eder.classList.replace("bg-gradient-hugo-daniel", "bg-gradient-dark")
    if (ederbranco) ederbranco.classList.replace("bg-hugo", "bg-gradient-dark")
    if (darkmode) darkmode.style = "color: #525f7f !important";
    loading.setAttribute("stroke", "#000");
  } else {
    loading.setAttribute("stroke", "#5699d2");
    if (darkmode) darkmode.style = "color: #525f7f !important";
    if (ederbranco) ederbranco.classList.replace("bg-gradient-dark", "bg-hugo")
    if (eder) eder.classList.replace("bg-gradient-dark", "bg-gradient-hugo-daniel")
    navbar.classList.replace("bg-gradient-dark", "bg-gradient-hugo-daniel")
    bg[0].classList.replace("navbar-dark", "navbar-light");
    bg[0].classList.replace("bg-dark", "bg-white");
    document.body.style = `font-family: Open Sans, sans-serif;
font-size: 1rem;
font-weight: 400;
line-height: 1.5;

margin: 0;

text-align: left;

color: #525f7f;
background-color: #f8f9fe;`
    document.getElementsByClassName("footer")[0].style = `padding: 30px 0; background: #f8f9fe;`
  }
  localStorage.setItem("darker", themeDarker)
}

function changeTheme(theme) {
  var navbar = document.getElementsByClassName("navbar")[1];
  var bg = document.getElementsByClassName("sidenav");
  var eder = document.getElementsByClassName("eder")[0];
  var ederbranco = document.getElementsByClassName("ederbranco")[0];
  var darkmode = document.getElementsByClassName("darkmode")[0];
  var loading = document.getElementById('loading');
  if (theme) {
    bg[0].classList.replace("navbar-light", "navbar-dark");
    bg[0].classList.replace("bg-white", "bg-dark");
    document.body.style = `font-family: Open Sans, sans-serif;
font-size: 1rem;
font-weight: 400;
line-height: 1.5;

margin: 0;

text-align: left;

color: white;
background-color: #303030;`
    document.getElementsByClassName("footer")[0].style = `padding: 30px 0; 
  background: #303030;`
    navbar.classList.replace("bg-gradient-hugo-daniel", "bg-gradient-dark");
    if (eder) eder.classList.replace("bg-gradient-hugo-daniel", "bg-gradient-dark")
    if (ederbranco) ederbranco.classList.replace("bg-hugo", "bg-gradient-dark")
    if (darkmode) darkmode.style = "color: #525f7f !important";
    loading.setAttribute("stroke", "#000");
  } else {
    loading.setAttribute("stroke", "#5699d2");
    if (darkmode) darkmode.style = "color: #525f7f !important";
    if (ederbranco) ederbranco.classList.replace("bg-gradient-dark", "bg-hugo")
    if (eder) eder.classList.replace("bg-gradient-dark", "bg-gradient-hugo-daniel")
    navbar.classList.replace("bg-gradient-dark", "bg-gradient-hugo-daniel")
    bg[0].classList.replace("navbar-dark", "navbar-light");
    bg[0].classList.replace("bg-dark", "bg-white");
    document.body.style = `font-family: Open Sans, sans-serif;
font-size: 1rem;
font-weight: 400;
line-height: 1.5;

margin: 0;

text-align: left;

color: #525f7f;
background-color: #f8f9fe;`
    document.getElementsByClassName("footer")[0].style = `padding: 30px 0; 
  background: #f8f9fe;`
  }
}