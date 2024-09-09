// app/page.js
import TopHeader from '@/components/Header/header';
import Main from '@/components/Main/main';
import Footer from '@/components/Footer/footer';
import BackToTop from '@/components/BackToTop/backToTop';
import { fetchMovies, fetchTv } from '@/lib/api';

export default async function HomePage() {
  // Fetch data on the server
  const popularMovies = await fetchMovies('popular');
  const upcomingMovies = await fetchMovies('upcoming');
  const tvShows = await fetchTv('popular');
  const topRatedTvShows = await fetchTv('top_rated');

  return (
    <>
      <TopHeader />
      <Main
        popularMovies={popularMovies}
        upcomingMovies={upcomingMovies}
        tvShows={tvShows}
        topRatedTvShows={topRatedTvShows}
      />
      <Footer />
      <BackToTop />
    </>
  );
}
