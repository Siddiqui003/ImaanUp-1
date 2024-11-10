import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Quiz from './components/Quiz/Quiz';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/quiz" component={Quiz} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
