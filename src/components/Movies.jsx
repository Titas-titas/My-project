import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('data/data.json');
        const data = await response.json();
        const movieData = data.filter(video => video.category === 'Movie');
        setMovies(movieData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const searchQuery = searchParams.get('search') || "";

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchParams(value ? { search: value } : {});
  };

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="movies">
        <p className='search'>
          <img src="./icon-search.svg" alt="Search" />
          <input 
            type="text" 
            placeholder='Search for movies' 
            value={searchQuery}
            onChange={handleSearch}
          />
        </p>
        <h1>Movies</h1>
        <div className="movieList">
          {filteredMovies.map((movie, index) => (
            <div key={index} className="movieItem">
              <img src={movie.thumbnail.regular.large} alt={movie.title} />
              <div className="movieInfo">
                <p>{movie.year} &#8226; <span className='icon'><img src="./icon-category-movie.svg" alt="" /></span> {movie.category} &#8226; {movie.rating}</p>
                <h2>{movie.title}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Movies;
