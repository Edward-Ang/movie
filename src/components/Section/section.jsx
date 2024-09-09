'use client';
import { Button } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import Link from 'next/link';
import MovieCard from '../MovieCard/movieCard';
import styles from './section.module.css';

export default function Section({ title, items, linkHref, break1275, itemType }) {
  return (
    <div className={styles.movieSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionHeaderTitle}>{title}</h2>
        <Link href={linkHref} className={styles.moreLink}>
          <Button type="link">
            More
            <RightOutlined />
          </Button>
        </Link>
      </div>
      <div className={styles.movieContainer}>
        <div className={styles.movieList}>
          {items.slice(0, break1275 ? 4 : 5).map((item, index) => (
            <MovieCard key={item.id || index} movie={item} type={itemType} />
          ))}
        </div>
      </div>
    </div>
  );
}