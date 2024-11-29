import { useParams } from "react-router-dom";
import { movies } from "./data";

export default function Details() {
  const { id } = useParams();

  const movie = movies.find((m) => m.id === parseInt(id));

  return (
    <div className="h-max w-screen  bg-[#051925] md:h-screen ">
      <div className="flex flex-col sm:flex-row gap-3 p-3 mx-auto container text-white ">
        <img src={movie.image} alt={movie.title} className="h-[450px]  w-[320px] lg:h-[500px]  mb-5" />

        <section className="lg:border border-gray-300 rounded-2xl p-3 lg:h-[500px]">
          <div className="flex flex-col gap-2 mb-3">
            <p className="text-xl bxs:text-3xl hyphens-auto">{movie.title} </p>
            <p className="rounded-md text-sm text-nowrap pr-auto">
              {" "}
              Genre: <span className="font-medium">{movie.genre}</span>
            </p>
            <div className="flex gap-3 text-sm items-center ">
              <p>{movie.release} - </p>
              <p>{movie.duration} </p>
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <button className=" flex gap-2  py-0.5 px-3 bg-amber-500 hover:bg-amber-500/90 rounded-md cursor-pointer group text-white text-sm font-medium">
              Add to wishlist
            </button>
          </div>
          <p className="text-base mt-5 ">{movie.description} </p>
          <hr className="border-white/50 mt-5" />
          <div className="flex flex-col divide-y divide-gray-300 text sm sm:text-base">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 py-3">
              <p className="font-medium">Director:</p>
              <p>{movie.director}</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3  py-3">
              <p className="font-medium">Actor:</p>
              <div className="flex flex-col items-start">
                <p className="lg:text-balance">{movie.actors} </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
