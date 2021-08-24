import React, { useState } from 'react';

export default function PaginationButton({bookTitle, sort, category, loadMore, visibility}) {
    const [startIndex, setStartIndex] = useState(30);
    const handleClick = () => {
        setStartIndex(startIndex + 30);
        loadMore(bookTitle, sort, category, startIndex);
    };

    return (
        <div onClick={handleClick} className={visibility}>
            <p>Загрузить ещё</p>
        </div>
    )
}