// Tabs transition
const tabs = document.querySelectorAll('.tabs li')
const tabsContent = document.querySelectorAll('#tab-content > div')

tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
        tabs.forEach(item => item.classList.remove('is-active'));
        tab.classList.add('is-active')

        const target = tab.dataset.target;

        tabsContent.forEach(box => {
            if (box.getAttribute('id') === target) {
                box.classList.remove('is-hidden');
            }
            else {
                box.classList.add('is-hidden');
            }
        });
    });
});

// --------------------------------------------------------------------------------

// Handling for working-tab
const start_btn = document.getElementById('start-btn');

start_btn.onclick = () => {
    chrome.runtime.sendMessage({ event: 'onStart' });

    start_btn.disabled = true;
};

// --------------------------------------------------------------------------------

// Handling for settings-tab
const save_btn = document.getElementById('save-btn');

const blocked_list = document.getElementById('blocked-list-id');
const end_time = document.getElementById('end-time-id');
const push_notifications = document.getElementById('push-notifications-id');

save_btn.onclick = () => {

    let end_time_value;

    if (!end_time.value) {

        let next_time = new Date();
        next_time.setMinutes(next_time.getMinutes() + 30);
        next_time.setSeconds(0);
        next_time.setMilliseconds(0);

        end_time_value = next_time;
    }
    else {
        const [hours, minutes] = end_time.value.split(':');

        let next_time = new Date();
        next_time.setHours(hours, minutes);
        next_time.setSeconds(0);
        next_time.setMilliseconds(0);

        let current_time = new Date();

        if (next_time > current_time) {
            end_time_value = next_time;
        }
        else {
            current_time.setMinutes(current_time.getMinutes() + 30);
            current_time.setSeconds(0);
            current_time.setMilliseconds(0);

            end_time_value = current_time;
        }
    }

    const prefs = {
        'blockedList': blocked_list.value.split('\n').filter(element => element !== ''),
        'endTime': end_time_value,
        'pushNotifications': push_notifications.checked
    }

    chrome.runtime.sendMessage({ event: 'onSaveChanges', prefs });
};

// --------------------------------------------------------------------------------

// Get prefs from storage
chrome.storage.local.get(['blockedList', 'endTime', 'pushNotifications'], (result) => {
    const { blockedList, endTime, pushNotifications } = result;

    if (blockedList) {
        blocked_list.value = blockedList.join('\n');
    }

    if (endTime) {
        let temp = new Date(endTime);
        let hours = temp.getHours().toString().padStart(2, '0');
        let minutes = temp.getMinutes().toString().padStart(2, '0');

        end_time.value = hours + ':' + minutes;
    }

    if (pushNotifications) {
        push_notifications.checked = pushNotifications;
    }
});

// --------------------------------------------------------------------------------