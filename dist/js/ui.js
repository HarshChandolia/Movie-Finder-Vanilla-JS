class UI {
    constructor() {
        this.movieMetadata = document.getElementById('movie-metadata');
        this.loadingDiv = document.getElementById('loading');
    }

showResults(movie) {
    // Retrieve values from Ratings array
    let ratingsOutput = [];
    movie.Ratings.forEach(function(rating) {
        ratingsOutput += `${rating.Source} - ${rating.Value}
`;
        });
    this.movieMetadata.style.display = 'block';
    this.movieMetadata.innerHTML = `
        <div class="result-container">
            <div class="result-items">
                <div class="item">
                    <h4>TITLE</h4> 
                    <input type="text" value="${movie.Title}" disabled>
                </div>
                <div class="item">
                    <h4>ACTORS</h4> 
                    <input type="text" value="${movie.Actors}" disabled>
                </div>
                <div class="item">
                    <h4>GENRE</h4> 
                    <input type="text" value="${movie.Genre}" disabled>
                </div>
                <div class="item">
                    <h4>PLOT</h4> 
                    <textarea disabled>${movie.Plot}</textarea>
                </div>
                <div class="item">
                    <h4>RATINGS</h4> 
                    <textarea rows="3" disabled>${ratingsOutput}</textarea>
                </div>
            </div>
        </div>
    `;
    }

    showAlert(msg, className) {
        // Clear alert if present
        this.clearAlert();
        // Create alert div
        const alertDiv = document.createElement('div');

        // Add class
        alertDiv.className = className;

        // Add text
        alertDiv.appendChild(document.createTextNode(msg));

        // Get parent
        const container = document.querySelector('.container');

        // Get element before which alert should be inserted
        const movieInput = document.querySelector('.movie-name');

        // Insert alert
        container.insertBefore(alertDiv, movieInput);

        // Clear alert after 3 seconds
        setTimeout(() => {
            this.clearAlert();
        }, 3000);
    }

    loadingImage() {
        this.loadingDiv.style.display = 'block';
        this.loadingDiv.innerHTML = `
            <div class="loader">
                <img src="js/images/loading.gif" class="loader" alt="Loading results">
            </div>
            `;

        // Clear loader after 2 seconds
        setTimeout(() => {
            this.clearLoader();
        }, 2000);
    }

    clearAlert() {
        const currentAlert = document.querySelector('.alert');

        if (currentAlert) {
            currentAlert.remove();
        }
    }

    clearInputs() {
        document.getElementById('name').value = '';
    }

    clearLoader() {
        this.loadingDiv.style.display = 'none';
    }
}