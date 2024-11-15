import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Quiz from './components/Quiz/Quiz';
import QuranPlaylist from './components/Quran/Quran'
import FeedbackButton from './components/FeedbackButton/FeedbackButton';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/quiz" component={Quiz} />
        <Route exact path="/quran-youtube" component={QuranPlaylist} />
      </Switch>
      <FeedbackButton />
    </BrowserRouter>
  );
};

export default App;
