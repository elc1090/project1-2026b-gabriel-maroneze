// API Key
const API_KEY = "35a13243cc51617756240cd4b86cae9d";
const baseURL = "https://image.tmdb.org/t/p/w500";

// API Paths
const apiPaths = {
    searchMovie: (query) =>
        `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}`,

    findGenres:
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`,

    findCast: (movieId) =>
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`
};


// DOM Elements
const searchInput = document.querySelector(
    '.input-field input'
);

const darkModeBtn = document.querySelector(
    'header .theme-mode-btns .dark-mode'
);

const lightModeBtn = document.querySelector(
    'header .theme-mode-btns .light-mode'
);

const searchMovieListContainer = document.querySelector(
    '.search-movie-list-container'
);

const movieContainer = document.querySelector(
    '.movie-container'
);

const castContainer = document.querySelector(
    '.movie-container .cast-details-container'
);

const castDetailsContainer = document.querySelector(
    '.movie-container .cast-details-container .cast-details'
);

const adultContentElement = document.querySelector(
    '.movie-details-container .movie-details .adult-content span'
);

const originalLanguageElement = document.querySelector(
    '.movie-details-container .movie-details .original-language span'
);


// Favorite Elements
const favoriteBtn = document.querySelector(
    '.favorite-btn'
);

const favoriteIcon = favoriteBtn.querySelector('i');
const favoriteText = favoriteBtn.querySelector('span');

const favoritesBtn = document.querySelector(
    '.favorites-btn'
);

const favoritesListContainer = document.querySelector(
    '.favorites-list-container'
);


// Watched Elements
const watchedBtn = document.querySelector(
    '.watched-btn'
);

const watchedIcon = watchedBtn.querySelector('i');
const watchedText = watchedBtn.querySelector('span');

const watchedListBtn = document.querySelector(
    '.watched-list-btn'
);

const watchedListContainer = document.querySelector(
    '.watched-list-container'
);


// Currently Selected Movie
let currentMovie = null;


// Find Genres
const findGenres = async (genreIds) => {
    const genres = [];

    try {
        const response = await fetch(apiPaths.findGenres);
        const data = await response.json();

        genreIds.forEach(genreId => {
            for (const genre of data.genres) {
                if (genreId === genre.id) {
                    genres.push(genre.name);
                    break;
                }
            }
        });

        return genres;
    }
    catch (error) {
        console.log(error);
        return [];
    }
};


// Adult Content
const getAdultContent = (adult) => {
    if (adult === true) {
        return "Sim";
    }

    return "Não";
};


// Original Language
const getOriginalLanguage = (language) => {
    if (!language) {
        return "Não Informado";
    }

    const languages = {
        en: "Inglês",
        pt: "Português",
        es: "Espanhol",
        fr: "Francês",
        de: "Alemão",
        it: "Italiano",
        ja: "Japonês",
        ko: "Coreano",
        zh: "Chinês",
        ru: "Russo",
        hi: "Hindi"
    };

    return languages[language] || language;
};


// Rating Stars
const updateRatingStars = (rating) => {
    const ratingStarsElement = document.querySelector(
        '.rating-stars'
    );

    ratingStarsElement.replaceChildren();

    const integerRating = Math.floor(
        Number(rating)
    );

    const starsAmount = Math.max(
        1,
        Math.min(10, integerRating)
    );

    for (
        let index = 0;
        index < starsAmount;
        index++
    ) {
        const starIcon = document.createElement('i');

        starIcon.classList.add(
            'fa-solid',
            'fa-star'
        );

        ratingStarsElement.appendChild(starIcon);
    }

    ratingStarsElement.setAttribute(
        'aria-label',
        `${starsAmount} de 10 estrelas`
    );
};


// Clear Genres
const clearGenresList = (genresList) => {
    Array.from(genresList.children).forEach(child => {
        child.remove();
    });
};


// Clear Cast
const clearCastDetailsContainer = () => {
    Array.from(
        castDetailsContainer.children
    ).forEach(child => {
        child.remove();
    });
};


// Add Cast
const addCastToCastDetailsContainer = async (movieId) => {
    clearCastDetailsContainer();

    try {
        const response = await fetch(
            apiPaths.findCast(movieId)
        );

        const data = await response.json();

        const castDetails = data.cast.slice(0, 10);

        if (castDetails.length !== 0) {
            castContainer.style.display = 'block';
        }
        else {
            castContainer.style.display = 'none';
        }

        castDetails.forEach(castObject => {
            const cast = document.createElement('div');
            const image = document.createElement('img');
            const name = document.createElement('p');

            cast.classList.add('cast');

            image.src = castObject.profile_path !== null
                ? baseURL + castObject.profile_path
                : "./images/gray background.jpg";

            image.setAttribute(
                'alt',
                `${castObject.name} Image`
            );

            name.textContent = castObject.name;

            cast.append(image, name);

            castDetailsContainer.appendChild(cast);
        });
    }
    catch (error) {
        console.log(error);
    }
};


// Show Movie Details
const showMovieDetails = (movieObject) => {
    return () => {
        currentMovie = movieObject;

        const movieIsFavorite = isMovieFavorite(
            movieObject.id
        );

        updatedFavoriteButton(movieIsFavorite);

        const movieIsWatched = isMovieWatched(
            movieObject.id
        );

        updatedWatchedButton(movieIsWatched);

        const movieImageURL =
            movieObject.poster_path !== null
                ? baseURL + movieObject.poster_path
                : "./images/gray background.jpg";

        const movieName = movieObject.title;

        const releaseYear = movieObject.release_date
            ? `(${movieObject.release_date.substring(0, 4)})`
            : "";

        const originalTitle = movieObject.original_title;

        const ratings = Number(
            movieObject.vote_average
        ).toFixed(1);

        const movieDescription = movieObject.overview;

        const adultContent = getAdultContent(
            movieObject.adult
        );

        const originalLanguage = getOriginalLanguage(
            movieObject.original_language
        );

        const movieImageElement = document.querySelector(
            '.movie-details-container .movie-image img'
        );

        const movieNameElement = document.querySelector(
            '.movie-details-container .movie-details .movie-name'
        );

        const originalTitleElement = document.querySelector(
            '.movie-details-container .movie-details .movie-original-name span'
        );

        const ratingsElement = document.querySelector(
            '.movie-details-container .movie-details .rating-value'
        );

        const movieDescriptionElement = document.querySelector(
            '.movie-details-container .movie-details .description'
        );

        const genresList = document.querySelector(
            '.movie-details-container .movie-details .genres .genres-list'
        );

        movieImageElement.src = movieImageURL;

        movieNameElement.textContent =
            `${movieName} ${releaseYear}`;

        originalTitleElement.textContent = originalTitle;
        ratingsElement.textContent = ratings;

        updateRatingStars(
            movieObject.vote_average
        );

        movieDescriptionElement.textContent =
            movieDescription || "Descrição não informada.";

        adultContentElement.textContent = adultContent;

        originalLanguageElement.textContent =
            originalLanguage;

        findGenres(
            movieObject.genre_ids.slice(0, 5)
        )
            .then(genres => {
                clearGenresList(genresList);

                genres.forEach(genre => {
                    const listItem =
                        document.createElement('li');

                    listItem.textContent = genre;

                    genresList.appendChild(listItem);
                });
            })
            .catch(error => {
                console.log(error);
            });

        addCastToCastDetailsContainer(
            movieObject.id
        );

        movieContainer.style.display = "block";
        searchMovieListContainer.style.display = "none";

        clearSearchMovieListContainer();

        searchInput.value = "";
    };
};


// Clear Search List
const clearSearchMovieListContainer = () => {
    Array.from(
        searchMovieListContainer.children
    ).forEach(child => {
        child.remove();
    });
};


// Build Search List
const buildSearchMovieList = (moviesList) => {
    if (searchInput.value !== "") {
        searchMovieListContainer.style.display = "block";
    }
    else {
        searchMovieListContainer.style.display = "none";
    }

    clearSearchMovieListContainer();

    moviesList.forEach(movie => {
        const movieItem = document.createElement('p');

        movieItem.textContent = movie.title;

        searchMovieListContainer.appendChild(movieItem);

        movieItem.addEventListener(
            'click',
            showMovieDetails(movie)
        );
    });
};


// Search Movie
const searchMovie = () => {
    const query = searchInput.value.trim();

    if (query === "") {
        clearSearchMovieListContainer();
        searchMovieListContainer.style.display = "none";
        return;
    }

    fetch(apiPaths.searchMovie(query))
        .then(response => response.json())
        .then(data => {
            buildSearchMovieList(
                data.results.slice(0, 10)
            );
        })
        .catch(error => {
            console.log(error);
        });
};


// Toggle Theme
const toggleTheme = () => {
    if (lightModeBtn.style.display !== "none") {
        darkModeBtn.style.display = "block";
        lightModeBtn.style.display = "none";
    }
    else {
        darkModeBtn.style.display = "none";
        lightModeBtn.style.display = "block";
    }

    const root = document.documentElement;

    if (lightModeBtn.style.display !== "none") {
        root.style.setProperty(
            '--body-bg-color',
            "#fff"
        );

        root.style.setProperty(
            '--movie-input-bg-color',
            "#fff"
        );

        root.style.setProperty(
            '--logo-color',
            "#000"
        );

        root.style.setProperty(
            '--secondary-text-color',
            "#000"
        );

        root.style.setProperty(
            '--primary-text-color',
            "#cb2424"
        );

        root.style.setProperty(
            '--primary-border-color',
            "#cc3434"
        );
    }
    else {
        root.style.setProperty(
            '--body-bg-color',
            "#570909"
        );

        root.style.setProperty(
            '--movie-input-bg-color',
            "#570606"
        );

        root.style.setProperty(
            '--logo-color',
            "#fff"
        );

        root.style.setProperty(
            '--secondary-text-color',
            "#fff"
        );

        root.style.setProperty(
            '--primary-text-color',
            "#e63b46"
        );

        root.style.setProperty(
            '--primary-border-color',
            "#eb3a49"
        );
    }
};


// Hide Search List
const hideSearchMovieListContainer = () => {
    setTimeout(() => {
        searchMovieListContainer.style.display = "none";
    }, 130);
};


// Get Favorites
const getFavorites = () => {
    const favorites = localStorage.getItem(
        'favorites'
    );

    if (favorites === null) {
        return [];
    }

    try {
        const parsedFavorites = JSON.parse(favorites);

        return Array.isArray(parsedFavorites)
            ? parsedFavorites
            : [];
    }
    catch (error) {
        console.warn(
            'Os favoritos armazenados estavam inválidos e foram ignorados.',
            error
        );

        return [];
    }
};


// Save Favorites
const saveFavorites = (favorites) => {
    localStorage.setItem(
        'favorites',
        JSON.stringify(favorites)
    );
};


// Check Favorite
const isMovieFavorite = (movieId) => {
    const favorites = getFavorites();

    return favorites.some(
        movie => movie.id === movieId
    );
};


// Update Favorite Button
const updatedFavoriteButton = (isFavorite) => {
    favoriteBtn.classList.toggle(
        'active',
        isFavorite
    );

    favoriteIcon.classList.toggle(
        'fa-regular',
        !isFavorite
    );

    favoriteIcon.classList.toggle(
        'fa-solid',
        isFavorite
    );

    favoriteText.textContent = isFavorite
        ? 'Favoritado'
        : 'Adicionar aos Favoritos';
};


// Render Favorites List
const renderFavoritesList = () => {
    const favorites = getFavorites();

    favoritesListContainer.replaceChildren();

    if (favorites.length === 0) {
        const emptyMessage =
            document.createElement('p');

        emptyMessage.textContent =
            'Nenhum filme favoritado';

        favoritesListContainer.appendChild(
            emptyMessage
        );

        return;
    }

    favorites.forEach(movie => {
        const movieItem =
            document.createElement('p');

        movieItem.textContent = movie.title;

        movieItem.addEventListener(
            'click',
            showMovieDetails(movie)
        );

        favoritesListContainer.appendChild(
            movieItem
        );
    });
};


// Toggle Favorites List
const toggleFavoritesList = () => {
    const listIsOpen =
        favoritesListContainer.style.display === 'block';

    if (!listIsOpen) {
        watchedListContainer.style.display = 'none';

        renderFavoritesList();
    }

    favoritesListContainer.style.display =
        listIsOpen ? 'none' : 'block';
};


// Toggle Favorite
const toggleFavorite = () => {
    if (currentMovie === null) {
        return;
    }

    const favorites = getFavorites();

    const movieIsFavorite = favorites.some(
        movie => movie.id === currentMovie.id
    );

    if (movieIsFavorite) {
        const updatedFavorites = favorites.filter(
            movie => movie.id !== currentMovie.id
        );

        saveFavorites(updatedFavorites);
        updatedFavoriteButton(false);
    }
    else {
        favorites.push(currentMovie);

        saveFavorites(favorites);
        updatedFavoriteButton(true);
    }

    renderFavoritesList();
};


// Get Watched Movies
const getWatchedMovies = () => {
    const watchedMovies = localStorage.getItem(
        'watchedMovies'
    );

    if (watchedMovies === null) {
        return [];
    }

    try {
        const parsedMovies = JSON.parse(
            watchedMovies
        );

        return Array.isArray(parsedMovies)
            ? parsedMovies
            : [];
    }
    catch (error) {
        console.warn(
            'A lista de assistidos estava inválida e foi ignorada.',
            error
        );

        return [];
    }
};


// Save Watched Movies
const saveWatchedMovies = (watchedMovies) => {
    localStorage.setItem(
        'watchedMovies',
        JSON.stringify(watchedMovies)
    );
};


// Check Watched Movie
const isMovieWatched = (movieId) => {
    const watchedMovies = getWatchedMovies();

    return watchedMovies.some(
        movie => movie.id === movieId
    );
};


// Update Watched Button
const updatedWatchedButton = (wasWatched) => {
    watchedBtn.classList.toggle(
        'active',
        wasWatched
    );

    watchedIcon.classList.toggle(
        'fa-regular',
        !wasWatched
    );

    watchedIcon.classList.toggle(
        'fa-solid',
        wasWatched
    );

    watchedText.textContent = wasWatched
        ? 'Assistido'
        : 'Marcar como assistido';
};


// Render Watched List
const renderWatchedList = () => {
    const watchedMovies = getWatchedMovies();

    watchedListContainer.replaceChildren();

    if (watchedMovies.length === 0) {
        const emptyMessage =
            document.createElement('p');

        emptyMessage.textContent =
            'Nenhum filme assistido';

        watchedListContainer.appendChild(
            emptyMessage
        );

        return;
    }

    watchedMovies.forEach(movie => {
        const movieItem =
            document.createElement('p');

        movieItem.textContent = movie.title;

        movieItem.addEventListener(
            'click',
            showMovieDetails(movie)
        );

        watchedListContainer.appendChild(
            movieItem
        );
    });
};


// Toggle Watched List
const toggleWatchedList = () => {
    const listIsOpen =
        watchedListContainer.style.display === 'block';

    if (!listIsOpen) {
        favoritesListContainer.style.display = 'none';

        renderWatchedList();
    }

    watchedListContainer.style.display =
        listIsOpen ? 'none' : 'block';
};


// Toggle Watched Movie
const toggleWatched = () => {
    if (currentMovie === null) {
        return;
    }

    const watchedMovies = getWatchedMovies();

    const movieWasWatched = watchedMovies.some(
        movie => movie.id === currentMovie.id
    );

    if (movieWasWatched) {
        const updatedMovies = watchedMovies.filter(
            movie => movie.id !== currentMovie.id
        );

        saveWatchedMovies(updatedMovies);
        updatedWatchedButton(false);
    }
    else {
        watchedMovies.push(currentMovie);

        saveWatchedMovies(watchedMovies);
        updatedWatchedButton(true);
    }

    renderWatchedList();
};


// Event Listeners
searchInput.addEventListener(
    'input',
    searchMovie
);

searchInput.addEventListener(
    'focusout',
    hideSearchMovieListContainer
);

lightModeBtn.addEventListener(
    'click',
    toggleTheme
);

darkModeBtn.addEventListener(
    'click',
    toggleTheme
);

favoritesBtn.addEventListener(
    'click',
    toggleFavoritesList
);

favoriteBtn.addEventListener(
    'click',
    toggleFavorite
);

watchedBtn.addEventListener(
    'click',
    toggleWatched
);

watchedListBtn.addEventListener(
    'click',
    toggleWatchedList
);