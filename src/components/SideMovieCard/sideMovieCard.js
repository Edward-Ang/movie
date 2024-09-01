import React, { useEffect, useState } from "react";
import Link from "next/link";
import { genreList } from "@/lib/genreList";
import { Tag } from "antd";
import { StarFilled } from "@ant-design/icons";
import { useMediaQuery } from 'react-responsive';
import './sideMovieCard.css';

const SideMovieCard = ({ movie, id }) => {
    const [genres, setGenres] = useState([]);
    const isBetween769And900 = useMediaQuery({ minWidth: 769, maxWidth: 900 });
    const isBetween901And1152 = useMediaQuery({ minWidth: 901, maxWidth: 1152 });

    useEffect(() => {
        if (movie.genre_ids) {
            const genreNames = movie.genre_ids.map(genreId => genreList[genreId]);
            setGenres(genreNames);
        }
    }, [movie.genre_ids]);

    const getYear = (dateString) => {
        if (dateString) {
            return dateString.split('-')[0];
        }
        return '';
    };

    return (
        <Link href={`/details/${id}/${movie.id}`} key={movie.id} movie={movie} className="similar-container" >
            <img className='similar-poster'
                src={movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                    : 'https://placehold.co/500x750.png'
                }
                alt={movie.title || movie.name} />
            <div className='similar-detail'>
                <h3 className='movie-title' id='similar-movie-title' title={movie.title || movie.name}>{movie.title ? movie.title : movie.name}</h3>
                <div className='genres' id='similar-genres'>
                    {genres?.slice(0, (isBetween769And900 || isBetween901And1152) ? 2 : 3).map((genreName, index) => (
                        <Tag key={index} color="blue">{genreName === 'Science Fiction' ? 'Sci-Fi' : genreName}</Tag>
                    )) || 'N/A'}
                </div>
                <div className='movie-subtitle' id='similar-movie-subtitle'>
                    <span>{getYear(movie.release_date) || getYear(movie.first_air_date)}</span>
                    <div className='rating'>
                        <span>{movie.vote_average.toFixed(1)}</span>
                        <StarFilled className="star-icon" />
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default SideMovieCard;