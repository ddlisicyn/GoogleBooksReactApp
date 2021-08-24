import React, { useState } from 'react';

export default function PaginationButton({onFinish, visibility}) {
    const [startIndex, setStartIndex] = useState(30);
    const handleClick = () => {
        setStartIndex(startIndex + 30);
        onFinish(startIndex);
    };

    return (
        <div onClick={handleClick} className={visibility}>
            <p>Загрузить ещё</p>
        </div>
    )
}