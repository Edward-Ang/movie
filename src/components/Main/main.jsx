'use client';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { fetchMovies, fetchTv } from '@/lib/api'; 
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
      <div className={styles.homeDiv} style={{ height: '200vh' }}>
        <Section
          title="Popular Movies"
          items={popularMovies}
          linkHref="/movies/popular/movie"
          break1275={break1275}
          itemType="movie"
        />
        <Section
          title="Popular TV Shows"
          items={tvShows}
          linkHref="/movies/popular/tv"
          break1275={break1275}
          itemType="tv"
        />
        <Section
          title="Top Rated TV Shows"
          items={topRatedTvShows}
          linkHref="/movies/top_rated/tv"
          break1275={break1275}
          itemType="tv"
        />
        <Section
          title="Upcoming Movies"
          items={upcomingMovies}
          linkHref="/movies/upcoming/movie"
          break1275={break1275}
          itemType="movie"
        />
      </div>
    </div>
  );
}