var btnNameInput = document.getElementById('btnName');
var urlTemplateInput = document.getElementById('urlTemplate');

loadSettings();

$('#saveBtn').on('click', function(){
    saveSettings();
});

function saveSettings() {
    let values = {
        'btnName': btnNameInput.value,
        'urlTemplate': urlTemplateInput.value
    };

    chrome.storage.sync.set(values, function () {
        showNotification();
    });

}

function loadSettings() {
    let settings = ['btnName', 'urlTemplate'];

    chrome.storage.sync.get(settings, function (result) {
        btnNameInput.value = result.btnName;
        urlTemplateInput.value = result.urlTemplate;
    });
}

function showNotification() {
    let notification = $('.notification');

    notification.slideDown();

    setTimeout(function () {
        notification.slideUp();
    }, 3000);
}