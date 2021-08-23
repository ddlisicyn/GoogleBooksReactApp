import React from 'react';

export default function BookItem({imageLink, category, bookTitle, author}) {
    return (
        <div className="bookItem">
            <img src={imageLink} alt='book cover'></img>
            <div>
            <p>{category}</p>
            <h5>{bookTitle}</h5>
            <p>{author}</p>
            </div>
        </div>
    );
} 