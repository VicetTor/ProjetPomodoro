var departMinutes = 25;
var departMinutesFormTravail;
var departMinutesFormPause;
let temps = departMinutes * 60;
let estLance = 0;
let minutes;
let secondes;
let departSecondes = parseInt(temps % 60);

const timerElement = document.getElementById("timer");
const button = document.getElementById("bouton");
const body = document.body;
const timerDiv = document.getElementById("timerDiv")
const bordureNoire = document.getElementById("bordureNoire")
const choix = document.getElementById("choix");
const pause = document.getElementById("pause");
const travail = document.getElementById("travail");
const parametre = document.getElementById("parametre");
const popUp = document.getElementById("popUp");
const boutonValider = document.getElementById("valider");
const tempsTravail = document.getElementById("tempsTravail");
const tempsPause = document.getElementById("tempsPause");

depart();

button.addEventListener("click", ()=>{
    if(estLance == 0){
        estLance = 1;
         changerDeVueActive();
        }
    else if(estLance == 1){
        clearInterval(tempsIntervalle); 
        reinitialise();
    }
})

function reinitialise(){
    restoreStyle();
    if (departMinutesFormTravail == null){
        departMinutes = 25;
    }else{
        departMinutes = departMinutesFormTravail;
    }
    timerElement.innerText = departMinutes + ":" + departSecondes;
    estLance = 0;
    temps = departMinutes * 60;
}

function changerDeVueActive(){
    restoreStyle();
    travail.style.color = "#f8d58e";
    pause.style.color = "white";
    ////
    if (departMinutesFormTravail == null){
        departMinutes = 25;
    }else{
        departMinutes = departMinutesFormTravail;
    }
    temps = departMinutes * 60;
    departSecondes = (temps % 60);
    
    depart();

    tempsIntervalle = setInterval(() => {
        minutes = parseInt(temps / 60);
        secondes = parseInt(temps % 60);
         
        verifySecondes();
        verifyMinutes();

        timerElement.innerText = minutes + ":"+ secondes;
        temps -= 1;
        
        passageRepos();

        }, 1000)
}

function changerDeVueRepos(){   
    mettreEnVert();
    pause.style.color ="#f8d58e"
    travail.style.color = "white";
    ////
    if (departMinutesFormPause == null){
        departMinutes = 5;
    }else{
        departMinutes = departMinutesFormPause;
    }
    temps = departMinutes * 60;
    departSecondes = (temps % 60);
    depart();
  
    tempsIntervalle = setInterval(() => {

        minutes = parseInt(temps / 60);
        secondes = parseInt(temps % 60);
        
        verifySecondes();
        verifyMinutes();

        timerElement.innerText = minutes + ":"+ secondes;
        temps -= 1;
        
        passageActive();

        }, 1000)
}

function mettreEnVert(){
    body.style.backgroundColor ="green";
    button.style.backgroundColor = "green";
    timerDiv.style.backgroundColor = "green";
    bordureNoire.style.border = "green 5px solid";
    choix.style.border = "green 0.1em solid";
    timerDiv.style.border = "8px solid black";
}

function restoreStyle(){
    pause.style.color = "white";
    travail.style.color = "white";
    body.style.backgroundColor ="rgb(198, 48, 48)";
    button.style.backgroundColor = "rgb(198, 48, 48)";
    timerDiv.style.backgroundColor = "rgb(198, 48, 48)";
    bordureNoire.style.border = "rgb(198, 48, 48) 5px solid";
    choix.style.border = "rgb(198, 48, 48) 0.1em solid";
    timerDiv.style.border = "8px solid #f8d58e";
}

function verifySecondes(){
    if(secondes < 10){
        secondes = '0' + secondes;
    }
}

function verifyMinutes(){
    if(minutes < 10){
        minutes = '0' + minutes;
    }
}

function passageRepos(){
    if(minutes == 0 && secondes == 0){
        clearInterval(tempsIntervalle);
        changerDeVueRepos();
    }
}

function passageActive(){
    if(minutes == 0 && secondes == 0){
        clearInterval(tempsIntervalle);
        changerDeVueActive();
    }
}


function depart(){
    

    if(departSecondes < 10){
    departSecondes = '0' + departSecondes;
    }
    if(departMinutes < 10){
    departMinutes = '0' + departMinutes;
    }
    timerElement.innerText = departMinutes + ":" + departSecondes
}

function clickParametre(){
    if(popUp.style.visibility == "visible"){
        popUp.style.visibility = "hidden";
    }
    else{
    popUp.style.visibility = "visible";
    }
}

parametre.addEventListener("click", ()=>{
    clickParametre();
})


boutonValider.addEventListener("click",()=>{
    clickValider();
})


function clickValider(){
    if(tempsPause.value != "" && tempsTravail.value!= ""){
        popUp.style.visibility ="hidden";
        departMinutesFormTravail = tempsTravail.value;
        departMinutesFormPause = tempsPause.value;
        departMinutes = tempsTravail.value;
        temps = departMinutes * 60;
        departSecondes = (temps % 60);
        depart();
    }
}