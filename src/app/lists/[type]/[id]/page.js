'use client';
import { useState, useEffect } from "react";
import { fetchMovies, fetchTv } from "@/lib/api";
import { Pagination } from 'antd';
import TopHeader from "@/components/Header/header";
import MovieCard from "@/components/MovieCard/movieCard";
import Footer from "@/components/Footer/footer";
import BackToTop from "@/components/BackToTop/backToTop";
import styles from './page.module.css';

export default function MovieLists({ params }) {
    const [movies, setMovies] = useState([]);
    const [section, setSection] = useState('');
    const [currentPage, setCurrentPage] = useState(1); // Default to page 1
    const [totalPages, setTotalPages] = useState(0); // Store total pages from API

    // Fetch movies or TV shows based on the page number and params
    useEffect(() => {
        const fetchAllMovies = async (page) => {
            try {
                let data;
                if (params.type === 'movie') {
                    data = await fetchMovies(params.id, page); // Pass page to API
                    if (params.id === 'popular') {
                        setSection('Popular Movies');
                    } else {
                        setSection('Upcoming Movies');
                    }
                } else {
                    data = await fetchTv(params.id, page); // Pass page to API
                    if (params.id === 'popular') {
                        setSection('Popular TV Shows');
                    } else {
                        setSection('Top Rated TV Shows');
                    }
                }
                setMovies(data.results); // Assuming the API response has a `results` field
                setTotalPages(data.total_pages > 500 ? 500 : data.total_pages); // Set the total number of pages
            } catch {
                setMovies([]);
            }
        };

        fetchAllMovies(currentPage); // Fetch movies when page changes
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [params.id, params.type, currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page); // Update current page
    };

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
                                {movies.map(movie => <MovieCard key={movie.id} movie={movie} type={params.type} />)}
                            </div>
                        </div>
                        <div className={styles.pageContainer}> 
                            <Pagination
                                current={currentPage}
                                onChange={handlePageChange}
                                total={totalPages * 10}
                                defaultCurrent={1}
                                showSizeChanger={false}
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