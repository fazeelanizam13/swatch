import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import './App.css';
import Home from './home';
import PickColor from './pickcolor';
import CreateColorPalette from './createcolorpalette';
import Swatches from './swatches';
import Palettes from './palettes';

function App() {
  return(
    <Router basename="/swatch">
      <Switch>
          <Route exact path="/" 
            render={
                () => <Home />
            } 
          />
          <Route exact path="/colors" 
            render={
                (props) => <Swatches {...props} />
            } 
          />
          <Route exact path="/pickcolor" 
            render={
                () => <PickColor />
            } 
          />
          <Route exact path="/createcolorpalette" 
            render={
                () => <CreateColorPalette />
            } 
          />
          <Route exact path="/palettes" 
            render={
                (props) => <Palettes {...props} />
            } 
          />
      </Switch>
    </Router>
  )
}

export default App;
