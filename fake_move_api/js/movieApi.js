// common variable added for accessing to everywhere //
const searchResult = document.getElementById("search-result");
const result = document.getElementById('result');
const searchField = document.getElementById("movie-search");
const src = `https://fake-movie-database-api.herokuapp.com/`;

// book api initiate
const movieApi = () => {
    const searchText = searchField.value;
    // check search field empty or not
    if (searchField.value == ''){
        result.innerHTML = `<div class="alert alert-light text-muted fw-bold d-flex align-items-center" role="alert">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
            </svg>
        <div>
            Please enter a valid movie name.
        </div>
        </div>`
        searchField.value = '';
    }
    else{
    const url = `https://fake-movie-database-api.herokuapp.com/api?s=${searchText}`;
    // check search txt containes more than 3 letters or not
    if(searchText.length < 3){
        result.innerHTML =  `
        <div class="alert alert-light text-muted fw-bold d-flex align-items-center" role="alert">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
            </svg>
            <div>
                Search term is too short, use three letters or more. <a href=${src} class="text-decoration-none">Learn more</a>
            </div>
        </div>`
            searchField.value = '';
            searchResult.textContent = '';
    }else{
    fetch(url)
    .then(res => res.json())
    .then(data => {
        // check movies are in api or not
        if (data.Search.length === 0) {
            result.innerHTML =  `<div class="alert alert-light text-muted fw-bold d-flex align-items-center" role="alert">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
            </svg>
        <div>
            Movie not found. <a href=${src} class="text-decoration-none">Learn more</a>
        </div>
        </div>`
            searchResult.textContent = '';
        } else {
            displayResult(data);
            console.log(data.Search.length);
        }
    });
    searchField.value = '';
    }
}};
// display result in html template
const displayResult = data => {
    searchResult.textContent = '';
    result.textContent = ''; 
    // adding content
    data.Search.forEach(item => {
        let src = item.Poster;
        if (src === 'Not Found'){
            src= `https://sitechecker.pro/wp-content/uploads/2017/12/ahrefs-404-page-not-found.png`;
        }else{
            src;
        }
        const resultDiv = document.createElement('div');
        resultDiv.classList.add('col');
        resultDiv.innerHTML = `
            <div class="card h-80">
                <img src=${src} class="card-img-top img-fluid rounded img-fluid " alt=${item.Title}>
                <div class="card-body">
                  <h5 class="card-title">${item.Title}</h5>
                  <h6 class="text-center w-auto py-2">By ${item.Year}</h6>
                  <p class="text-center">Id: ${item.imdbID}  </p>
                </div>
            </div>
            `
        searchResult.appendChild(resultDiv); 
    });
};