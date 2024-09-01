'use client';
import { useState, useEffect } from "react";
import { searchMovies } from "@/lib/api";
import TopHeader from "@/components/Header/header";
import MovieCard from "@/components/MovieCard/movieCard";
import Footer from "@/components/Footer/footer";
import styles from './page.module.css';

export default function SearchResult({ params }) {
    const [results, setResults] = useState([]);

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                setResults(await searchMovies(params.keyword));
            } catch {
                setResults(['search movie failed']);
            }
        };
        fetchSearchResults();
    }, [params.keyword]);

    return (
        <>
            <TopHeader />
            <div className={styles.searchWrapper}>
                <div className={styles.searchResult}>
                    <div className={styles.movieSection} >
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionHeaderTitle}>Search Results : </h2>
                            <span className={styles.searchKeyword}>{params.keyword}</span>
                        </div>
                        <div className={styles.movieContainer}>
                            <div className={styles.movieList}>
                                {results.map(movie => <MovieCard key={movie.id} movie={movie} type={movie.title ? 'movie' : 'tv'} />)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}