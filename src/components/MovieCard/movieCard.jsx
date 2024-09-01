'use client';
import Link from "next/link";
import AspectRatio from 'react-aspect-ratio';
import { StarFilled } from "@ant-design/icons";
import './movieCard.css';

const MovieCard = ({ movie, type }) => {
  return (
    <div className="movie-card">
      <Link href={`/details/${type}/${movie.id}`} className='movie-link'>
        <AspectRatio ratio="1/0.675">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : 'https://placehold.co/500x750.png'
            }
            alt={movie.title || movie.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </AspectRatio>
        <h3 className='movie-title' title={movie.title || movie.name}>
          {movie.title ? movie.title : movie.name}
        </h3>
        <div className='movie-subtitle'>
          <span>{movie.release_date !== undefined ? movie.release_date.split('-')[0] : movie.first_air_date !== undefined ? movie.first_air_date.split('-')[0] : 'N/A'}</span>
          <div className='rating'>
            <span>{movie.vote_average !== undefined ? movie.vote_average.toFixed(1) : '0.0'}</span>
            <StarFilled className="star-icon" />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;