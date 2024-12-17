import React from 'react';
import { createRoot } from 'react-dom/client';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Provider } from 'react-redux';
import store from './store.jsx';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const root = createRoot(document.getElementById('root'));
root.render(  
    <Provider store={store}>
        <Elements stripe={stripePromise}>
            <App />
        </Elements>
    </Provider>
);


