import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';

const TVSeries = () => {
  const [tvSeries, setTVSeries] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('data/data.json');
        const data = await response.json();
        const seriesData = data.filter(video => video.category === 'TV Series');
        setTVSeries(seriesData);
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


  const handleBookmark = (series) => {
    setTVSeries((prev) =>
      prev.map((item) =>
        item.title === series.title ? { ...item, isBookmarked: !item.isBookmarked } : item
      )
    );
  };

  const filteredSeries = tvSeries.filter(series =>
    series.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="tv-series">
        <p className='search'>
          <img src="./icon-search.svg" alt="Search Icon" />
          <input 
            type="text" 
            placeholder='Search for TV series' 
            value={searchQuery}
            onChange={handleSearch}
          />
        </p>
        <h1>TV Series</h1>
        <div className="seriesList">
          {filteredSeries.map((series, index) => (
            <div key={index} className="seriesItem">
              <Link to='/'>
                <img src={series.thumbnail?.regular?.large} alt={series.title} />
              </Link>
              <div className="seriesInfo">
                <p>{series.year} &#8226; 
                  <span className='icon'>
                    <img src="./icon-category-tv.svg" alt="TV Series Category Icon" />
                  </span> {series.category} &#8226; {series.rating}</p>
                <h2>{series.title}</h2>
                <button className='bookmark' onClick={() => handleBookmark(series)}>
                  <span className='bookmarkStyle'><img src={series.isBookmarked ? "./icon-bookmark-full.svg" : "./icon-bookmark-empty.svg"} alt="Bookmark Icon" /></span>
                </button>
                <Link to='/' className="playButton2">
                    <span><img src="./icon-play.svg" alt="Play" /> Play</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TVSeries;
