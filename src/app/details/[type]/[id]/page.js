'use client';
import { useState, useEffect } from "react";
import {
    fetchMovieDetails,
    fetchTvDetails,
    similarMovies,
    fetchMovies,
    fetchTv,
    fetchReviews
} from "@/lib/api";
import TopHeader from "@/components/Header/header";
import ReviewCard from "@/components/ReviewCard/reviewCard";
import Footer from "@/components/Footer/footer";
import { Descriptions } from 'antd';
import styles from './page.module.css';

export default function Details({ params }) {
    const [movie, setMovie] = useState(null);
    const [recommend, setRecommend] = useState([]);
    const [genre, setGenre] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
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
            children: movie?.vote_average ? movie?.vote_average.toFixed(1) : 'N/A',
            span: 1,
        },
        {
            key: '4',
            label: 'Genres',
            span: 2,
            children: 'No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China',
        },
    ];

    useEffect(() => {
        const fetchDetails = async () => {
            setIsLoading(true);
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
                setIsLoading(false);
            }
        };

        const fetchMovieReviews = async () => {
            try {
                setReviews(await fetchReviews(params.id, params.type));
            } catch {
                setReviews([]);
            }
        };

        fetchDetails();
        fetchMovieReviews();
    }, [params.type, params.id]);

    if (isLoading) {
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
                        </div>
                    </div>
                    <div className={styles.detailReview}>
                        <div className={styles.reviewSection}>
                            <h2>Reviews</h2>
                            <div className="review-list">
                                <span>test review</span>
                                {reviews.length > 0 ? (
                                    reviews.map((review) => (
                                        <ReviewCard key={review.id} {...review} />
                                    ))
                                ) : (
                                    <div className='no-reviews'>
                                        No reviews
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.detailRight}>
                    {/* Add content for the right side if needed */}
                </div>
            </div>
            <Footer />
        </>
    );
}