'use client';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { fetchMovies, fetchTv } from '@/lib/api'; 
import { isMobile, isDesktop, isTablet } from 'react-device-detect';
import Section from '../Section/section';
import styles from './main.module.css';

export default function Main() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [topRatedTvShows, setTopRatedTvShows] = useState([]);
  const break1275 = useMediaQuery({ maxWidth: 1275 });

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        setPopularMovies(await fetchMovies('popular'));
        setUpcomingMovies(await fetchMovies('upcoming'));
        setTvShows(await fetchTv('popular'));
        setTopRatedTvShows(await fetchTv('top_rated'));
      } catch {
        setPopularMovies([]);
        setUpcomingMovies([]);
        setTvShows([]);
        setTopRatedTvShows([]);
      }
    };
    fetchAllMovies();
  }, []);

  return (
    <div className={styles.homeWrapper}>
      <div className={styles.homeDiv} >
        <Section
          title="Popular Movies"
          items={popularMovies}
          linkHref="/lists/movie/popular"
          break1275={break1275}
          itemType="movie"
        />
        <Section
          title="Popular TV Shows"
          items={tvShows}
          linkHref="/lists/tv/popular"
          break1275={break1275}
          itemType="tv"
        />
        <Section
          title="Top Rated TV Shows"
          items={topRatedTvShows}
          linkHref="/lists/tv/top_rated"
          break1275={break1275}
          itemType="tv"
        />
        <Section
          title="Upcoming Movies"
          items={upcomingMovies}
          linkHref="/lists/movie/upcoming"
          break1275={break1275}
          itemType="movie"
        />
      </div>
    </div>
  );
}