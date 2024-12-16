import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';

const Movies = () => {
    const [movies, setMovies] = useState(() => {
        const savedVideos = localStorage.getItem('videos');
        return savedVideos ? JSON.parse(savedVideos).filter(video => video.category === 'Movie') : [];
    });
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('data/data.json');
                const data = await response.json();
                const movieData = data.filter(video => video.category === 'Movie');
                const savedVideos = localStorage.getItem('videos');
                const combinedData = savedVideos ? mergeVideoData(JSON.parse(savedVideos), movieData).filter(video => video.category === 'Movie') : movieData;
                setMovies(combinedData);
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

    const handleBookmark = (movie) => {
        const updatedMovie = { ...movie, isBookmarked: !movie.isBookmarked };
        const updatedMovies = movies.map((item) =>
            item.title === movie.title ? updatedMovie : item
        );

        setMovies(updatedMovies);
        const allVideos = JSON.parse(localStorage.getItem('videos')) || [];
        const updatedVideos = allVideos.map((item) =>
            item.title === movie.title ? updatedMovie : item
        );
        localStorage.setItem('videos', JSON.stringify(updatedVideos));
    };

    const filteredMovies = movies.filter(movie =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <div className="movies">
                <p className='search'>
                    <img src="./icon-search.svg" alt="Search Icon" />
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
                            <Link to='/' className='hoverStyle'>
                                <img src={movie.thumbnail?.regular?.large} alt={movie.title} />
                            </Link>
                            <div className="movieInfo">
                                <p>{movie.year} &#8226;
                                    <span className='icon'>
                                        <img src="./icon-category-movie.svg" alt="Movie Category Icon" />
                                    </span> {movie.category} &#8226; {movie.rating}
                                </p>
                                <h2>{movie.title}</h2>
                                <button className='bookmark' onClick={() => handleBookmark(movie)}>
                                    <span className='bookmarkStyle'><img src={movie.isBookmarked ? "./icon-bookmark-full.svg" : "./icon-bookmark-empty.svg"} alt="Bookmark Icon" /></span>
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

export default Movies;
