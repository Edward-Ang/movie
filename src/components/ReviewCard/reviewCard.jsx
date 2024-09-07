'use client';
import React, { useState } from "react";
import { useMediaQuery } from 'react-responsive';
import { Avatar, Typography } from "antd";
import { format } from 'date-fns';
import './reviewCard.css';

const ReviewCard = (props) => {
    const { author_details, content, created_at } = props;
    const avatarPath = author_details?.avatar_path ? `https://image.tmdb.org/t/p/w500/${author_details.avatar_path}` : null;
    // const formattedDate = new Date(created_at).toLocaleDateString();
    const formattedDate = new Date(created_at).toISOString().split('T')[0]; // Format as YYYY-MM-DD
    const break480 = useMediaQuery({ maxWidth: 480 });
    const { Paragraph } = Typography;
    const [ellipsis, setEllipsis] = useState(true);

    return (
        <div className="review-card">
            <div className="review-left">
                {avatarPath ? (
                    <img src={avatarPath} alt="Author Avatar" className="author-avatar" />
                ) : (
                    <Avatar
                        style={{
                            width: '42px',
                            height: '42px',
                            backgroundColor: 'var(--blue-ant)',
                        }}
                    >
                        {author_details.username[0].toUpperCase()}
                    </Avatar>
                )}
            </div>
            <div className="review-right">
                <div className="author-details">
                    <div className="author-username">
                        <span className="author-name">@{author_details.username || "Anonymous"}</span>
                        <span className="review-date">{formattedDate}</span>
                    </div>
                    <div className='rating' id='review-rating'>
                        <span className="rating-score">{author_details.rating !== null ? author_details.rating.toFixed(1) : 'N/A'}</span>
                        <span className="rating-score-total">/10</span>
                    </div>
                </div>
                <Paragraph ellipsis={ellipsis ? { rows: 3, expandable: true, symbol: 'more' } : false}
                    style={{ textAlign: 'justify' }}>
                    {content}
                </Paragraph>
            </div>
        </div>
    );
};

export default ReviewCard;