import BackToTop from '@/components/BackToTop/backToTop';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className='home-div' style={{height: '500vh'}}>
      <BackToTop />
    </div>
  );
}
