import React, { useState } from 'react';
import SearchForm from '../components/searchForm';
import CategorySelector from '../components/categoriesSelector';
import SortSelector from '../components/sortSelector';
import BookItem from '../components/book';

function App() {
  const [data, setData] = useState([]);
  const [resultsValue, setResultsValue] = useState('0');
  const onFinish = (titleOfBook, sort = 'relevance', category = 'all') => {
    if (titleOfBook) {
      fetch(`https://www.googleapis.com/books/v1/volumes?q=${titleOfBook}&orderBy=${sort}&subject=${category}&maxResults=30&key=AIzaSyDYgrEqAsmIyoRmLzx6rNDSAcGPubpDJ-Q`)
      .then(response => response.json())
      .then(json => {
        if (json.totalItems) {
          setData(json.items);
          setResultsValue(json.totalItems);
        } else {
          setData([]);
          setResultsValue(json.totalItems);
        }
      });
    }
  };

  return (
    <div className="main">
      <div className="main__search-panel">
        <SearchForm onFinish={onFinish}/>
        <div className="main__selector-menu">
          <CategorySelector onFinish={onFinish}/>
          <SortSelector onFinish={onFinish}/>
        </div>
      </div>
      <p>Всего найдено {resultsValue} книг</p> 
      <div className="main__content">
      {
        data.map(book => (
          <BookItem
           id={book.id}
           imageLink={book.volumeInfo.imageLinks.thumbnail}
           category={book.volumeInfo.categories}
           bookTitle={book.volumeInfo.title}
           author={book.volumeInfo.authors}
          />
        ))
      }
      </div>
    </div>
  )
}

export default App;
