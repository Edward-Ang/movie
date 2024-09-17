// app/page.js
import TopHeader from '@/components/Header/header';
import Main from '@/components/Main/main';
import Footer from '@/components/Footer/footer';
import BackToTop from '@/components/BackToTop/backToTop';
import { fetchMovies, fetchTv } from '@/lib/api';

export default async function HomePage() {
  // Fetch data on the server
  const popularMovies = await fetchMovies('popular', 1);
  const upcomingMovies = await fetchMovies('upcoming', 1);
  const tvShows = await fetchTv('popular', 1);
  const topRatedTvShows = await fetchTv('top_rated', 1);

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
