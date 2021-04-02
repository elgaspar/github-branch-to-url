var repositoriesInput = $('#repositories');
var urlTemplateInput = $('#urlTemplate');
var btnNameInput = $('#btnName');

loadSettings();

$('#saveBtn').on('click', function(){
    saveSettings();
});

function saveSettings() {
    let values = {
        'repositories': repositoriesInput.val(),
        'urlTemplate': urlTemplateInput.val(),
        'btnName': btnNameInput.val()
    };

    chrome.storage.sync.set(values, function () {
        showNotification();
    });

}

function loadSettings() {
    let settings = ['repositories', 'urlTemplate', 'btnName'];

    chrome.storage.sync.get(settings, function (result) {

        if (result.repositories) {
            repositoriesInput.val(result.repositories);
        }

        if (result.urlTemplate) {
            urlTemplateInput.val(result.urlTemplate);
        }

        if (result.btnName) {
            btnNameInput.val(result.btnName);
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