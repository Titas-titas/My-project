import { useEffect, useState } from 'react';

const Bookmarks = () => {
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

  const bookmarked_Videos = videos.filter(video => video.isBookmarked);

  return (
    <>
      <div className="videos">
        <p className='search'><img src="./icon-search.svg" alt="" /><input type="text" placeholder='Search for bookmarked shows'/></p>
        <div>
          <h1>Bookmarked Movies</h1>
          <div className="videoListSecond">
            {bookmarked_Videos.filter(video => video.category === 'Movie').map((video, index) => (
              <div key={index} className="videoItem">
                <img src={video.thumbnail.regular.large} alt={video.title} />
                <div className="videoInfo">
                  <p>{video.year} &#8226; {video.category} &#8226; {video.rating}</p>
                  <h2>{video.title}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h1>Bookmarked TV Series</h1>
          <div className="videoListSecond">
            {bookmarked_Videos.filter(video => video.category === 'TV Series').map((video, index) => (
              <div key={index} className="videoItem">
                <img src={video.thumbnail.regular.large} alt={video.title} />
                <div className="videoInfo">
                  <p>{video.year} &#8226; {video.category} &#8226; {video.rating}</p>
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
