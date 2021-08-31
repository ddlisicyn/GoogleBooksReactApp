import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  } from "react-router-dom";
import { BookDetails } from './BookDetails/BookDetails';
import { Books } from './Books/Books';
import { routes } from '../constans/routes';

const {card, core} = routes;

function App() {
  return (
    <Router>
      <Switch>
        <Route path={card}>
          <BookDetails />
        </Route>
        <Route path={core}>
          <Books />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;