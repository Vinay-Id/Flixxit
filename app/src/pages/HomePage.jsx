import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Carousel from "../components/Carousel";
import RenderMovies from "../components/RenderMovies";
import CategoryPage from "./CategoryPage";
import { Outlet } from "react-router-dom";
const Home = ({ user }) => {
  const apiKey = process.env.REACT_APP_API_KEY;
  const ApiLinks = [
    {
      id: 1,
      title: "Trending Today",
      Apiurl: `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`,
    },
    {
      id: 2,
      title: "Top Rated Shows",
      Apiurl: `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`,
    },
    {
      id: 3,
      title: "Discover Movies",
      Apiurl: `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`,
    },
  ];

  return (
    <div>
      <ToastContainer />
      <Carousel />
      {ApiLinks.map((movie) => (
        <RenderMovies
          key={movie.id}
          title={movie.title}
          apiurl={movie.Apiurl}
        />
      ))}
      <CategoryPage />
      <Outlet />
    </div>
  );
};

export default Home;
