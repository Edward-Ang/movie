'use client';
import { useState, useEffect } from "react";
import {
    fetchMovieDetails,
    fetchTvDetails,
    similarMovies,
    fetchMovies,
    fetchTv,
    fetchReviews,
    fetchVideos,
} from "@/lib/api";
import TopHeader from "@/components/Header/header";
import ReviewCard from "@/components/ReviewCard/reviewCard";
import SideMovieCard from "@/components/SideMovieCard/sideMovieCard";
import Footer from "@/components/Footer/footer";
import BackToTop from "@/components/BackToTop/backToTop";
import { Descriptions, Tag, Empty, Button } from 'antd';
import { PlayCircleTwoTone } from "@ant-design/icons";
import { useMediaQuery } from 'react-responsive';
import styles from './page.module.css';

export default function Details({ params }) {
    const [movie, setMovie] = useState(null);
    const [recommend, setRecommend] = useState([]);
    const [genre, setGenre] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [watch, setWatch] = useState(false);
    const [trailer, setTrailer] = useState(null);
    const [embedUrl, setEmbedUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const mobileWidth = useMediaQuery({ maxWidth: 480 });
    const items = [
        {
            key: '1',
            label: 'Description',
            children: <span className={styles.truncateDescription}>{movie?.overview || 'N/A'}</span>,
            span: 2,
        },
        {
            key: '2',
            label: 'Release Date',
            children: movie?.release_date || movie?.first_air_date,
            span: 1,
        },
        {
            key: '3',
            label: 'Rating',
            children: <span style={{ color: 'var(--red-font)', fontWeight: 'bold' }}>
                {movie?.vote_average ? movie?.vote_average.toFixed(1) : 'N/A'}
            </span>,
            span: 1,
        },
        {
            key: '4',
            label: 'Genres',
            span: 2,
            children: genre?.map((genreName, index) => (
                <Tag key={index} color="blue">{genreName === 'Science Fiction' ? 'Sci-Fi' : genreName}</Tag>
            )) || 'N/A'
        },
    ];

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const videos = await fetchVideos(params.type, params.id);
                const trailer = videos.find(video => (video.type === "Trailer" || video.type === "Opening Credits") && video.site === "YouTube");
                setTrailer(trailer ? trailer.key : null);
            } catch {
                setTrailer(null);
            }
        };

        const fetchDetails = async () => {
            setLoading(true);
            try {
                if (params.type === 'movie') {
                    const [movieDetails, recommendedMovies] = await Promise.all([
                        fetchMovieDetails(params.id),
                        similarMovies('movie', params.id),
                    ]);
                    setMovie(movieDetails);
                    setRecommend(recommendedMovies.length !== 0 ? recommendedMovies : await fetchMovies('popular'));
                    setGenre(movieDetails.genres ? movieDetails.genres.map(genre => genre.name) : []);
                } else {
                    const [tvDetails, recommendedTv] = await Promise.all([
                        fetchTvDetails(params.id),
                        similarMovies('tv', params.id),
                    ]);
                    setMovie(tvDetails);
                    setRecommend(recommendedTv.length !== 0 ? recommendedTv : await fetchTv('popular'));
                    setGenre(tvDetails.genres ? tvDetails.genres.map(genre => genre.name) : []);
                }
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } catch (error) {
                console.error('Error fetching details or recommendations:', error);
                setMovie(null);
                setRecommend([]);
                setGenre([]);
            } finally {
                setLoading(false);
            }
        };

        const fetchMovieReviews = async () => {
            try {
                setReviews(await fetchReviews(params.id, params.type));
            } catch {
                setReviews([]);
            }
        };

        const checkUrl = async () => {
            const url = `https://vidsrc.pro/embed/movie/${params.id}`;
            try {
                const response = await fetch(url);
                if (response.status === 404) {
                    console.log('cant fetch video 404');
                } else {
                    console.log(response.status);
                    setEmbedUrl(url);
                }
            } catch (error) {
                console.error('Error fetching the URL:', error);
            }
        };

        fetchVideo();
        fetchDetails();
        fetchMovieReviews();
        checkUrl();
    }, [params.type, params.id]);

    const handleWatch = () => {
        setWatch(true);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!movie) {
        return <div>No movie data available</div>;
    }

    return (
        <>
            <TopHeader />
            <div className={styles.detailWrapper}>
                <div className={styles.detailLeft}>
                    {watch && (
                        <div className='detail-video'>
                            {loading &&
                                <Loader />
                            }
                            {embedUrl !== '' ? (
                                <iframe
                                    src={embedUrl}
                                    allowFullScreen
                                    title={movie.title || movie.name}
                                    className='video-iframe'
                                    onLoad={() => setLoading(false)}
                                ></iframe>
                            ) : (
                                <iframe
                                    src={`https://www.youtube.com/embed/${trailer}`}
                                    allowFullScreen
                                    title={movie.title || movie.name}
                                    className='video-iframe'
                                    onLoad={() => setLoading(false)}
                                ></iframe>
                            )}
                        </div>
                    )}
                    <div className={styles.detailLeftTop}>
                        <div className={styles.posterContainer}>
                            <img
                                className={styles.detailPoster}
                                src={
                                    movie.poster_path
                                        ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                                        : 'https://placehold.co/500x750.png'
                                }
                                alt={movie.title || movie.name}
                            />
                        </div>
                        <div className={styles.detailContainer}>
                            <Descriptions
                                className={styles.customDescriptions}
                                title={movie.title || movie.name}
                                layout="vertical"
                                items={items}
                                size="small"
                                column={2}
                            />
                            {trailer &&
                                <Button
                                    className={styles.watchBtn}
                                    size="large"
                                    type="primary"
                                    icon={<PlayCircleTwoTone />}
                                    onClick={handleWatch}>
                                    Watch
                                </Button>
                            }
                        </div>
                    </div>
                    <div className={styles.detailReview}>
                        <div className={styles.reviewSection}>
                            <h2>Reviews</h2>
                            <div className="review-list">
                                {reviews.length > 0 ? (
                                    reviews.map((review) => (
                                        <ReviewCard key={review.id} {...review} />
                                    ))
                                ) : (
                                    <div className={styles.noReviews}>
                                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.detailRight}>
                    <h2>You May Also Like</h2>
                    <div className="side-movie-container">
                        {recommend.map(movie => (
                            <SideMovieCard key={movie.id} movie={movie} id={params.type} />
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
            <BackToTop />
        </>
    );
}