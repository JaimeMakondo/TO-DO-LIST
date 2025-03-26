const Listinput = document.getElementById('input');
const Listoutput = document.getElementById('output');
const setdate = document.getElementById('mydate');
const settime = document.getElementById('mytime');

// Todo list
function checker(){
    if (Listinput.value === '' ){
        alert("PLEASE ENTER YOUR TO-DO LIST");
    }
    else if (setdate.value === '' || settime.value === '') {
        alert("PLEASE ENTER DATE AND TIME");
    }
    else{
        var li = document.createElement('li');
        li.innerHTML = Listinput.value;
        Listoutput.appendChild(li);
        var span = document.createElement('span');
        span.innerHTML = 'x';
        li.appendChild(span);
        var timeDisplay = document.createElement('p');
        li.appendChild(timeDisplay);
        Listinput.value = '';
        save();
        settimedate(li, timeDisplay);
    }
}

Listoutput.onclick = function(event){
    if(event.target.tagName ==='LI'){
        event.target.classList.toggle('check');
        save();
    }
    else if(event.target.tagName ==='SPAN'){
        event.target.parentElement.remove();
        save();
    }
}

function save(){
    localStorage.setItem('tododata', Listoutput.innerHTML);
}

function show(){
    Listoutput.innerHTML = localStorage.getItem('tododata');
    // Show time from local storage
    let timeDisplays = document.querySelectorAll('li p');
    timeDisplays.forEach((timeDisplay, index) => {
        let time = localStorage.getItem(`time${index}`);
        if (time) {
            timeDisplay.innerHTML = time;
        }
    });
}

show();

function settimedate(li, timeDisplay){
    let displaymydate = new Date(setdate.value + ' ' + settime.value);
    let intervalId = setInterval(function(){
        let timeleft = displaymydate.getTime() - Date.now();
        if(timeleft >= 0){
            timeDisplay.innerHTML = FormatTime(timeleft);
            // Save time to local storage
            let timeDisplays = document.querySelectorAll('li p');
            timeDisplays.forEach((display, index) => {
                if (display === timeDisplay) {
                    localStorage.setItem(`time${index}`, display.innerHTML);
                }
            });
        }
        else{
            alert("TIME UP");
            clearInterval(intervalId);
        }
    }, 1000);
}

function FormatTime(milleseconds){
    let seconds = Math.floor( milleseconds/ 1000);
    let minutes = Math.floor( seconds / 60);
    let hours = Math.floor( minutes / 60);
    let days = Math.floor( hours / 24);

    return ` ${days} days, ${hours % 24} hours, ${minutes % 60} minutes, ${seconds % 60} seconds,  ` ;
}