const CONFIG = load_config();

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
    return load_default_config();
}