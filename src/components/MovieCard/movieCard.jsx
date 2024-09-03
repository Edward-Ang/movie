'use client';
import Link from "next/link";
// import AspectRatio from 'react-aspect-ratio';
import { StarFilled } from "@ant-design/icons";
import { Card } from 'antd';
import './movieCard.css';

const MovieCard = ({ movie, type }) => {
  const { Meta } = Card;

  return (
    <Link
      href={`/details/${type}/${movie.id}`}
      className='movie-link'
      title={movie.title ? movie.title : movie.name}
    >
      <Card
        hoverable
        style={{
          width: 225,
        }}
        cover={
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : 'https://placehold.co/500x750.png'
            }
            alt={movie.title || movie.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        }
      >
        <Meta
          title={movie.title ? movie.title : movie.name}
          description={
            <div className='movie-subtitle'>
              <span>{movie.release_date !== undefined ? movie.release_date.split('-')[0] : movie.first_air_date !== undefined ? movie.first_air_date.split('-')[0] : 'N/A'}</span>
              <div className='rating'>
                <span>{movie.vote_average !== undefined ? movie.vote_average.toFixed(1) : '0.0'}</span>
                <StarFilled className="star-icon" />
              </div>
            </div>
          }
        />
      </Card>
    </Link>
  );
};

export default MovieCard;