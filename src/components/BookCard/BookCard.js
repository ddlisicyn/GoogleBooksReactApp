import React from 'react';
import bookCover from "../../img/noThumbnail.png";

export default function BookCard({bookInfo, onClick}) {
    let {volumeInfo: {
        authors,
        categories,
        title
        }
    } = bookInfo;

    let thumbnail = bookInfo.volumeInfo?.imageLinks?.thumbnail;

    authors = (authors && authors.length > 1) ? authors.join(', ') : authors;
    categories = (categories && categories.length > 1) ? categories[0] : categories;
    return (
        <div onClick={onClick} className="main__book-item">
            <img src={thumbnail || bookCover} alt='book cover'/>
            <div>
                <p>{categories || 'No categories'}</p>
                <div className="main__book-title">
                    <h5>{title}</h5>
                </div>
                <div className="main__book-authors">
                    <p>{authors || 'No authors'}</p>
                </div>
            </div>
        </div>
    );
}