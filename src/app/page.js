import TopHeader from '@/components/Header/header';
import Main from '@/components/Main/main';
import BackToTop from '@/components/BackToTop/backToTop';
import Footer from '@/components/Footer/footer';
import styles from './page.module.css';

export default function Home() {
  return (
    <>
      <TopHeader />
      <Main />
      <Footer />
      <BackToTop />
    </>
  );
}
