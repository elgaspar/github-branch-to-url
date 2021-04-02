$(document).ready(function(){
    chrome.storage.sync.get(['repositories', 'urlTemplate', 'btnName'], function (result) {
        console.log(result);
        let repositories = result.repositories.split(',');

        for (const repo of repositories){
            if (isRepoPage(repo)) {
                let button = createButton(result.repositories, result.urlTemplate, result.btnName);
                addButtonToPage(button);
                return;
            }
        }
    });
});

function isRepoPage(repoName) {
    let repoUrl = 'https://github.com/' + repoName;

    if (document.location.href.startsWith(repoUrl)) {
        return true;
    }

    return false;
}

function createButton(urlTemplate, btnName) {
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