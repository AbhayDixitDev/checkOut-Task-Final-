# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## React + Vite + Redux

This template is an extension of the above template and adds the following features:

- Redux for state management
- React-Redux for connecting React components to the Redux store
- Redux-Thunk for handling asynchronous actions
- Redux-Logger for logging Redux actions and state changes

### How to use

1. Clone the repository
2. Run `npm install`
3. Run `npm run dev`
4. Open your browser at http://localhost:3000

### How to use Redux

1. Create a new reducer by adding a new file in the `src/reducers` directory
2. Create a new action by adding a new file in the `src/actions` directory
3. Connect your React component to the Redux store using the `connect` function from `react-redux`
4. Dispatch an action using the `dispatch` function from `react-redux`
5. Use the `useSelector` hook from `react-redux` to access the state of the Redux store in your React component

### How to use Redux-Thunk

1. Create a new thunk by adding a new function in the `src/actions` directory
2. The thunk should return a function that takes in the dispatch function and any other arguments
3. The inner function should dispatch an action using the `dispatch` function
4. Use the thunk in your React component by calling the thunk function and passing in the dispatch function as an argument

### How to use Redux-Logger

1. Add the Redux-Logger middleware to your Redux store by adding the following line of code to your `src/store.js` file: `const store = createStore(reducer, applyMiddleware(logger))`
2. The logger will now log all Redux actions and state changes to the console

### How to use React-Redux

1. Connect your React component to the Redux store using the `connect` function from `react-redux`
2. Use the `useSelector` hook from `react-redux` to access the state of the Redux store in your React component

### How to use Stripe

1. Sign up for a Stripe account and get an API key
2. Add the Stripe API key to your `.env` file
3. Use the `useStripe` hook from `@stripe/react-stripe-js` to get a reference to the Stripe object
4. Use the Stripe object to create a payment intent and get a client secret
5. Use the client secret to create a payment form using the `CardElement` component from `@stripe/react-stripe-js`

### How to use Bootstrap

1. Install Bootstrap using npm or yarn
2. Import Bootstrap in your React component using the following line of code: `import 'bootstrap/dist/css/bootstrap.min.css';`
3. Use Bootstrap classes in your React component to style your HTML elements

### How to use React-Bootstrap

1. Install React-Bootstrap using npm or yarn
2. Import React-Bootstrap in your React component using the following line of code: `import { Container, Row, Col, Card, OverlayTrigger, Tooltip, Button, Image, Modal, ListGroup } from 'react-bootstrap';`
3. Use React-Bootstrap components in your React component to style your HTML elements

### How to use React-Router-Dom

1. Install React-Router-Dom using npm or yarn
2. Import React-Router-Dom in your React component using the following line of code: `import { BrowserRouter, Routes, Route } from "react-router-dom";`
3. Use the `BrowserRouter` component to wrap your React app
4. Use the `Routes` and `Route` components to define routes for your React app
5. Use the `Link` component to create links between routes

### How to use React-Icons

1. Install React-Icons using npm or yarn
2. Import React-Icons in your React component using the following line of code: `import { FaHome, FaLaptop, FaMobileAlt, FaShoppingCart } from "react-icons/fa";`
3. Use React-Icons in your React component to add icons to your HTML elements
