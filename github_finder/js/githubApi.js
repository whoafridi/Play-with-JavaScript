// common variable added for accessing to everywhere //
const searchResult = document.getElementById("search-result");
const result = document.getElementById('result');
const searchField = document.getElementById("book-search");

// book api initiate
const githubApi = () => {
    const searchText = searchField.value;
    if (searchField.value == ''){
        alert("Please enter a valid username");
    }
    else{
    const url = `https://api.github.com/users/${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => {
        if (data.message === 'Not Found') {
            let src = `https://docs.github.com/en/rest/reference/users#get-a-user`
            result.innerHTML =  `<div class="alert alert-light text-muted fw-bold" role="alert">
                User not found. <a href="${src}" class="text-decoration-none">Learn more</a>
                </div>`
            searchResult.textContent = '';
        } else {
            displayResult(data);
        }
    });
    searchField.value = '';
    }
};
// display in html template
const displayResult = data => {
    searchResult.textContent = '';
    result.textContent = '';
   // adding details in html template using dom
        const resultDiv = document.createElement('div');
        resultDiv.classList.add('col');
            // adding content
        resultDiv.innerHTML = `
            <div class="h-50">
                <div>
                <img src=${data.avatar_url} class="img-fluid card-img-top img-fluid rounded  h-50 w-auto rounded mx-auto d-block" alt="${data.name}">
                </div>
              
                
                <div class="card-body shadow p-3 mt-2 bg-body rounded">
                <h5 class="card-title">Name: ${data.name}</h5>
                <p class="card-text">Bio : ${data.bio}</p>
                <p class="card-title">Followers: ${data.followers}</p>
                <p class="card-text">Public repositories : ${data.public_repos}</p>
                <p class="card-text">Company : ${data.company}</p>
                <p class="card-text">Location : ${data.location}</p>
                <h6 class="card-title text-muted">Created github : ${data.created_at}</h6>
                <a href="${data.html_url}" class="btn btn-primary">Go to github account</a>
                </div>
            </div>
            `
        searchResult.appendChild(resultDiv); 
};