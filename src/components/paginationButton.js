import React, { useState } from 'react';

export default function PaginationButton({bookTitle, sort, category, loadMore, visibility, resultsValue}) {
    const [startIndex, setStartIndex] = useState(30);
    const handleClick = () => {
        let maxResults = (resultsValue - startIndex) < 30 ? (resultsValue - startIndex) : 30;
        setStartIndex(startIndex + 30);
        let visibility = (maxResults !== 30) ? 'hide' : 'main__pagination-button';
        loadMore(bookTitle, sort, category, startIndex, maxResults, visibility);
    };

    return (
        <div onClick={handleClick} className={visibility}>
            <p>Загрузить ещё</p>
        </div>
    )
}