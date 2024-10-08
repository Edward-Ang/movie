'use client';
import { useEffect, useState } from 'react';
import Link from "next/link";
import { StarFilled } from "@ant-design/icons";
import { Card } from 'antd';
import { isMobile as detectMobile } from "react-device-detect";
import './movieCard.css';
import './movieCardMedia.css';

const MovieCard = ({ movie, type }) => {
  const { Meta } = Card;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(detectMobile); // Set `isMobile` only on the client side
  }, []);

  return (
    <Link
      href={`/details/${type}/${movie.id}`}
      className='movie-link'
      title={movie.title ? movie.title : movie.name}
    >
      <Card
        hoverable
        style={isMobile ? {
          width: 175,
        } : {
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
          title={
            <span>
              {movie.title ? movie.title : movie.name}
            </span>
          }
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