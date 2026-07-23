import { useContext } from "react";
import { AppContext } from "../store/AppContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { sortedMovies } = useContext(AppContext);
  const navigate = useNavigate();

  const heroSection = sortedMovies.find(
    (category) => category.name === "Hero Section",
  );

  console.log(heroSection);

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
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              {heroSection.movies.map((movie, index) => (
                <div
                  className={`bg-dark carousel-item ${index === 0 ? "active" : ""}`}
                  key={movie.id}
                  style={{ height: "500px" }}
                >
                  <img
                    className="d-block w-100 h-100"
                    src={movie.heroImage}
                    alt={movie.name}
                    style={{
                      objectFit: "contain",
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
            <button
              type="button"
              className="carousel-control-prev"
              data-bs-target="#carouselExampleControls"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              type="button"
              className="carousel-control-next"
              data-bs-target="#carouselExampleControls"
              data-bs-slide="next"
            >
              <span className="visually-hidden">Next</span>

              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
            </button>
          </div>
      )}

      {/* Movie Sections */}

      <div>
        {movieSections.map((category) => {
          return (
            <div key={category.id}>
              <h2 className="fw-bold mb-3 p-3 text-decoration-underline">{category.name}</h2>
              

              {/* cards */}

              <div className="container d-flex flex-row flex-nowrap overflow-auto mb-5 gap-3 bg-light p-3 rounded-3">
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
