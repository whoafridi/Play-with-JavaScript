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
        result.innerHTML = `<div class="alert alert-light text-muted fw-bold" role="alert">
        Please enter a valid movie-name.
        </div>`
        searchField.value = '';
    }
    else{
    const url = `https://fake-movie-database-api.herokuapp.com/api?s=${searchText}`;
    // check search txt containes more than 3 letters or not
    if(searchText.length < 3){
        result.innerHTML =  `<div class="alert alert-light text-muted fw-bold" role="alert">
            Search term is too short, use three letters or more. <a href=${src} class="text-decoration-none">Learn more</a>
                </div>`
            searchField.value = '';
            searchResult.textContent = '';
    }else{
    fetch(url)
    .then(res => res.json())
    .then(data => {
        // check movies are in api or not
        if (data.Search.length === 0) {
            result.innerHTML =  `<div class="alert alert-light text-muted fw-bold" role="alert">
                Movie not found. <a href=${src} class="text-decoration-none">Learn more</a>
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