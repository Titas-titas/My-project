import { useEffect, useState } from 'react';

const TVSeries = () => {
  const [tvSeries, setTVSeries] = useState([]);

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

  return (
    <>
      <div className="tv-series">
        <p className='search'><img src="./icon-search.svg" alt="" /><input type="text" placeholder='Search for TV series'/></p>
        <h1>TV Series</h1>
        <div className="seriesList">
          {tvSeries.map((series, index) => (
            <div key={index} className="seriesItem">
              <img src={series.thumbnail.regular.large} alt={series.title} />
              <div className="seriesInfo">
                <p>{series.year} &#8226; <span className='icon'><img src="./icon-category-tv.svg" alt="" /></span> {series.category} &#8226; {series.rating}</p>
                <h2>{series.title}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TVSeries;
