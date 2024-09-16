'use client';
import { useState, useEffect } from "react";
import { searchMovies } from "@/lib/api";
import { Typography } from "antd";
import TopHeader from "@/components/Header/header";
import MovieCard from "@/components/MovieCard/movieCard";
import Footer from "@/components/Footer/footer";
import BackToTop from "@/components/BackToTop/backToTop";
import styles from './page.module.css';

export default function SearchResult({ params }) {
    const [results, setResults] = useState([]);
    const { Text } = Typography;

    // Decode the keyword to display it properly
    const decodedKeyword = decodeURIComponent(params.keyword);

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
                            <Text
                                className={styles.searchKeyword}
                                // style={{ width: 200 }}
                                ellipsis={{ tooltip: `${decodedKeyword}` }}
                            >
                                {decodedKeyword}
                            </Text>
                        </div>
                        <div className={styles.movieContainer}>
                            <div className={styles.movieList}>
                                {results.map(movie => (
                                    <MovieCard key={movie.id} movie={movie} type={movie.title ? 'movie' : 'tv'} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <BackToTop />
        </>
    );
}
