
chrome.storage.local.get(['blockedList'], (result) => {
    const { blockedList } = result;

    for (url of blockedList) {
        if (window.location.hostname.includes(url) || url.includes(window.location.hostname)) {
            document.head.innerHTML = '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.4/css/bulma.min.css" />'
            document.body.innerHTML = '<section class="hero is-fullheight"><div class="hero-body has-text-centered"><div class="container"><p class="title is-1">Do your works. Don\'t waste your time!</p></div></div></section>'
        }
    }
});