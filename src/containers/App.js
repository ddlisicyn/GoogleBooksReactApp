import React, { useState } from 'react';
import BookItem from '../components/bookItem';
import PaginationButton from '../components/paginationButton';
import SearchPanel from '../components/searchPanel';

function App() {
  const [data, setData] = useState([]);
  const [resultsValue, setResultsValue] = useState('0');
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
        } else {
          setData([]);
          setResultsValue(json.totalItems);
        }
      });
    }
  };

  const loadMore = (bookTitle, sort, category, startIndex, maxResults) => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${bookTitle}` + 
            `&orderBy=${sort}&subject=${category}&startIndex=${startIndex}` + 
            `&maxResults=${maxResults}&key=AIzaSyDYgrEqAsmIyoRmLzx6rNDSAcGPubpDJ-Q`)
      .then(response => response.json())
      .then(json => {
          setData(data.concat(json.items));
          setResultsValue(json.totalItems);
      });
    if (maxResults < 30) setBookTitle('');
  }

  return (
    <div className="main">
      <SearchPanel
        onFinish={onFinish}
        bookTitle={bookTitle}
        sort={sort}
        category={category}
        resultsValue={resultsValue}
      />
      <div className="main__content">
      {
        data.map(book => (
          <BookItem
            key={book.id + book.etag}
            thumbnail={book.volumeInfo?.imageLinks?.thumbnail}
            category={book.volumeInfo?.categories}
            bookTitle={book.volumeInfo.title}
            author={book.volumeInfo?.authors}
          />
        ))
      }
      </div>
      <PaginationButton
        loadMore={loadMore}
        bookTitle={bookTitle} 
        sort={sort} 
        category={category} 
        visibility={!!bookTitle}
        resultsValue={resultsValue}
      />
    </div>
  )
}

export default App;
