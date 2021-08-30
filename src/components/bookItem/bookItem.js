import React from 'react';
import bookCover from "./noThumbnail.png";

export default function BookItem({thumbnail, category, bookTitle, authors, onClick}) {
    authors = (authors && authors.length > 1) ? authors.join(', ') : authors;
    category = (category && category.length > 1) ? category[0] : category;
    return (
        <div onClick={onClick} className="main__book-item">
            <img src={thumbnail || bookCover} alt='book cover'></img>
            <div>
                <p>{category || 'No categories'}</p>
                <div className="main__book-title">
                    <h5>{bookTitle}</h5>
                </div>
                <div className="main__book-authors">
                    <p>{authors || 'No authors'}</p>
                </div>
            </div>
        </div>
    );
}