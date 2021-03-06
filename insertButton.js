chrome.storage.sync.get(['btnName', 'urlTemplate'], function (result) {
    let button = createButton(result.btnName, result.urlTemplate);
    addButtonToPage(button);
});


function createButton(btnName, urlTemplate) {
    let button = $('<a></a>');
    button.addClass('btn btn-sm d-inline-block float-none m-0 mr-md-0');
    button.attr('style', 'margin-right: 4px !important');

    button.html(btnName ? btnName : 'Branch URL');

    if (!urlTemplate) {
        setUninitializedHandler(button);
        return button;
    }

    if (!urlTemplate.startsWith('http://') && !urlTemplate.startsWith('https://')) {
        urlTemplate = 'http://' + urlTemplate;
    }

    let branchName = $('.js-clipboard-copy').attr('value');
    button.attr('href', urlTemplate.replace('#', branchName));
    button.attr('target', '_blank');

    return button;
}

function setUninitializedHandler(element) {
    element.on('click', function () {
        alert('You haven\'t set a URL template.')
    });
}

function addButtonToPage(button) {
    let container = $('.gh-header-actions');
    container.prepend(button);
}