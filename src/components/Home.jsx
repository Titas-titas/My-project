import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('data/data.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
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

  const handleBookmark = (video) => {
    setVideos((prev) =>
      prev.map((item) =>
        item.title === video.title ? { ...item, isBookmarked: !item.isBookmarked } : item
      )
    );
  };

  const trending_Videos = videos.filter(video => video.isTrending);
  const recommended_Videos = videos.filter(video => !video.isTrending);

  const filteredTrendingVideos = trending_Videos.filter(video =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredRecommendedVideos = recommended_Videos.filter(video =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="videos">
        <p className='search'>
          <img src="./icon-search.svg" alt="Search" />
          <input 
            type="text" 
            placeholder='Search for movies or TV series' 
            value={searchQuery}
            onChange={handleSearch}
          />
        </p>
        <div>
          <h1>Trending</h1>
          <div className="videoListFirst">
            {filteredTrendingVideos.map((video, index) => (
              <div key={index} className="videoItem">
                  <div className="imageContainer">
                    <Link to='/'>
                      <img src={video.thumbnail?.trending?.large} alt={video.title} className='blure'/>
                      <div className="overlay">
                        <p>{video.year} &#8226; 
                          <span className='icon'>{video.category === 'Movie' ? (
                          <img src="./icon-category-movie.svg" alt="Movie" /> 
                          ) : ( 
                          <img src="./icon-category-tv.svg" alt="TV Series" /> 
                          )}</span> {video.category} &#8226; {video.rating}</p>
                        <h2>{video.title}</h2>
                        <button className='bookmark' onClick={() => handleBookmark(video)}>
                          <span className='bookmarkStyle'>
                            <img src={video.isBookmarked ? "./icon-bookmark-full.svg" : "./icon-bookmark-empty.svg"} alt="Bookmark" />
                          </span>
                        </button>
                        <span className="playButton">
                          <span><img src="./icon-play.svg" alt="Play" /> Play</span>
                        </span>
                      </div>
                    </Link>
                  </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h1>Recommended for you</h1>
          <div className="videoListSecond">
            {filteredRecommendedVideos.map((video, index) => (
              <div key={index} className="videoItem">
                <Link to='/'>
                  <img src={video.thumbnail?.regular?.large} alt={video.title} className='blure'/>
                </Link>
                <div className="videoInfo">
                  <p>{video.year} &#8226; 
                    <span className='icon'>{video.category === 'Movie' ? (
                     <img src="./icon-category-movie.svg" alt="Movie" /> 
                     ) : ( 
                     <img src="./icon-category-tv.svg" alt="TV Series" /> 
                     )}
                     </span> {video.category} &#8226; {video.rating}</p>
                  <h2>{video.title}</h2>
                  <button className='bookmark' onClick={() => handleBookmark(video)}>
                    <span className='bookmarkStyle'><img src={video.isBookmarked ? "./icon-bookmark-full.svg" : "./icon-bookmark-empty.svg"} alt="Bookmark" /></span>
                  </button>
                  <Link to='/' className="playButton2">
                    <span><img src="./icon-play.svg" alt="Play" /> Play</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
