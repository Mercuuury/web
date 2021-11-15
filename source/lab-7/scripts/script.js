function createFactsListElement(record) {
    let factsListElement = document.createElement('div');
    factsListElement.classList.add('facts-list-item');
    factsListElement.innerHTML = record.fact;
    return factsListElement;
}

function renderRecords(records) {
    let factsList = document.querySelector('.facts-list');
    factsList.innerHTML = '';
    for (let i = 0; i < records.length; i++) {
        factsList.append(createFactsListElement(records[i]));
    }
}

function downloadData() {
    let factsList = document.querySelector('.facts-list');
    let xhr = new XMLHttpRequest();
    xhr.open('GET', factsList.dataset.url);
    xhr.responseType = 'json';
    xhr.onload = function() {
        renderRecords(this.response.data);
    }
    xhr.send();
}

window.onload = function() {
    downloadData();
}