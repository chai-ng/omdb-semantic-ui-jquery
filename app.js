var options = {
    url: "http://omdbapi.com/?t=jaws&apikey=2f6435d9",
    method: "get"
}

document.querySelector('button').addEventListener('click', (event) => {
    // prevent the form submitting
    event.preventDefault();

    // show loader
    var results = document.querySelector('.results');
    results.classList.add('segment');
    results.innerHTML = '<div class="ui active centered inline loader"></div>';
    var searchString = document.querySelector('input').value

    // Add to history on sidebar
    var searchHistory = `<a class="item">${searchString}</a>`
    $(".sidebar").append(searchHistory);
    
    // request from movie API
    $.ajax(`http://omdbapi.com/?s=${searchString}&apikey=d239368d`).done(movies => {
        // remove the loader
        results.innerHTML = '';

        // build out each movie
        movies.Search.forEach(movie => {
            var item = document.createElement('div');
            item.classList.add("item");

            var content = document.createElement('div');
            content.classList.add("content")
            
            var header = document.createElement('a');
            header.classList.add("header");
            header.href = `https://www.imdb.com/title/${movie.imdbID}`;
            header.target = "_blank";
            header.innerText = movie.Title;

            var poster = document.createElement('img');
            poster.classList.add("ui", "image", "avatar");
            poster.src = movie.Poster

            item.appendChild(poster);
            item.appendChild(content);
            content.appendChild(header);
            results.appendChild(item);
        });
    });
})

$('.history.icon.link').click(function () {
    $('.ui.sidebar').sidebar('toggle');
});

// $('.history.icon.link').addEventListener('click', () => {
// });
