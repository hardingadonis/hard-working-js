chrome.runtime.onMessage.addListener(data => {
    const { event, prefs } = data;

    switch (event) {
        case 'onStart': {
            handleOnStart();
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

const handleOnStart = function () {
    createAlarm();
};

const handleOnSaveChange = (prefs) => {
    chrome.storage.local.set(prefs);
};

const ALARM_JOB_NAME = "RUNNING";
const createAlarm = () => {
    chrome.alarms.create(ALARM_JOB_NAME, { periodInMinutes: 1.0 })
};

// chrome.alarms.onAlarm.addListener(() => {
//     console.log('runing')

//     chrome.storage.local.get(['endTime'], (result) => {
//         const { endTime } = result;

//         let timeLeft = new Date(endTime) - new Date();

//         if (timeLeft <= 0) {
//             console.log('ddm xong roi')
//             chrome.alarms.clearAll();
//         }
//         else {
//             console.log('dit me chua xong')

//             let timeLeftInSeconds = Math.floor(timeLeft / 1000);
//             let timeLeftInMinutes = Math.floor(timeLeftInSeconds / 60);
//             let timeLeftInHours = Math.floor(timeLeftInMinutes / 60);

//             let timeLeftinStr = (timeLeftInHours < 9 ? '0' + timeLeftInHours : timeLeftInHours) + ':' + (timeLeftInMinutes < 9 ? '0' + timeLeftInMinutes : timeLeftInMinutes);

//             console.log(timeLeftinStr)
//         }
//     });
// });