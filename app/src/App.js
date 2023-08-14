import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/HomePage";
import Profile from "./pages/ProfilePage";
import Watchlist from "./pages/WatchlistPage";
import AboutUs from "./pages/AboutPage";
import SearchMovies from "./components/SearchMovies";
import MovieDetail from "./components/MovieDetail";
import VideoPlayer from "./components/VideoPlayer";
import Register from "./pages/RegisterPage";
import Login from "./pages/LoginPage";
import CategoryPage from "./pages/CategoryPage";
import PaymentPage from "./pages/PaymentPage";
import NotFound from "./pages/NotFoundPage";
import PrivateRoute from "./components/PrivateRoute.jsx";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="" element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/search/:query" element={<SearchMovies />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/Payment" element={<PaymentPage />} />
          <Route path="/videos" element={<VideoPlayer />} />
        </Route>
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
