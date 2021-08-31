import { getData } from './helper';

const path = 'https://www.googleapis.com/books/v1/';

const getBooks = (bookTitle, sort, category, startIndex = 0, maxResults = 30) => {
    const url = `${path}volumes?q=${bookTitle}` + 
    `&orderBy=${sort}&subject=${category}&startIndex=${startIndex}` + 
    `&maxResults=${maxResults}&key=AIzaSyDYgrEqAsmIyoRmLzx6rNDSAcGPubpDJ-Q`;

    return getData(url);
}

const getBookById = (id) => {
    const url = `${path}volumes/${id}`;
    
    return getData(url);
}

export { getBooks };
export { getBookById };