import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { BookDetails } from './BookDetails/BookDetails';
import { Books } from './Books/Books';


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/card/:id">
          <BookDetails />
        </Route>
        <Route path="/">
          <Books />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;