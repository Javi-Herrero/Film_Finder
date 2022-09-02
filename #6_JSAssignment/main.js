import movies from "./database.js";


/// SEARCH FUNCTION
const search = (textToSearch) => {
    let nameFilteredMovies = movies.filter((item) => {
        let titleLowCase = item.title.toLocaleLowerCase()
        return titleLowCase.includes(textToSearch)
    })
    showFilms(nameFilteredMovies)
};

// SHOWING THE FILMS IN THE DOM

let filmArea = document.getElementById('filmArea');
let container = document.createElement('section');
const showFilms = (arr) => {
    /// FIRST erase last films shown (if any)
    (() => {
        let lastChild = container.lastElementChild;
        while (lastChild) {
            container.removeChild(lastChild)
            lastChild = container.lastElementChild
        }
    })();

    ////THEN show new requested films
    arr.forEach((element, index) => {
        let filmPoster = document.createElement('article');
        let filmImg = document.createElement('img');
        let link = document.createElement('a');
        link.href = `https://www.imdb.com/title/${element.imdbID}`;
        link.appendChild(filmImg);
        filmPoster.appendChild(link);
        container.appendChild(filmPoster);
        filmPoster.id = index;
        filmImg.src = element.poster;
    });
    filmArea.appendChild(container)
};

/// FILTER BY YEAR > 2014

const yearFilter = () => {
    let yearFilteredMovies = movies.filter((item) => {
        return parseInt(item.year) >= 2014
    })
    showFilms(yearFilteredMovies)
};

//FILTER BY NAME
//this calls the search using the text from user as input

const typeSearch = (textToSearch) => {
    textToSearch = document.querySelector('#searchText').value;
    let textToSearchLow = textToSearch.toLowerCase()
    search(textToSearchLow)
    document.querySelector('#filmFilter').reset();
    document.querySelector('#searchText').value = textToSearch;
};

// this calls the search using the radio buttons as input


const fixedSearch = (textToSearch) => {
    let checkedOption = document.querySelectorAll('input[name="filter"]');
    for (let i = 0; i < checkedOption.length; i++) {
        if (checkedOption[i].checked) { textToSearch = checkedOption[i].value; break }
    };
    textToSearch = textToSearch.toLowerCase()
    search(textToSearch);
    document.querySelector('#searchText').value = "";
};


///ADDING THE EVENT LISTENERS...

document.querySelector('#submit').addEventListener('click', typeSearch)

for (const btn of document.querySelectorAll('input[class="fixedName"]')) {
    btn.addEventListener('click', fixedSearch)
}

document.querySelector('#latest').addEventListener('click', yearFilter)
document.querySelector('#searchText').addEventListener('keypress', e => {
    if (e.key === 'Enter') {
        typeSearch()
        e.preventDefault()
    }
});




