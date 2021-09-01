import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import CategorySelector from '../Selectors/CategoriesSelector';
import SortSelector from '../Selectors/SortSelector';

export default function SearchPanel ({onFinish, bookTitle, sort, category, resultsValue}) {
    return (
        <div className="main__search-panel">
        <SearchForm onFinish={onFinish}/>
        <div className="main__selector-menu">
          <p>Categories</p>
          <CategorySelector 
            onFinish={onFinish}
            bookTitle={bookTitle} 
            sort={sort} 
          />
          <p>Sort by</p>
          <SortSelector 
            onFinish={onFinish}
            bookTitle={bookTitle} 
            category={category} 
          />
        </div>
        <p>Found {resultsValue} books in total</p> 
      </div>
    )
}