import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './sass/App.scss';
import NavBar from './NavBar';
import Footer from './Footer';
import Home from './Home';
import About from './pages/About';
import Instructions from './pages/Instructions'
import Game from './pages/Game'
import Comments from './pages/Comments'

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>      
      <Router>
        <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/About" element={<About />} />
            <Route path="/Game" element={<Game />} />
            <Route path="/Instructions" element={<Instructions />} />
            <Route path="/Comments" element={<Comments />} />
          </Routes>
          <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App
