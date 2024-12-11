import { Routes, Route, Link, useLocation } from "react-router";
import Bookmarks from "./components/Bookmarks";
import Movie from "./components/Movies";
import TVSeries from "./components/TVSeries";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { useState } from "react";

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login" || location.pathname === "/signup";
  const [selectedIcon, setSelectedIcon] = useState(location.pathname);

  const handleIconClick = (path) => {
    setSelectedIcon(path);
  };

  return (
    <>
      <div className={!isLoginPage ? "header" : ""}>
        {!isLoginPage && (
          <div className="Bar">
            <div className="logo">
              <img src="/logo.svg" alt="Logo" />
            </div>
            <div className="grupe">
              <Link
                to="/"
                className={`nav-item ${selectedIcon === "/" ? "selected" : ""}`}
                onClick={() => handleIconClick("/")}
              >
                <img src="/icon-nav-home.svg" alt="Home" />
              </Link>
              <Link
                to="/movies"
                className={`nav-item ${selectedIcon === "/movies" ? "selected" : ""}`}
                onClick={() => handleIconClick("/movies")}
              >
                <img src="/icon-nav-movies.svg" alt="Movies" />
              </Link>
              <Link
                to="/series"
                className={`nav-item ${selectedIcon === "/series" ? "selected" : ""}`}
                onClick={() => handleIconClick("/series")}
              >
                <img src="/icon-nav-tv-series.svg" alt="TV Series" />
              </Link>
              <Link
                to="/bookmarks"
                className={`nav-item ${selectedIcon === "/bookmarks" ? "selected" : ""}`}
                onClick={() => handleIconClick("/bookmarks")}
              >
                <img src="/icon-nav-bookmark.svg" alt="Bookmarks" />
              </Link>
            </div>
            <div className="profile-container">
              <Link to="/login">
                <img src="/image-avatar.png" alt="Profile" className="profile-picture" />
              </Link>
            </div>
          </div>
        )}

        <div className={!isLoginPage ? "films" : ""}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movie />} />
            <Route path="/series" element={<TVSeries />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
