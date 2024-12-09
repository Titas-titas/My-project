import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

const Bookmarks = () => {
  const [videos, setVideos] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('data/data.json');
        const data = await response.json();
        setVideos(data);
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

  const bookmarked_Videos = videos.filter(video => video.isBookmarked);

  const filteredBookmarkedMovies = bookmarked_Videos.filter(video =>
    video.category === 'Movie' && video.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredBookmarkedSeries = bookmarked_Videos.filter(video =>
    video.category === 'TV Series' && video.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="videos">
        <p className='search'>
          <img src="./icon-search.svg" alt="Search" />
          <input 
            type="text" 
            placeholder='Search for bookmarked shows' 
            value={searchQuery}
            onChange={handleSearch}
          />
        </p>
        <div>
          <h1>Bookmarked Movies</h1>
          <div className="videoListSecond">
            {filteredBookmarkedMovies.map((video, index) => (
              <div key={index} className="videoItem">
                <img src={video.thumbnail.regular.large} alt={video.title} />
                <div className="videoInfo">
                  <p>{video.year} &#8226; <span className='icon'><img src="./icon-category-movie.svg" alt="Movie" /></span> {video.category} &#8226; {video.rating}</p>
                  <h2>{video.title}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h1>Bookmarked TV Series</h1>
          <div className="videoListSecond">
            {filteredBookmarkedSeries.map((video, index) => (
              <div key={index} className="videoItem">
                <img src={video.thumbnail.regular.large} alt={video.title} />
                <div className="videoInfo">
                  <p>{video.year} &#8226; <span className='icon'><img src="./icon-category-tv.svg" alt="TV Series" /></span> {video.category} &#8226; {video.rating}</p>
                  <h2>{video.title}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Bookmarks;
