'use client';
import { useState, useEffect } from "react";
import { fetchMovies, fetchTv } from "@/lib/api";
import TopHeader from "@/components/Header/header";
import MovieCard from "@/components/MovieCard/movieCard";
import Footer from "@/components/Footer/footer";
import BackToTop from "@/components/BackToTop/backToTop";
import styles from './page.module.css';

export default function MovieLists({ params }) {
    const [movies, setMovies] = useState([]);
    const [section, setSection] = useState('');

    useEffect(() => {
        const fetchAllMovies = async () => {
            try {
                if (params.type === 'movie') {
                    setMovies(await fetchMovies(params.id));
                    if (params.id === 'popular') {
                        setSection('Popular Movies');
                    } else {
                        setSection('Upcoming Movies');
                    }
                } else {
                    setMovies(await fetchTv(params.id));
                    if (params.id === 'popular') {
                        setSection('Popular TV Shows');
                    } else {
                        setSection('Top Rated TV Shows');
                    }
                }
            } catch {
                setMovies([]);
            }
        }

        fetchAllMovies();
    }, [params.id, params.type]);

    return (
        <>
            <TopHeader />
            <div className={styles.homeWrapper}>
                <div className={styles.homeDiv} >
                    <div className={styles.movieSection} >
                        <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionHeaderTitle}>{section}</h2>
                        </div>
                        <div className={styles.movieContainer}>
                            <div className={styles.movieList}>
                                {movies.map(movie => <MovieCard key={movie.id} movie={movie} id={params.id} />)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <BackToTop />
        </>
    )
}