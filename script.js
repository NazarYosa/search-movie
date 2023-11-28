$('.search-button').on('click', function () {
    $.ajax({
      url: "http://www.omdbapi.com/?apikey=2edb351&s=" + $('.input-keyword').val(),
      success: (results) => {
        const movies = results.Search;
        let cards = "";
        movies.forEach((movie) => {
          cards += showCards(movie);
        });
        $(".movie-container").html(cards);

        // ketika tombol detail diklik
        $(".modal-detail-button").on("click", function () {
          $.ajax({
            url:
              "http://www.omdbapi.com/?apikey=2edb351&i=" +
              $(this).data("imdbid"),
            success: (m) => {
              const movieDetail = showMovieDetail(m);

              $(".modal-body").html(movieDetail);
            },
            error: (e) => {
              console.log(e.responseText);
            },
          });
        });
      },
      error: (e) => {
        console.log(e.responseText);
      },
    });
});

function showCards(movie) {
  return `<div class="col-md-4 my-3">
                <div class="card">
                    <img src="${movie.Poster}" class="card-img-top" >
                    <div class="card-body">
                        <h5 class="card-title">${movie.Title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${movie.Year}</h6>
                        <a href="#" class="btn btn-primary modal-detail-button" data-toggle="modal" data-target="#movieDetailModal" data-imdbid="${movie.imdbID}">Show Details</a>
                    </div>
                </div>
            </div>`;
}

function showMovieDetail(m) {
  return `<div class="container-fluid">
                        <div class="row">
                            <div class="col-md-3">
                                <img src="${m.Poster}" class="img-fluid">
                            </div>
                            <div class="col-md">
                                <ul class="list-group">
                                    <li class="list-group-item"><h4>${m.Title} (${m.Year})</h4></li>
                                    <li class="list-group-item">Director : ${m.Director}</li>
                                    <li class="list-group-item">Actors : ${m.Actors}</li>
                                    <li class="list-group-item">Writer : ${m.Writer}</li>
                                    <li class="list-group-item">Plot : ${m.Plot}</li>
                                </ul>
                            </div>
                        </div>
                     </div>`;
}
