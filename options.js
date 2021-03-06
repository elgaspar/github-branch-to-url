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
        if (result.btnName) {
            btnNameInput.value = result.btnName;
        }

        if (result.urlTemplate) {
            urlTemplateInput.value = result.urlTemplate;
        }
    });
}

function showNotification() {
    let notification = $('.notification');

    notification.slideDown();

    setTimeout(function () {
        notification.slideUp();
    }, 3000);
}