import React from 'react';
import './App.scss';
import { Container } from '@mui/material';
import { Router } from './Router';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <div className='App'>
        <Router></Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
