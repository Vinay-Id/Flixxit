import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

const NavLink = ({ to, children }) => {
  const { pathname } = useLocation();
  const isActive = pathname === to;

  return (
    <Link to={to} className={isActive ? "active" : ""}>
      {children}
    </Link>
  );
};

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [navbarBackground, setNavbarBackground] = useState("transparent");
  const [menuActive, setMenuActive] = useState(false);
  useEffect(() => {
    let previousScrollY = window.scrollY;

    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (scrollY > 0 && previousScrollY === 0) {
        setNavbarBackground("black");
      } else if (scrollY === 0 && previousScrollY > 0) {
        setNavbarBackground("transparent");
      }

      previousScrollY = scrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/search/${searchQuery}`);
      setSearchQuery("");
    }
  };

  const { userInfo } = useSelector((state) => state.auth);

  return (
    <nav style={{ backgroundColor: navbarBackground }}>
      <div className="logo">
        <Link to="/">Flixxit</Link>
      </div>
      {userInfo ? (
        <div className={`links ${menuActive ? "active" : ""}`}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/category">Category</NavLink>
          <NavLink to="/watchlist">Watchlist</NavLink>
          <NavLink to="/profile">Profile</NavLink>
          <NavLink to="/aboutus">About Us</NavLink>
        </div>
      ) : null}
      {userInfo ? (
        <div className="search-bar">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search movies"
            />
            <button type="submit">Search</button>
          </form>
        </div>
      ) : null}
     
      <div className={`hamburger ${menuActive ? "active" : ""}`} onClick={() => setMenuActive(!menuActive)}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </nav>
  );
};

export default Navbar;
