import React, { useContext, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../store/AppContext";

const BookingPage = () => {
  const { movieId } = useParams();

  const { movies, showTimes, bookTicket } = useContext(AppContext);


  const movie = movies.find((m) => m.id === movieId);

  const movieShows = showTimes.filter(
    (show) => show.movieId === movieId
  );

  const availableDates = [
    ...new Set(movieShows.map((show) => show.date)),
  ];

  const [selectedDate, setSelectedDate] = useState("");

  const [selectedTime, setSelectedTime] = useState("");

  const [tickets, setTickets] = useState(1);

  const availableTimes = useMemo(() => {
    return movieShows.filter(
      (show) => show.date === selectedDate
    );
  }, [movieShows, selectedDate]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (
      !selectedDate ||
      !selectedTime 
    ) {
      alert("Please fill all details.");
      return;
    }

    const selectedShow = movieShows.find(
      (show) =>
        show.date === selectedDate &&
        show.time === selectedTime
    );

    const booking = {
      movieId,
      showTimeId: selectedShow.id,
      numberOfTickets: tickets,
    };

    console.log(booking);

    await bookTicket(booking);
    
    alert("Booking Successful");
    selectedDate("");
    selectedTime("");
    setTickets(1);
  };

  if (!movie) {
    return (
      <div className="container py-5">
        <h3>Movie not found.</h3>
      </div>
    );
  }

  return (
    <div className="container py-5">

      <div className="row">

        <div className="col-md-5">

          <img
            src={movie.heroImage}
            alt={movie.name}
            className="img-fluid rounded shadow"
          />

        </div>

        <div className="col-md-7">

          <h1>{movie.name}</h1>

          <p className="text-muted">
            ⭐ {movie.imdbRating}
          </p>

          <p>
            <strong>Genre:</strong> {movie.genre}
          </p>

          <p>
            <strong>Director:</strong> {movie.director}
          </p>

          <p>
            <strong>Language:</strong> {movie.language}
          </p>

          <p>
            <strong>Release Date:</strong>{" "}
            {movie.releaseDate}
          </p>

          <p>{movie.description}</p>

          <a
            href={movie.trailer}
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline-danger mb-4"
          >
            Watch Trailer
          </a>

          <hr />

          <form onSubmit={submitHandler}>

            <div className="mb-3">

              <label className="form-label">
                Select Date
              </label>

              <select
                className="form-select"
                value={selectedDate}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  setSelectedTime("");
                }}
              >
                <option value="">
                  Select Date
                </option>

                {availableDates.map((date) => (
                  <option key={date} value={date}>
                    {date}
                  </option>
                ))}

              </select>

            </div>

            <div className="mb-3">

              <label className="form-label">
                Select Time
              </label>

              <select
                className="form-select"
                value={selectedTime}
                onChange={(e) =>
                  setSelectedTime(e.target.value)
                }
              >
                <option value="">
                  Select Time
                </option>

                {availableTimes.map((show) => (
                  <option
                    key={show.id}
                    value={show.time}
                  >
                    {show.time}
                  </option>
                ))}

              </select>

            </div>

            <div className="row">

          

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Tickets
                </label>

                <div className="d-flex">

                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() =>
                      tickets > 1 &&
                      setTickets(tickets - 1)
                    }
                  >
                    -
                  </button>

                  <input
                    className="form-control text-center"
                    value={tickets}
                    readOnly
                  />

                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() =>
                      setTickets(tickets + 1)
                    }
                  >
                    +
                  </button>

                </div>

              </div>

            </div>

            <button className="btn btn-danger">
              Book Ticket
            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default BookingPage;