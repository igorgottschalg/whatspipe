/* eslint-disable strict */
function save_options() {
    let message = document.getElementById('message').value;
    chrome.storage.sync.set({ message: message }, function() {
        let status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
}
function restore_options() {
    chrome.storage.sync.get({ message: 'Olá {usuario}, como vai?' }, function(items) {
        document.getElementById('message').value = items.message;
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
