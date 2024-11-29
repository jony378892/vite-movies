import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { moviesContext } from "./contextApi";

export default function Wishlist() {
  const navigate = useNavigate();
  const { movies, setMovies } = useContext(moviesContext);
  const [wishListMovies, setWishListMovies] = useState([]);

  useEffect(() => {
    setWishListMovies(movies.filter((movie) => movie.wishlist === true));
  }, [movies]);

  function movieTitle(title) {
    return title.toLowerCase().replaceAll(" ", "-");
  }

  function toggleDelete(movieId) {
    const updatedMovies = movies.map((movie) => (movie.id === movieId ? { ...movie, wishlist: false } : movie));
    setMovies(updatedMovies);
  }

  const movieList = wishListMovies.map((movie) => {
    return (
      <div
        className="flex p-3 w-full items-center justify-between border border-gray-300 rounded-lg bg-gray-50 relative"
        key={movie.id}>
        <div className="flex gap-3 items-center">
          <div className="relative">
            <img
              src={movie.image}
              alt={`Movie name is ${movie.title}`}
              className="border-gray-100 rounded-md h-36 sm:h-32 lg:h-36 w-auto cursor-pointer"
            />
          </div>
          <div
            className="flex flex-col gap-1 self-start text-sm group cursor-pointer"
            onClick={() => navigate(`/details/${movie.id}/${movieTitle(movie.title)}`)}>
            <p className="text-gray-800 group-hover:underline group-hover:text-amber-700 font-medium line-clamp-1">
              {movie.title}
            </p>
            <p className="text-sm text-gray-700">
              Genre: <span className="font-normal text-gray-800">{movie.genre}</span>
            </p>
            <p className="text-gray-600">{movie.duration}</p>
            <p className="text-gray-700 mt-1">{movie.release}</p>
            <p className="text-gray-700 mt-1">
              <i className="fa-solid fa-star text-amber-500"></i> {movie.rating} ({movie.ratingQty})
            </p>
          </div>
        </div>
        <FontAwesomeIcon
          icon={faTrash}
          className="text-red-500 cursor-pointer"
          onClick={() => toggleDelete(movie.id)}
        />
      </div>
    );
  });

  return (
    <div className="container mx-auto relative px-3 sm:px-0 ">
      <p className="text-xl underline text-amber-500 font-semibold py-5">Wishlist Movies</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {movieList.length > 0 ? movieList : <p>There is no movie in your wishlist.</p>}
      </div>
    </div>
  );
}
