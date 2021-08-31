import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

export function BookDetails() {
    const { id } = useParams();
    const [book, setBook] = useState({volumeInfo: {imageLinks: {}}});

    useEffect(() => {
        fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
        .then(response => response.json())
        .then(json => setBook(json));
    }, []);

    let { volumeInfo: {
        imageLinks: { thumbnail },
        authors,
        categories,
        title,
        description,
        infoLink
        } } = book;
    
    authors = (authors && authors.length > 1) ? authors.join(', ') : authors;
    categories = (categories && categories.length > 1) ? categories.join(', ') : categories;
    return ( 
        <div className="main__book-card">
            <div className="main__book-cover">
                <img src={thumbnail}></img> 
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