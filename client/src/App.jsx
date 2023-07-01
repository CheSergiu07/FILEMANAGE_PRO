import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HelloWorld from './components/HelloWorld';
import Navigation from './components/Navigation';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';

class App extends React.Component {
  render() {
      return (
          <div>
              <h1>Hello, world!</h1>
              <Navigation />
              <Switch>
                  <Route path="/" exact component={Home} />
                  <Route path="/about" component={About} />
                  <Route path="/contact" component={Contact} />
                  <Route component={HelloWorld} />
              </Switch>
          </div>
      );
  }
}

export default App;
