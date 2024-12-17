import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';

const Bookmarks = () => {
    const [videos, setVideos] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const savedVideos = localStorage.getItem('videos');
        if (savedVideos) {
            setVideos(JSON.parse(savedVideos));
        }
    }, []);

    const searchQuery = searchParams.get('search') || "";

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchParams(value ? { search: value } : {});
    };

    const handleBookmark = (video) => {
        const updatedVideo = { ...video, isBookmarked: !video.isBookmarked };
        const updatedVideos = videos.map((item) =>
            item.title === video.title ? updatedVideo : item
        );

        setVideos(updatedVideos);
        localStorage.setItem('videos', JSON.stringify(updatedVideos));
    };

    const bookmarkedVideos = videos.filter(video => video.isBookmarked);

    const filteredBookmarkedMovies = bookmarkedVideos.filter(video =>
        video.category === 'Movie' && video.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredBookmarkedSeries = bookmarkedVideos.filter(video =>
        video.category === 'TV Series' && video.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const searchResultsCount = filteredBookmarkedMovies.length + filteredBookmarkedSeries.length;

    return (
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
            {searchQuery && (
                <p className='text'>Found {searchResultsCount} results for ‘{searchQuery}’</p>
            )}
            <div>
                <h1>Bookmarked Movies</h1>
                <div className="videoListSecond">
                    {filteredBookmarkedMovies.length > 0 ? (
                        filteredBookmarkedMovies.map((video, index) => (
                            <div key={index} className="videoItem">
                                <Link to='/' className='hoverStyle'>
                                    <img src={video.thumbnail.regular.large} alt={video.title} />
                                </Link>
                                <div className="videoInfo">
                                    <p>{video.year} &#8226;
                                        <span className='icon'>
                                            <img src="./icon-category-movie.svg" alt="Movie" />
                                        </span>
                                        {video.category} &#8226; {video.rating}
                                    </p>
                                    <h2>{video.title}</h2>
                                    <button className="bookmark" onClick={() => handleBookmark(video)}>
                                        <span className='bookmarkStyle'><img src={video.isBookmarked ? "./icon-bookmark-full.svg" : "./icon-bookmark-empty.svg"} alt="Bookmark" /></span>
                                    </button>
                                    <Link to='/' className="playButton2">
                                        <span><img src="./icon-play.svg" alt="Play" /> Play</span>
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No bookmarked movies found.</p>
                    )}
                </div>
            </div>
            <div>
                <h1>Bookmarked TV Series</h1>
                <div className="videoListSecond">
                    {filteredBookmarkedSeries.length > 0 ? (
                        filteredBookmarkedSeries.map((video, index) => (
                            <div key={index} className="videoItem">
                                <Link to='/' className='hoverStyle'>
                                    <img src={video.thumbnail.regular.large} alt={video.title} />
                                </Link>
                                <div className="videoInfo">
                                    <p>{video.year} &#8226;
                                        <span className='icon'>
                                            <img src="./icon-category-tv.svg" alt="TV Series" />
                                        </span>
                                        {video.category} &#8226; {video.rating}
                                    </p>
                                    <h2>{video.title}</h2>
                                    <button className="bookmark" onClick={() => handleBookmark(video)}>
                                        <span className='bookmarkStyle'><img src={video.isBookmarked ? "./icon-bookmark-full.svg" : "./icon-bookmark-empty.svg"} alt="Bookmark" /></span>
                                    </button>
                                    <Link to='/' className="playButton2">
                                        <span><img src="./icon-play.svg" alt="Play" /> Play</span>
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No bookmarked TV series found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Bookmarks;
