import { Routes, Route, Link } from "react-router";
import Bookmarks from "./components/Bookmarks";
import Movie from "./components/Movies";
import TVSeries from "./components/TVSeries";
import Home from "./components/Home"

function App() {
  return (
    <>
      <div className="header">
        <div className="Bar">
          <img src="/logo.svg" alt="Logo" />
          <Link to='/' className="nav-item"><img src="/icon-nav-home.svg" alt="Home" /></Link>
          <Link to='/movies' className="nav-item"><img src="/icon-nav-movies.svg" alt="Movies" /></Link>
          <Link to='/series' className="nav-item"><img src="/icon-nav-tv-series.svg" alt="TV Series" /></Link>
          <Link to='/bookmarks' className="nav-item"><img src="/icon-nav-bookmark.svg" alt="Bookmarks" /></Link>
          <div className="profile-container">
            <img src="/profile-picture.jpg" alt="Profile" className="profile-picture" />
          </div>
        </div>
      
        <div className="films">
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/movies" element={<Movie />} />
            <Route path="/series" element={<TVSeries />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
