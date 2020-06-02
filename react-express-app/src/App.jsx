import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Blank from './components/Blank/Blank';
import List from './components/List/List';
import Login from './components/Login/Login';

const App = () => {
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Blank} />
        <Route path="/List" component={List} />
        <Route path="/Login" component={Login} />
      </Switch>
      <Footer />
    </>
  );
};

export default App;
