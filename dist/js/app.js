// Initialize Movie
// const movie = new Movie;

// Initialize UI
const ui = new UI;

// Event Listeners
document.getElementById('form-submit').addEventListener('click', getMovieMetadata);

// Get movie metadata from local db and display in UI
function getMovieMetadata(e) {
    // Set input vars
    const nameInput = document.getElementById('name').value;
    const imdbIdInput = document.getElementById('imdb-id').value;

    // Validate input values
    if (nameInput !== '' || imdbIdInput !== '') {
        ui.clearInputs();
        
        // Get populated field
        const filledInput = nameInput ? nameInput : imdbIdInput

        // Determine and set variable for which input was filled
        let nameInd;
        if (nameInput !== '') {
            nameInd = true;
        } else {
            nameInd = false;
        }

        // Get movie metadata from db
        const fetchMovieData = async () =>
        await (await fetch(`/.netlify/functions/getMovie?filledInput=${filledInput}&nameInd=${nameInd}`)).json();

        fetchMovieData().then(data => {
                if (data.Response === 'False') {
                    ui.movieMetadata.style.display = 'none';
                    ui.loadingImage();
                    setTimeout(() => {
                        ui.showAlert('Movie not found! Please try again.', 'alert alert-danger');
                    }, 2000);
                } else {
                    ui.movieMetadata.style.display = 'none';
                    ui.loadingImage();
                    setTimeout(() => {
                        ui.showAlert('Movie found! See results below.', 'alert alert-success');
                        ui.showResults(data);
                    }, 2000);
                }
            })
    } else {
        ui.clearInputs();
        ui.showAlert('Fields cannot be blank', 'alert alert-danger');
    }

    e.preventDefault();
}