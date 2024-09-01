'use client';
import React, { useState } from "react";
import { useMediaQuery } from 'react-responsive';
import { Avatar } from "antd";
import './reviewCard.css';

const ReviewCard = (props) => {
    const { author_details, content, created_at } = props;
    const avatarPath = author_details?.avatar_path ? `https://image.tmdb.org/t/p/w500/${author_details.avatar_path}` : null;
    const [showFullContent, setShowFullContent] = useState(false);
    const formattedDate = new Date(created_at).toLocaleDateString();
    const break480 = useMediaQuery({ maxWidth: 480 });
    const desktopMaxLength = 350;
    const mobileMaxLength = 150;

    const toggleContent = () => {
        setShowFullContent(!showFullContent);
    };

    const truncatedContent = content.slice(0, break480 ? mobileMaxLength : desktopMaxLength);
    const remainingContent = content.slice(break480 ? mobileMaxLength : desktopMaxLength);

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
                <p className="review-content">
                    {truncatedContent}
                    {remainingContent && (
                        <>
                            {!showFullContent && "..."}
                            {showFullContent && remainingContent}
                        </>
                    )}
                </p>
                {remainingContent && (
                    <button className="read-more-btn" onClick={toggleContent}>
                        {showFullContent ? "Show less" : "Read more"}
                    </button>
                )}
            </div>
        </div>
    );
};

export default ReviewCard;