import React from 'react';
import bookCover from "../noThumbnail.png";

export default function BookItem({thumbnail, category, bookTitle, author}) {
    author = (author && author.length > 1) ? author.join(', ') : author;
    category = (category && category.length > 1) ? category[0] : category;
    return (
        <div className="main__book-item">
            <img src={thumbnail || bookCover} alt='book cover'></img>
            <div>
                <p>{category || 'No categories'}</p>
                <div className="main__book-title">
                    <h5>{bookTitle}</h5>
                </div>
                <div className="main__book-authors">
                    <p>{author || 'No authors'}</p>
                </div>
            </div>
        </div>
    );
}