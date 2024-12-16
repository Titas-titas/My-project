import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';

const TVSeries = () => {
    const [tvSeries, setTVSeries] = useState(() => {
        const savedVideos = localStorage.getItem('videos');
        return savedVideos ? JSON.parse(savedVideos).filter(video => video.category === 'TV Series') : [];
    });
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('data/data.json');
                const data = await response.json();
                const seriesData = data.filter(video => video.category === 'TV Series');
                const savedVideos = localStorage.getItem('videos');
                const combinedData = savedVideos ? mergeVideoData(JSON.parse(savedVideos), seriesData).filter(video => video.category === 'TV Series') : seriesData;
                setTVSeries(combinedData);
                localStorage.setItem('videos', JSON.stringify(combinedData));
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

    const mergeVideoData = (savedVideos, newVideos) => {
        const videoMap = new Map(savedVideos.map(video => [video.title, video]));
        newVideos.forEach(video => {
            if (!videoMap.has(video.title)) {
                videoMap.set(video.title, video);
            } else {
                const savedVideo = videoMap.get(video.title);
                videoMap.set(video.title, { ...video, isBookmarked: savedVideo.isBookmarked });
            }
        });
        return Array.from(videoMap.values());
    };
    
    const handleBookmark = (series) => {
        const updatedSeries = { ...series, isBookmarked: !series.isBookmarked };
        const updatedTVSeries = tvSeries.map((item) =>
            item.title === series.title ? updatedSeries : item
        );

        setTVSeries(updatedTVSeries);
        const allVideos = JSON.parse(localStorage.getItem('videos')) || [];
        const updatedVideos = allVideos.map((item) =>
            item.title === series.title ? updatedSeries : item
        );
        localStorage.setItem('videos', JSON.stringify(updatedVideos));
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
                            <Link to='/' className='hoverStyle'>
                                <img src={series.thumbnail?.regular?.large} alt={series.title} />
                            </Link>
                            <div className="seriesInfo">
                                <p>{series.year} &#8226;
                                    <span className='icon'>
                                        <img src="./icon-category-tv.svg" alt="TV Series Category Icon" />
                                    </span> {series.category} &#8226; {series.rating}
                                </p>
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
