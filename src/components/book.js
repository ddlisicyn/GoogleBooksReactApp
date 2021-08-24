import React from 'react';

export default function BookItem({imageLink, category, bookTitle, author}) {
    return (
        <div className="main__book-item">
            <img src={imageLink} alt='book cover'></img>
            <div>
                <p>{category}</p>
                <div className="main__book-title">
                    <h5>{bookTitle}</h5>
                </div>
                <div className="main__book-authors">
                    <p>{author}</p>
                </div>
            </div>
        </div>
    );
}