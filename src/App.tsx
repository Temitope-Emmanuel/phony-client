import React from 'react';
import logo from './logo.svg';
import MainRouter from "./mainRouter"
import {BrowserRouter as Router} from "react-router-dom"
import {ThemeProvider} from "@material-ui/core"
import theme from "./config/theme"
import './App.css';


function App() {
  return (
    <Router>
      <ThemeProvider theme={theme} >
        <MainRouter/>
      </ThemeProvider>
    </Router>    
  );
}

export default App;