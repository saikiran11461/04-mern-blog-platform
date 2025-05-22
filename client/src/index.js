import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { BrowserRouter } from 'react-router-dom';

// MUI Setup
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'; 

const theme = createTheme({
  primary: {
    light: '#757ce8',
    main: '#3f50b5',
    dark: '#002884',
    contrastText: '#fff',
  },
  secondary: {
    light: '#ff7961',
    main: '#f44336',
    dark: '#ba000d',
    contrastText: '#000',
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline /> 
          <App />
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();