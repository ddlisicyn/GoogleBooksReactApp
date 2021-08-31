import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { getBookById } from '../../API/fetch';
import bookCover from "../../img/noThumbnail.png";
import spinner from "../../img/spinner.svg";

export function BookDetails() {
    const { id } = useParams();
    const [book, setBook] = useState({volumeInfo: {imageLinks: { thumbnail: spinner}}});

    useEffect(() => {
        getBookById(id)
            .then(book => setBook(book));
    }, []);

    let { volumeInfo: {
        authors,
        categories,
        title,
        description,
        infoLink
        } } = book;
    
    let thumbnail = book.volumeInfo?.imageLinks?.thumbnail;
    
    authors = (authors && authors.length > 1) ? authors.join(', ') : authors;
    categories = (categories && categories.length > 1) ? categories.join(', ') : categories;
    return ( 
        <div className="main__book-card">
            <div className="main__book-cover">
                <img src={thumbnail || bookCover}/> 
            </div>
            <div className="main__book-info">
                <p>{categories || 'No categories'}</p>
                <h2>{title}</h2>
                <p>{authors || 'No authors'}</p>
                <div className="main__book-description">
                    <p>{description || 'No description'}</p>
                </div>
                <a href={infoLink} target="_blank">Google Play page</a>
            </div>
        </div>
    )
}