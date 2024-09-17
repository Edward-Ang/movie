'use client';
import { useState, useEffect } from "react";
import { searchMovies } from "@/lib/api";
import { Typography, Pagination } from "antd";
import TopHeader from "@/components/Header/header";
import MovieCard from "@/components/MovieCard/movieCard";
import Footer from "@/components/Footer/footer";
import BackToTop from "@/components/BackToTop/backToTop";
import styles from './page.module.css';

export default function SearchResult({ params }) {
    const [results, setResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Track the current page
    const [totalResults, setTotalResults] = useState(0); // Track the total number of results
    const { Text } = Typography;

    // Decode the keyword to display it properly
    const decodedKeyword = decodeURIComponent(params.keyword);

    // Fetch search results on initial load or when the page changes
    useEffect(() => {
        // Function to fetch search results based on the current page
        const fetchSearchResults = async (keyword, page) => {
            try {
                const response = await searchMovies(keyword, page);
                setResults(response.results || []);
                setTotalResults(response.total_results > 500 ? 500 : response.total_results); // Set total number of results
            } catch {
                setResults(['search movie failed']);
            }
        };

        fetchSearchResults(params.keyword, currentPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [params.keyword, currentPage]);

    // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page); // Update the current page
    };

    return (
        <>
            <TopHeader />
            <div className={styles.searchWrapper}>
                <div className={styles.searchResult}>
                    <div className={styles.movieSection} >
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionHeaderTitle}>Search Results :</h2>
                            <Text
                                className={styles.searchKeyword}
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
                        <div className={styles.pageContainer}>
                            <Pagination
                                current={currentPage}
                                onChange={handlePageChange}
                                total={totalResults}
                                defaultCurrent={1}
                                showSizeChanger={false}
                                pageSize={20}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <BackToTop />
        </>
    );
}
