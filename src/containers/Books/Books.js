import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import BookCard from '../../components/BookCard/BookCard';
import PaginationButton from '../../components/PaginationButton/PaginationButton';
import SearchPanel from '../../components/SearchPanel/SearchPanel';
import Loader from '../../components/Loader/Loader';
import { getBooks } from '../../API/fetch';

function Books() {
  const [data, setData] = useState([]);
  const [resultsValue, setResultsValue] = useState('0');
  const [bookTitle, setBookTitle] = useState('');
  const [sort, setSort] = useState('');
  const [category, setCategory] = useState('');
  const [loaderVisibility, setLoaderVisibility] = useState(true);
  const history = useHistory();

  const onFinish = (bookTitle, sort = 'relevance', category = 'all') => {
    if (bookTitle) {
      setLoaderVisibility(false);
      setBookTitle(bookTitle);
      setSort(sort);
      setCategory(category);

      getBooks(bookTitle, sort, category)
        .then(data => {
            setLoaderVisibility(true);
            if (data.totalItems) {
                setData(data.items);
                setResultsValue(data.totalItems);
            } else {
                setData([]);
                setResultsValue(data.totalItems);
            }
      });
    }
  };

  const loadMore = (bookTitle, sort, category, startIndex, maxResults) => {
    setLoaderVisibility(false);

    getBooks(bookTitle, sort, category, startIndex, maxResults)
        .then(json => {
            setLoaderVisibility(true);
            setData(data.concat(json.items));
            setResultsValue(json.totalItems);
      });
    if (maxResults < 30) setBookTitle('');
  };

  const onBookClick = (id) => {
    history.push(`/card/${id}`);
  };

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
            <BookCard
              key={book.id + book.etag}
              thumbnail={book.volumeInfo?.imageLinks?.thumbnail}
              category={book.volumeInfo?.categories}
              bookTitle={book.volumeInfo.title}
              authors={book.volumeInfo?.authors}
              onClick={() => onBookClick(book.id)}
            />
          ))
        }
        </div>
        <Loader
          visibility={loaderVisibility}
        />
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

export { Books };