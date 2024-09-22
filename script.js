let departMinutes = 1
let temps = departMinutes * 60
/* This JavaScript code snippet is creating a countdown timer functionality. Here's a breakdown of what
it does: */
let estLance = 0;
const timerElement = document.getElementById("timer");
const button = document.getElementById("bouton");

let departSecondes = parseInt(temps % 60);

if(departSecondes < 10){
departSecondes = '0' + departSecondes;
}
if(departMinutes < 10){
departMinutes = '0' + departMinutes;
}
timerElement.innerText = departMinutes + ":" + departSecondes
let tempsIntervalle;

button.addEventListener("click", ()=>{
    if(estLance == 0){
        estLance = 1;
         tempsIntervalle = setInterval(() => {
            let minutes = parseInt(temps / 60);
            let secondes = parseInt(temps % 60);
            if(secondes < 10){
                secondes = '0' + secondes;
            }
            if(minutes < 10){
                minutes = '0' + minutes;
            }
            timerElement.innerText = minutes + ":"+ secondes;
            temps -= 1;
            }, 1000)
    }

    else{
        clearInterval(tempsIntervalle);
        timerElement.innerText = departMinutes + ":" + departSecondes
        estLance = 0;
        temps = departMinutes * 60
    }
})
