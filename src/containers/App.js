import React, { useState } from 'react';
import SearchForm from '../components/searchForm';
import CategorySelector from '../components/categoriesSelector';
import SortSelector from '../components/sortSelector';
import BookItem from '../components/book';
import Pagination from '../components/pagination';

function App() {
  const [data, setData] = useState([]);
  const [resultsValue, setResultsValue] = useState('0');
  const [visibility, setVisibility] = useState('hide');
  const onFinish = (titleOfBook, sort = 'relevance', category = 'all', startIndex = 0) => {
    if (titleOfBook) {
      fetch(`https://www.googleapis.com/books/v1/volumes?q=${titleOfBook}&orderBy=${sort}&subject=${category}&startIndex=${startIndex}&maxResults=30&key=AIzaSyDYgrEqAsmIyoRmLzx6rNDSAcGPubpDJ-Q`)
      .then(response => response.json())
      .then(json => {
        if (json.totalItems) {
          setData(data.concat(json.items));
          setResultsValue(json.totalItems);
          setVisibility('main__pagination-button');
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
          <p>Категории </p>
          <CategorySelector onFinish={onFinish}/>
          <p>Сортировать по</p>
          <SortSelector onFinish={onFinish}/>
        </div>
        <p>Всего найдено {resultsValue} книг</p> 
      </div>
      <div className="main__content">
      {
        data.map(book => {
          if (!book.volumeInfo.imageLinks) {
            book.volumeInfo.imageLinks = {};
            book.volumeInfo.imageLinks.thumbnail = 'https://riossport.ru/local/templates/riossport/assets/images/no-image.png';
          }
          return book;
        }).map(book => (
        <BookItem
          key={book.id}
          imageLink={book.volumeInfo.imageLinks.thumbnail}
          category={book.volumeInfo.categories}
          bookTitle={book.volumeInfo.title}
          author={book.volumeInfo.authors}
        />
      ))
      }
      <Pagination onFinish={onFinish} visibility={visibility}/>
      </div>
    </div>
  )
}

export default App;
