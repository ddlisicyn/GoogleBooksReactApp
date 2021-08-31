import React from 'react';
import spinner from './spinner.svg';

export default function Loader({visibility}) {
    return (
        <img
         className={visibility ? 'hide' : 'main__loader'}
         src={spinner} 
         alt="loader-spinner"
        />
    )
}