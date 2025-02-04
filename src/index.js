import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { FormProvider } from './FormProvider';
import { UserProvider } from './UserProvider'; // Make sure this path is correct
import { Provider } from 'react-redux';
import store from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <FormProvider>
    <UserProvider>
      <App />
    </UserProvider>
  </FormProvider>
  </Provider>
);
