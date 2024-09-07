// components/Details.js
'use client'; // Keep this directive since this component is interactive

import { useState, useEffect } from 'react';
import TopHeader from '@/components/Header/header';
import ReviewCard from '@/components/ReviewCard/reviewCard';
import SideMovieCard from '@/components/SideMovieCard/sideMovieCard';
import Loader from '@/components/Loader/Loader';
import Footer from '@/components/Footer/footer';
import BackToTop from '@/components/BackToTop/backToTop';
import { Descriptions, Tag, Empty, Button, Spin } from 'antd';
import { PlayCircleTwoTone } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';
import { fetchVideos } from '@/lib/api';
import styles from './Details.module.css';

export default function Details({ params, movieData, recommendations, reviews }) {
    const [watch, setWatch] = useState(false);
    const [embedUrl, setEmbedUrl] = useState('');
    const [genre, setGenre] = useState([]);
    const [trailer, setTrailer] = useState(null);
    const mobileWidth = useMediaQuery({ maxWidth: 480 });
    const items = [
        {
            key: '1',
            label: 'Description',
            children: <span className={styles.truncateDescription}>{movieData?.overview || 'N/A'}</span>,
            span: 2,
        },
        {
            key: '2',
            label: 'Release Date',
            children: movieData?.release_date || movieData?.first_air_date,
            span: 1,
        },
        {
            key: '3',
            label: 'Rating',
            children: <span style={{ color: 'var(--red-font)', fontWeight: 'bold' }}>
                {movieData?.vote_average ? movieData?.vote_average.toFixed(1) : 'N/A'}
            </span>,
            span: 1,
        },
        {
            key: '4',
            label: 'Genres',
            span: 2,
            children: movieData.genres?.map((genre, index) => (
                <Tag key={index} color="blue">
                    {genre.name === 'Science Fiction' ? 'Sci-Fi' : genre.name}
                </Tag>
            )) || 'N/A'
        }
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

        checkUrl();
        fetchVideo();
    }, [params.type, params.id]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const handleWatch = () => {
        setWatch(true);
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    if (!movieData) {
        return <div>No movie data available</div>;
    }

    return (
        <>
            <TopHeader />
            <div className={styles.detailWrapper}>
                <div className={styles.detailLeft}>
                    {watch && (
                        <div className={styles.detailVideo}>
                            {loading && (
                                <Spin
                                    style={{
                                        position: 'absolute',
                                        top: '48%',
                                        left: '48%',
                                        transform: 'translate(-48%, -48%)',
                                        marginRight: '25px',
                                        marginBottom: '25px',
                                        zIndex: '2',
                                    }}
                                />
                            )}
                            {/* {
                                embedUrl !== '' ? ( */}
                            <iframe
                                src={embedUrl}
                                allowFullScreen
                                title={movieData.title || movieData.name}
                                className={styles.videoIframe}
                                onLoad={() =>
                                    setLoading(false)
                                }
                            ></iframe>
                            {/* ) : (
                                    <iframe
                                        src={`https://www.youtube.com/embed/${trailer}`}
                                        allowFullScreen
                                        title={movieData.title || movieData.name}
                                        className={styles.videoIframe}
                                        onLoad={() => setLoading(false)}
                                    ></iframe>
                                )
                            } */}
                        </div>
                    )}
                    <div className={styles.detailLeftTop}>
                        <div className={styles.posterContainer}>
                            <img
                                className={styles.detailPoster}
                                src={
                                    movieData.poster_path
                                        ? `https://image.tmdb.org/t/p/w500/${movieData.poster_path}`
                                        : 'https://placehold.co/500x750.png'
                                }
                                alt={movieData.title || movieData.name}
                            />
                        </div>
                        <div className={styles.detailContainer}>
                            <Descriptions
                                className={styles.customDescriptions}
                                title={movieData.title || movieData.name}
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
                        {recommendations.map(movie => (
                            <SideMovieCard key={movie.id} movie={movie} id={params.type} />
                        ))}
                    </div>
                </div>
            </div >
            <Footer />
            <BackToTop />
        </>
    );
}
