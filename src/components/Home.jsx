import { useEffect, useState } from 'react';

const Home = () => {
  const [videos, setVideos] = useState([]);

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

  const trending_Videos = videos.filter(video => video.isTrending);
  const recommended_Videos = videos.filter(video => !video.isTrending);

  return (
    <>
      <div className="videos">
        <p className='search'><img src="./icon-search.svg" alt="" /><input type="text" placeholder='Search for movies or TV series'/></p>
        <div>
          <h1>Trending</h1>
          <div className="videoListFirst">
            {trending_Videos.map((video, index) => (
              <div key={index} className="videoItem">
                <img src={video.thumbnail.trending.large} alt={video.title} />
                <div className="videoInfo">
                  <p>{video.year} &#8226; 
                    <span className='icon'>{video.category === 'Movie' ? (
                     <img src="./icon-category-movie.svg" alt="" /> 
                     ) : ( 
                     <img src="./icon-category-tv.svg" alt="" /> 
                     )}</span> {video.category} &#8226; {video.rating}</p>
                  <h2>{video.title}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h1>Recommended for you</h1>
          <div className="videoListSecond">
            {recommended_Videos.map((video, index) => (
              <div key={index} className="videoItem">
                <img src={video.thumbnail.regular.large} alt={video.title} />
                <div className="videoInfo">
                  <p>{video.year} &#8226; 
                    <span className='icon'>{video.category === 'Movie' ? (
                     <img src="./icon-category-movie.svg" alt="" /> 
                     ) : ( 
                     <img src="./icon-category-tv.svg" alt="" /> 
                     )}
                     </span> {video.category} &#8226; {video.rating}</p>
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

export default Home;
