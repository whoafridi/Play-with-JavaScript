const showProfile =() => {
    let username = document.getElementById("githubUsername").value;
    if (username == ""){
        alert("please enter github username")
    }
    else{
    const api = "https://api.github.com/users/"+username
    fetch(api).then(res=> res.json()).then(data =>{
        if(data.message){
            console.log("User not found") 
            document.getElementById("resultContainer").innerHTML = `
                <p>User not found</p>
            `
        }else{
    document.getElementById("resultContainer").innerHTML = `
        <img src="${data.avatar_url}" style="width:20%">
        <p>Name: ${data.name}</p>
        <p>Location: ${data.location}</p>
        <p>Bio: ${data.bio}</p>
        `
        }
        
    }).catch(e=>{
        console.log(e)
    });   
}
};

document.getElementById("github").addEventListener('click', showProfile);

const randomQuote = () =>{
    const api  = "https://animechan.vercel.app/api/random"
    fetch(api).then(res => res.json()).then(data =>{
        
    document.getElementById("quoteGenerator").innerHTML = `
        <h3>Quote-${data.quote}</h3>
        <p>Anime -${data.anime}</p></br>
        <p>Character -${data.character}<p></br>
        `
    }
    ).catch(e=>{console.log(e)});
}
document.getElementById("random").addEventListener('click', randomQuote);

const showSeries =() => {
    let series = document.getElementById("webSeriesname").value;
    if (series == ""){
        alert("please enter webseries name")
    }
    else{
    const api = "http://api.tvmaze.com/singlesearch/shows?q="+series
    fetch(api).then(res=> res.json()).then(data =>{
       
    document.getElementById("seriesContainer").innerHTML = `
        <p>Web series name:${data.name}</p>
        <p>Language:${data.language}</p>
        <p>Official site: <a href="${data.officialSite}">Link</a></p>
        <p>Premiered date:${data.premiered}</p>
        <img src="${data.image.medium}">
        <p>Url: <a href="${data.url}">TvMaze</a></p>
        `
        }).catch(e=>{
        console.log(e)
    });   
}
};

document.getElementById("series").addEventListener('click', showSeries);
