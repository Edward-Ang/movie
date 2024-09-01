'use client';
import { useState, useEffect } from "react";
import { fetchMovieDetails, fetchTvDetails, similarMovies, fetchMovies, fetchTv } from "@/lib/api";
import TopHeader from "@/components/Header/header";
import Footer from "@/components/Footer/footer";
import styles from './page.module.css';

export default function Details({ params }) {
    const [movie, setMovie] = useState(null);
    const [recommend, setRecommend] = useState([]);
    const [genre, setGenre] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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

        fetchDetails();
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
                            <h1>{movie.title || movie.name}</h1>
                            <p className={styles.movieOverview}>{movie.overview}</p>
                            <p className={styles.movieDate}>Release Date: {movie.release_date || movie.first_air_date}</p>
                            <div className={styles.movieRating}>
                                <span>Rating: </span>
                                <span className={styles.movieDetailRating}>{movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</span>
                            </div>
                            <div className={styles.genres}>
                                {genre.slice(0, 3).map((genreName, index) => (
                                    <span key={index} className={styles.genreItem}>{genreName === 'Science Fiction' ? 'Sci-Fi' : genreName}</span>
                                ))}
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