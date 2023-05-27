let working_duration_label = document.getElementById('working-duration-label')
let break_duration_label = document.getElementById('break-duration-label')

let working_duration = document.getElementById('working-duration')
let break_duration= document.getElementById('break-duration')

let start_btn= document.getElementById('start-btn')
let stop_btn= document.getElementById('stop-btn')

start_btn.onclick = function() {
    console.log('start-btn clicked');

    start_btn.setAttribute('hidden', 'hidden');
    stop_btn.removeAttribute('hidden');
}

stop_btn.onclick = function() {
    console.log('stop-btn clicked');

    stop_btn.setAttribute('hidden', 'hidden');
    start_btn.removeAttribute('hidden');
}