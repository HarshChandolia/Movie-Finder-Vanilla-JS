class Movie {
    constructor() {

    }

    // GET request
    async getMovie(filledInput, nameInd) {
        let url;
        if (nameInd) {
            url = `http://www.omdbapi.com/?apikey=8b78a3a9&t=${filledInput}`;
        } else {
            url = `http://www.omdbapi.com/?apikey=8b78a3a9&i=${filledInput}`;
        }
        // Get movie data
        const movieResponse = await fetch(url);
        const movieData = await movieResponse.json();

        return {
            movieData
        }
    }
}