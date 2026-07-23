import { useContext } from "react";
import { AppContext } from "../store/AppContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { sortedMovies } = useContext(AppContext);
  const navigate = useNavigate();

  const heroSection = sortedMovies.find(
    (category) => category.name === "Hero Section",
  );

  const movieSections = sortedMovies.filter(
    (category) => category.name !== "Hero Section",
  );

  return (
    // main div
    <div className="container-fluid px-0">
      {/* hero div */}
      {heroSection && heroSection.movies.length > 0 && (
        <div
          id="carouselExampleControls"
          class="carousel slide"
          data-ride="carousel"
        >
          <div className="carousel-inner">
            {heroSection.movies.map((movie, index) => (
              <div
                className={`carousel-item ${index === 0 ? "active" : ""}`}
                key={movie.id}
                style={{ height: "300px" }}
              >
                <img
                  className="d-block w-100 h-100"
                  src={movie.heroImage}
                  alt={movie.name}
                  style={{
                    objectFit: "fill",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    navigate(`/booking/${movie.id}`);
                    // console.log(movie);
                  }}
                ></img>
              </div>
            ))}
          </div>
          <a
            className="carousel-control-prev"
            href="#carouselExampleControls"
            role="button"
            data-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            class="carousel-control-next"
            href="#carouselExampleControls"
            role="button"
            data-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      )}

      {/* Movie Sections */}

      <div>
        {movieSections.map((category) => {
          return (
            <div key={category.id}>
              <h2 className="fw-bold mb-3">{category.name}</h2>

              {/* cards */}

              <div className="container">
                {category.movies.map((movie) => {
                  return (
                    <div
                      key={movie.id}
                      className="card shadow-sm flex-shrink-0"
                      style={{ width: "220px", cursor: "pointer" }}
                      onClick={() => {
                        navigate(`/booking/${movie.id}`);
                        console.log(movie);
                      }}
                    >
                      <img
                        src={movie.poster}
                        alt={movie.name}
                        className="card-img-top"
                        style={{ height: "320px", objectFit: "cover" }}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{movie.name}</h5>
                        <p className="mb-1">⭐ {movie.imdbRating}</p>
                        <small className="text-muted">{movie.genre}</small>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Home;
