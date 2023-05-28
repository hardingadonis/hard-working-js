let workTittle = document.getElementById('work');
let breakTittle = document.getElementById('break');

let start_btn = document.getElementById('start');
let reset_btn = document.getElementById('reset');

let workTime = 25;
let breakTime = 5;

let seconds = '0'

let intervalID

function showNotifications(body) {
    if (Notification.permission === 'granted') {
        const notification = new Notification('Hard-working JS - Pomodoro', { body: body });
    } else if (Notification.permission === 'denied') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                const notification = new Notification('Hard-working JS - Pomodoro', { body: body });
            }
        });
    }
}

window.onload = () => {

    document.getElementById('minutes').innerHTML = workTime < 10 ? '0' + workTime : workTime;
    document.getElementById('seconds').innerHTML = seconds < 10 ? '0' + seconds : seconds;

    workTittle.classList.add('active');
}

start_btn.onclick = () => {

    showNotifications('Pomodoro is running!');

    start_btn.style.display = 'none';
    reset_btn.style.display = 'block';

    seconds = 59;

    let workMinutes = workTime - 1;
    let breakMinutes = breakTime - 1;

    breakCount = 0;

    let timerFunction = () => {
        document.getElementById('minutes').innerHTML = workMinutes < 10 ? '0' + workMinutes : workMinutes;
        document.getElementById('seconds').innerHTML = seconds < 10 ? '0' + seconds : seconds;

        seconds = seconds - 1;

        if (seconds === 0) {
            workMinutes = workMinutes - 1;
            if (workMinutes === -1) {
                if (breakCount % 2 === 0) {

                    showNotifications('Break time!');

                    workMinutes = breakMinutes;
                    breakCount++

                    workTittle.classList.remove('active');
                    workTittle.classList.remove('is-bolid');

                    breakTittle.classList.add('active');
                    breakTittle.classList.add('is-bolid');
                } else {

                    showNotifications('Working time!');

                    workMinutes = workTime;
                    breakCount++

                    breakTittle.classList.remove('active');
                    breakTittle.classList.remove('is-bolid');

                    workTittle.classList.add('active');
                    workTittle.classList.add('is-bolid');
                }
            }
            seconds = 59;
        }
    }

    intervalID = setInterval(timerFunction, 1000);
}

reset_btn.onclick = () => {

    showNotifications('Pomodoro is stopped!');

    breakTittle.classList.remove('active');
    workTittle.classList.add('active');

    start_btn.style.display = 'block';
    reset_btn.style.display = 'none';

    // Reset seconds
    seconds = '0';

    // Reset displayed time
    document.getElementById('minutes').innerHTML = workTime < 10 ? '0' + workTime : workTime;
    document.getElementById('seconds').innerHTML = seconds < 10 ? '0' + seconds : seconds;

    workTittle.classList.add('active');
    workTittle.classList.add('is-bolid');

    breakTittle.classList.remove('active');
    breakTittle.classList.remove('is-bolid');

    clearInterval(intervalID);
}