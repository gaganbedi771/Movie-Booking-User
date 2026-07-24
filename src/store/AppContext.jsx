import * as appApi from "../services/appApi";
import { AuthContext } from "../store/AuthContext";
import { useContext, createContext, useState, useEffect } from "react";

export const AppContext = createContext({
  movies: [],
  categories: [],
  showTimes: [],
  bookTicket: () => {},
  sortedMovies: [],
});

const AppContextProvider = (props) => {
  const { token, userEmail } = useContext(AuthContext);
  const [movies, setMovies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showTimes, setShowTimes] = useState([]);
  const [sortedMovies, setSortedMovies] = useState([]);

  useEffect(() => {
    fetchAllData();
  }, []);

  useEffect(() => {
    if (!movies.length || !categories.length || !showTimes.length) {
      return;
    }

    const sorted = categories.map((category) => {
      const movieIds = [
        ...new Set(
          showTimes
            .filter((showTime) => showTime.categoryIds.includes(category.id))
            .map((showTime) => showTime.movieId),
        ),
      ];

      return {
        ...category,
        movies: movies.filter((movie) => movieIds.includes(movie.id)),
      };
    });

    setSortedMovies(sorted);
  }, [movies, categories, showTimes]);

  async function fetchAllData() {
    try {
      const data = await appApi.getAllData(token);
      setMovies(data.movies);
      setCategories(data.categories);
      setShowTimes(data.showTimes);
      return;
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }

  async function bookTicket(bookingData,emailData) {
    try {
      const response = await appApi.bookTicket({ ...bookingData, userEmail }, token);
      
      await appApi.sendConfirmationEmail(userEmail,emailData,response.name);
      return;
    } catch (error) {
      console.error("Error booking ticket:", error);
    }
  } 

  const contextValue = {
    movies,
    categories,
    showTimes,
    sortedMovies,
    bookTicket,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
