chrome.runtime.onMessage.addListener(data => {
    const { event, prefs } = data;

    switch (event) {
        case 'onStart': {
            break;
        }

        case 'onSaveChanges': {
            handleOnSaveChange(prefs);
            break;
        }

        default:
            break;
    };
});

const handleOnSaveChange = (prefs) => {
    chrome.storage.local.set(prefs);
};