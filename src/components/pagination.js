import { Visibility } from '@material-ui/icons';
import React, { useState } from 'react';

export default function Pagination({onFinish, visibility}) {
    const [startIndex, setStartIndex] = useState(0);
    const handleClick = () => {
        setStartIndex(startIndex + 30);
        onFinish(startIndex);
    };

    return (
        <div onClick={handleClick} className={visibility}>
            <p onClick={handleClick}>Загрузить ещё</p>
        </div>
    )
}