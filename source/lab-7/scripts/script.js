function createAuthorElement(record) {
    let authorElement = document.createElement('div');
    authorElement.classList.add('author-name');
    let user = record.user || {'name': {'first': '', 'last': ''}};
    authorElement.innerHTML = user.name.first + ' ' + user.name.last;
    return authorElement;
}

function createUpvotesElement(record) {
    let itemElement = document.createElement('div');
    itemElement.classList.add('upvotes');
    itemElement.innerHTML = record.upvotes;
    return itemElement;
}

function createFooterElement(record) {
    let footerElement = document.createElement('div');
    footerElement.classList.add('footer');
    footerElement.append(createAuthorElement(record));
    footerElement.append(createUpvotesElement(record));
    return footerElement;
}

function createContentElement(record) {
    let itemElement = document.createElement('div');
    itemElement.classList.add('item-content');
    itemElement.innerHTML = record.text;
    return itemElement;
}

function createFactsListElement(record) {
    let itemElement = document.createElement('div');
    itemElement.classList.add('facts-list-item');
    itemElement.append(createContentElement(record));
    itemElement.append(createFooterElement(record));
    return itemElement;
}

function renderRecords(records) {
    let factsList = document.querySelector('.facts-list');
    factsList.innerHTML = '';
    for (let i = 0; i < records.length; i++) {
        factsList.append(createFactsListElement(records[i]));
    }
}

function perPageBtnHandler(event) {
    downloadData(1);
}

function pageBtnHandler(event) {
    if (event.target.dataset.page) {
        downloadData(event.target.dataset.page);
        window.scrollTo(0,0);
    }
}

function setPaginationInfo(info) {
    document.querySelector('.total-count').innerHTML = info.total_count;
    let start = info.total_count > 0 ? (info.current_page - 1) * info.per_page + 1 : 0;
    let end = Math.min(info.total_count, start + info.per_page - 1);
    document.querySelector('.current-interval-start').innerHTML = start;
    document.querySelector('.current-interval-end').innerHTML = end;
}

function createPageBtn(page, classes = []) {
    let btn = document.createElement('button');
    classes.push('btn');
    for (cls of classes) {
        btn.classList.add(cls);
    }
    btn.dataset.page = page;
    btn.innerHTML = page;
    return btn;
}

function renderPaginationElement(info) {
    let btn;
    let paginationContainer = document.querySelector('.pagination');
    paginationContainer.innerHTML = '';

    btn = createPageBtn(1, ['first-page-btn']);
    btn.innerHTML = 'Первая страница';
    if (info.current_page == 1) btn.style.visibility = 'hidden';
    paginationContainer.append(btn);


    let buttonsContainer = document.createElement('div');
    paginationContainer.append(buttonsContainer);
    let start = Math.max(info.current_page - 2, 1);
    let end = Math.min(info.current_page + 2, info.total_pages);
    for (let i = start; i <= end; i++) {
        buttonsContainer.append(createPageBtn(i, i == info.current_page ? ['active'] : []));
    }


    btn = createPageBtn(info.total_pages, ['last-page-btn']);
    btn.innerHTML = 'Последняя страница';
    if (info.current_page == info.total_pages) btn.style.visibility = 'hidden';
    paginationContainer.append(btn);
}

function searchBtnHandler(event) {
    searchVal = document.querySelector('.search-field').value;
    downloadData(1, searchVal);
    window.scrollTo(0,0);
}

function downloadData(page=1, q="") {
    let perPage = document.querySelector('.per-page-btn').value;
    let factsList = document.querySelector('.facts-list');

    let url = new URL(factsList.dataset.url);
    url.searchParams.append('page', page);
    url.searchParams.append('per-page', perPage);
    url.searchParams.append('q', q);

    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = function() {
        renderRecords(this.response.records);
        setPaginationInfo(this.response['_pagination']);
        renderPaginationElement(this.response['_pagination']);
    }
    xhr.send();
}

window.onload = function() {
    downloadData();
    document.querySelector('.per-page-btn').onchange = perPageBtnHandler;
    document.querySelector('.pagination').onclick = pageBtnHandler;
}