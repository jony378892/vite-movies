import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faHeart, faXmark, faStar } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginStatusContext, searchContext, moviesContext } from "./contextApi";

export default function Home() {
  const [index, setIndex] = useState(null);
  const [background, setBackground] = useState(false);
  const { search } = useContext(searchContext);
  const navigate = useNavigate();
  const { movies, setMovies } = useContext(moviesContext);
  const { loginStatus } = useContext(loginStatusContext);
  const [notification, setNotification] = useState(false);

  function handleImageClick(movieIndex) {
    setIndex(movieIndex);
    setBackground(true);
  }

  function closeOverlay() {
    setBackground(false);
    setIndex(null);
  }

  function toggleWishlist(movieId) {
    if (!loginStatus) {
      setNotification(true);
      setTimeout(() => {
        setNotification(false);
      }, 1200);
    } else {
      setMovies((prevMovies) =>
        prevMovies.map((movie) => (movie.id === movieId ? { ...movie, wishlist: !movie.wishlist } : movie))
      );
    }
  }

  function movieTitle(title) {
    return title.toLowerCase().replaceAll(" ", "-");
  }

  const filteredMovies = movies.filter((movie) => movie.title.toLowerCase().includes(search.toLowerCase()));

  const movieList = filteredMovies.map((movie, i) => (
    <div
      className="flex p-3 w-full items-center justify-between border border-gray-300 rounded-lg bg-gray-50 relative"
      key={movie.id}>
      <div className="flex gap-3 items-center">
        <div className="relative">
          <img
            src={movie.image}
            alt={`Movie name is ${movie.title}`}
            className="border-gray-100 rounded-md h-36 sm:h-32 lg:h-36 w-auto cursor-pointer"
            onClick={() => handleImageClick(i)}
          />
          <FontAwesomeIcon
            icon={faHeart}
            className={`absolute top-2 right-2 cursor-pointer ${movie.wishlist ? "text-red-600" : "text-red-300"}`}
            role="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(movie.id);
            }}
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
            <FontAwesomeIcon icon={faStar} className="text-amber-500" /> {movie.rating} ({movie.ratingQty})
          </p>
        </div>
      </div>
      <FontAwesomeIcon
        icon={faCircleInfo}
        className="text-lg text-blue-300 hover:text-blue-500"
        onClick={() => handleImageClick(i)}
      />
    </div>
  ));

  return (
    <div className="container mx-auto relative px-3 sm:px-0">
      <p className="text-xl underline text-amber-500 font-semibold py-5">Movies List</p>
      {notification && (
        <p className="absolute top-5 flex justify-center inset-x-0">
          <span className="bg-red-500/90 rounded-full text-white px-7 py-0.5 text-sm font-medium ">
            You have to login First
          </span>
        </p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {movieList.length > 0 ? movieList : <p>No movies found</p>}
      </div>
      {background && index !== null && movies[index] && <Overlay movie={movies[index]} closeOverlay={closeOverlay} />}
    </div>
  );
}

function Overlay({ movie, closeOverlay }) {
  return (
    <div
      className="flex fixed inset-0 bg-black/20 backdrop-blur-sm justify-center items-center z-50"
      onClick={closeOverlay}>
      <div className="bg-white rounded-lg shadow-lg relative" onClick={(e) => e.stopPropagation()}>
        <img src={movie.image} alt={movie.title} className="h-[450px] sm:h-[600px] md:h-[600px] w-auto rounded-md" />
        <FontAwesomeIcon
          icon={faXmark}
          className="absolute top-2 right-2 text-2xl font-bold text-amber-500 hover:text-red-500"
          onClick={closeOverlay}
        />
      </div>
    </div>
  );
}
