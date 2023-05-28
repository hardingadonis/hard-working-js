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

// ----------------------------------------------------------------------

// Handling for Start button

const start_btn = document.getElementById('start-btn');
start_btn.onclick = () => {
    start_btn.disabled = true;
    stop_btn.disabled = false;

    chrome.storage.sync.set({ 'isRunning': true })
    chrome.action.setBadgeText({ text: 'on' });

    chrome.notifications.create({
        title: 'Hard-working JS',
        message: 'Hard-working JS is running!',
        iconUrl: '../assets/icon-128.png',
        type: 'basic'
    });
};

// ----------------------------------------------------------------------

// Handling for Stop button

const stop_btn = document.getElementById('stop-btn');

stop_btn.onclick = () => {
    stop_btn.disabled = true;
    start_btn.disabled = false;

    chrome.storage.sync.set({ 'isRunning': false })
    chrome.action.setBadgeText({ text: 'off' });

    chrome.notifications.create({
        title: 'Hard-working JS',
        message: 'Hard-working JS is stopped!',
        iconUrl: '../assets/icon-128.png',
        type: 'basic'
    });
};

// ----------------------------------------------------------------------

chrome.storage.sync.get(['isRunning'], (result) => {
    const { isRunning } = result;

    if (isRunning) {
        start_btn.disabled = true;
        stop_btn.disabled = false;

        chrome.action.setBadgeText({ text: 'on' });
    }
    else {
        stop_btn.disabled = true;
        start_btn.disabled = false;

        chrome.action.setBadgeText({ text: 'off' });
    }
});

// ----------------------------------------------------------------------

// Handling for Save button

const save_btn = document.getElementById('save-btn');

const blocked_list = document.getElementById('blocked-list-id');

save_btn.onclick = () => {
    chrome.storage.sync.set({ 'blockedList': blocked_list.value.split('\n').filter(element => element !== '') });
};

chrome.storage.sync.get(['blockedList'], (result) => {
    const { blockedList } = result;

    if (blockedList) {
        blocked_list.value = blockedList.join('\n');
    }
});

// ----------------------------------------------------------------------

// Handling for Pomodoro button

const pomodoro_btn = document.getElementById('pomodoro-btn');

pomodoro_btn.onclick = () => {
    chrome.tabs.create({ url: './pomodoro/pomodoro.html' });
};