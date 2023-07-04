import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { colors, createTheme, ThemeProvider } from '@mui/material';
import App from './App';

const theme = createTheme({
  palette: {
    primary: {
      main: colors.green[200]
    },
    secondary: {
      main: '#E3AFBC'
    }
  }
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </React.StrictMode>
);
