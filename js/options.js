let options_form = document.getElementById('options-form');

let site_list = document.getElementById('site-list');

let duration_elements = {};
duration_elements['working'] = document.getElementById('working-duration');
duration_elements['break'] = document.getElementById('break-duration');

let time_format_error = document.getElementById('time-format-error');

let show_notifications = document.getElementById('show-notifications');
let auto_start = document.getElementById('auto-start');

let save_successful = document.getElementById('save-successful');

let background = chrome.extension.getViews();
console.log(background)

options_form.onsubmit = function () {
    console.log("options-form submitted");

    const TIME_REGEX = /^(?:[0-9]|[1-5][0-9]|60)$/;
    let durations = {};

    for (var key in duration_elements) {
        var duration_str = duration_elements[key].value;

        var result = duration_str.match(TIME_REGEX);
        if (result) {
            durations[key] = result[0];

            console.log(key + ' time is ' + durations[key] + ' minutes')
        }
        else {
            time_format_error.removeAttribute('hidden');
            save_successful.setAttribute('hidden', 'hidden');

            return false;
        }
    }
    console.log(durations);



    time_format_error.setAttribute('hidden', 'hidden');
    save_successful.removeAttribute("hidden");

    return false;
}

site_list.onfocus = function() {
    time_format_error.setAttribute('hidden', 'hidden');
    save_successful.setAttribute('hidden', 'hidden');
}