import React, { useMemo, useState } from 'react';
import SearchForm from '../components/searchForm';
import CategorySelector from '../components/categoriesSelector';
import SortSelector from '../components/sortSelector';
import BookItem from '../components/book';
import PaginationButton from '../components/paginationButton';

function App() {
  const [data, setData] = useState([]);
  const [resultsValue, setResultsValue] = useState('0');
  const [visibility, setVisibility] = useState('hide');
  const [bookTitle, setBookTitle] = useState('');
  const [sort, setSort] = useState('');
  const [category, setCategory] = useState('');

  const onFinish = (bookTitle, sort = 'relevance', category = 'all') => {
    if (bookTitle) {
      setBookTitle(bookTitle);
      setSort(sort);
      setCategory(category);
      fetch(`https://www.googleapis.com/books/v1/volumes?q=${bookTitle}` + 
            `&orderBy=${sort}&subject=${category}` + 
            `&maxResults=30&key=AIzaSyDYgrEqAsmIyoRmLzx6rNDSAcGPubpDJ-Q`)
      .then(response => response.json())
      .then(json => {
        if (json.totalItems) {
          setData(json.items);
          setResultsValue(json.totalItems);
          setVisibility('main__pagination-button');
        } else {
          setData([]);
          setResultsValue(json.totalItems);
        }
      });
    }
  };

  const loadMore = (bookTitle, sort, category, startIndex, maxResults, visibility) => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${bookTitle}` + 
            `&orderBy=${sort}&subject=${category}&startIndex=${startIndex}` + 
            `&maxResults=${maxResults}&key=AIzaSyDYgrEqAsmIyoRmLzx6rNDSAcGPubpDJ-Q`)
      .then(response => response.json())
      .then(json => {
          setData(data.concat(json.items));
          setResultsValue(json.totalItems);
          setVisibility(visibility);
      });
  }

  return (
    <div className="main">
      <div className="main__search-panel">
        <SearchForm onFinish={onFinish}/>
        <div className="main__selector-menu">
          <p>Категории</p>
          <CategorySelector 
            onFinish={onFinish}
            bookTitle={bookTitle} 
            sort={sort} 
          />
          <p>Сортировать по</p>
          <SortSelector 
            onFinish={onFinish}
            bookTitle={bookTitle} 
            category={category} 
          />
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
          if (!book.volumeInfo.categories) {
            book.volumeInfo.categories = 'No categories';
          }
          if (!book.volumeInfo.authors) {
            book.volumeInfo.authors = 'No authors';
          }
          return book;
        }).map(book => (
        <BookItem
          key={book.id + book.etag}
          imageLink={book.volumeInfo.imageLinks.thumbnail}
          category={book.volumeInfo.categories}
          bookTitle={book.volumeInfo.title}
          author={book.volumeInfo.authors}
        />
      ))
      }
      <PaginationButton
        loadMore={loadMore}
        bookTitle={bookTitle} 
        sort={sort} 
        category={category} 
        visibility={visibility}
        resultsValue={resultsValue}
      />
      </div>
    </div>
  )
}

export default App;
