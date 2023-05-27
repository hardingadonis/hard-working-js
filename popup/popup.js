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

const start_btn = document.getElementById('start-btn');
start_btn.onclick = () => {
    start_btn.disabled = true;
    stop_btn.disabled = false;
    chrome.storage.local.set({ 'isRunning': true })
};

const stop_btn = document.getElementById('stop-btn');

stop_btn.onclick = () => {
    stop_btn.disabled = true;
    start_btn.disabled = false;
    chrome.storage.local.set({ 'isRunning': false })
};

chrome.storage.local.get(['isRunning'], (result) => {
    const { isRunning } = result;

    if (isRunning) {
        start_btn.disabled = true;
        stop_btn.disabled = false;
    }
    else {
        stop_btn.disabled = true;
        start_btn.disabled = false;
    }
});



const save_btn = document.getElementById('save-btn');

const blocked_list = document.getElementById('blocked-list-id');

save_btn.onclick = () => {
    chrome.storage.local.set({ 'blockedList': blocked_list.value.split('\n').filter(element => element !== '') });
};

chrome.storage.local.get(['blockedList'], (result) => {
    const { blockedList } = result;
    blocked_list.value = blockedList.join('\n');
});