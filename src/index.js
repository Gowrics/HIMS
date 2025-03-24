import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { FormProvider } from './Context/FormProvider';
import { UserProvider } from './Context/UserProvider';
import { InvoiceProvider } from './Context/InvoiceProvider';
import { AdvanceInvoiceContext } from './Context/Context';
import { AdvInvProvider } from './Context/AdvInvProvider';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <UserProvider>
      <FormProvider>
        <InvoiceProvider>
          <AdvInvProvider>
            <App />
          </AdvInvProvider>
        </InvoiceProvider>
      </FormProvider>
    </UserProvider>
  </Provider>
);
