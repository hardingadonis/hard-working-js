// let options_form = document.getElementById('options-form');

// let site_list = document.getElementById('site-list');

// let duration_elements = {};
// duration_elements['working'] = document.getElementById('working-duration');
// duration_elements['break'] = document.getElementById('break-duration');

// let time_format_error = document.getElementById('time-format-error');

// let show_notifications = document.getElementById('show-notifications');
// let auto_start = document.getElementById('auto-start');

// let save_successful = document.getElementById('save-successful');

// options_form.onsubmit = function () {
//     console.log("options-form submitted");

//     const TIME_REGEX = /^(?:[0-5][0-9]):(?:[0-5][0-9])$/;
//     let durations = {}; // in seconds

//     for (var key in duration_elements) {
//         var duration_str = duration_elements[key].value;

//         var result = duration_str.match(TIME_REGEX);
//         if (result) {
//             result_str = result[0].split(':');
//             durations[key] = result_str[0] * 60 + result_str[1];

//             console.log(key + ' time is ' + durations[key] + ' seconds')
//         }
//         else {
//             time_format_error.removeAttribute('hidden');
//             save_successful.setAttribute('hidden', 'hidden');

//             return false;
//         }
//     }
//     console.log(durations);

//     time_format_error.setAttribute('hidden', 'hidden');
//     save_successful.removeAttribute("hidden");

//     return false;
// }

// site_list.onfocus = function() {
//     time_format_error.setAttribute('hidden', 'hidden');
//     save_successful.setAttribute('hidden', 'hidden');
// }

let CONFIG = load_config();

function load_default_config() {
    return {
        site_list: [
            'facebook.com',
            'youtube.com',
            'twitter.com',
            'tiktok.com',
            'reddit.com'
        ],
        durations: { // in seconds
            working: 25 * 60,
            break: 5 * 60
        },
        show_notifications: true,
        auto_start: false
    };
}

function load_config() {
    console.log('Loading config...');
    // chrome.storage.local.set({ config: load_default_config() }).then(() => {
    //   });
    chrome.storage.local.get('config').then((result) => {
        console.log("Value currently is " + result.key);
      });
    return load_default_config();
}