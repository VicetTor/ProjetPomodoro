let departMinutes;

/* vérification si la variable departMinutes est déjà rempli sur le navigateur*/

if (localStorage.getItem('departMinutesFormTravail') != null){
    departMinutes = localStorage.getItem('departMinutesFormTravail');
}
else{
    departMinutes = 25;
}

/*Ensemble des variables crées */

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

/* Execution du programme */

depart();

/* gère le click sur le bouton play et change de vue en fonction de l'affichage présent */

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

/* La fonction reinitialise permet de reinitialiser l'affichage et les variables à celles de départ */

function reinitialise(){
    restoreStyle();
    if(localStorage.getItem('departMinutesFormTravail') != null){
        departMinutes = localStorage.getItem('departMinutesFormTravail');
    }
    else{
        departMinutes = 25;
    }
    timerElement.innerText = departMinutes + ":" + departSecondes;
    estLance = 0;
    temps = departMinutes * 60;
}


/* La fonction permet de changer d'affichage pour l'affichage du pomodoro en travail, et lance le pomodoro */

function changerDeVueActive(){
    restoreStyle();
    travail.style.color = "#f8d58e";
    pause.style.color = "white";
    if (localStorage.getItem('departMinutesFormTravail') != null){
        departMinutes = localStorage.getItem('departMinutesFormTravail');
    }
    else{
        departMinutes = 25;
    }
    temps = departMinutes * 60;
    departSecondes = (temps % 60);
    
    depart();
    temps -= 1;

    tempsIntervalle = setInterval(() => {   /* le set interval permet de créer le chronomètre en mode travail*/
        minutes = parseInt(temps / 60);
        secondes = parseInt(temps % 60);
        
        verifySecondes();
        verifyMinutes();

        timerElement.innerText = minutes + ":"+ secondes;
        temps -= 1;
        
        passageRepos();

    }, 1000)
}

/* La fonction permet de changer d'affichage pour l'affichage du pomodoro en repos, et lance le pomodoro */

function changerDeVueRepos(){   
    mettreEnVert();
    pause.style.color ="#f8d58e"
    travail.style.color = "white";
    if (localStorage.getItem('departMinutesFormPause') != null){
        departMinutes = localStorage.getItem('departMinutesFormPause');
    }
    else{
        departMinutes = 25;
    }
    temps = departMinutes * 60;
    departSecondes = (temps % 60);
    depart();
    temps -= 1;

    tempsIntervalle = setInterval(() => {  /* le set interval permet de créer le chronomètre en mode repos*/

        minutes = parseInt(temps / 60);
        secondes = parseInt(temps % 60);
        
        verifySecondes();
        verifyMinutes();

        timerElement.innerText = minutes + ":"+ secondes;
        temps -= 1;
        
        passageActive();

    }, 1000)
}



/* La fonction permet de mettre tout l'affichage en vert pour le mode repos*/

function mettreEnVert(){
    body.style.backgroundColor ="green";
    button.style.backgroundColor = "green";
    timerDiv.style.backgroundColor = "green";
    bordureNoire.style.border = "green 5px solid";
    choix.style.border = "green 0.1em solid";
    timerDiv.style.border = "8px solid black";
    parametre.style.backgroundColor ="green";
}

/* La fonction permet de mettre tout l'affichage en rouge pour le mode travail*/

function restoreStyle(){
    parametre.style.backgroundColor ="rgb(198, 48, 48)";
    pause.style.color = "white";
    travail.style.color = "white";
    body.style.backgroundColor ="rgb(198, 48, 48)";
    button.style.backgroundColor = "rgb(198, 48, 48)";
    timerDiv.style.backgroundColor = "rgb(198, 48, 48)";
    bordureNoire.style.border = "rgb(198, 48, 48) 5px solid";
    choix.style.border = "rgb(198, 48, 48) 0.1em solid";
    timerDiv.style.border = "8px solid #f8d58e";
}

/* La fonction permet de vérifier si les secondes sont à plus de 10*/

function verifySecondes(){
    if(secondes < 10){
        secondes = '0' + secondes;
    }
}

/* La fonction permet de vérifier si les minutes sont à plus de 10*/

function verifyMinutes(){
    if(minutes < 10){
        minutes = '0' + minutes;
    }
}

/* La fonction permet de passer à l'affichage repos après la fin du chronomètre de travail*/

function passageRepos(){
    if(minutes == 0 && secondes == 0){
        clearInterval(tempsIntervalle);
        changerDeVueRepos();
    }
}

/* La fonction permet de passer à l'affichage travail après la fin du chronomètre de repos*/

function passageActive(){
    if(minutes == 0 && secondes == 0){
        clearInterval(tempsIntervalle);
        changerDeVueActive();
    }
}


/* la fonction permet d'afficher les éléments quand rien n'est lançé*/

function depart(){
    if(departSecondes < 10){
        departSecondes = '0' + departSecondes;
    }
    if(departMinutes < 10){
        departMinutes = '0' + departMinutes;
    }
    timerElement.innerText = departMinutes + ":" + departSecondes
}

/* La fonction permet d'afficher les éléments que l'on veut changer dans les paramètres*/

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


/* Fonction qui permet de valider le formulaire une fois remplie et de changer les valeurs des minutes de repos et minutes de travail*/

function clickValider(){
    if(tempsPause.value != "" && tempsTravail.value!= ""){
        popUp.style.visibility ="hidden";
        localStorage.setItem('departMinutesFormTravail', tempsTravail.value);
        localStorage.setItem('departMinutesFormPause', tempsPause.value);
        location.reload;
    }
}