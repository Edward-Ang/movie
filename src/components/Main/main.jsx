import Section from '../Section/section';
import styles from './main.module.css';

export default function Main({ popularMovies, upcomingMovies, tvShows, topRatedTvShows }) {
  return (
    <div className={styles.homeWrapper}>
      <div className={styles.homeDiv}>
        <Section title="Popular Movies" items={popularMovies} linkHref="/lists/movie/popular" itemType="movie" />
        <Section title="Popular TV Shows" items={tvShows} linkHref="/lists/tv/popular" itemType="tv" />
        <Section title="Top Rated TV Shows" items={topRatedTvShows} linkHref="/lists/tv/top_rated" itemType="tv" />
        <Section title="Upcoming Movies" items={upcomingMovies} linkHref="/lists/movie/upcoming" itemType="movie" />
      </div>
    </div>
  );
}
