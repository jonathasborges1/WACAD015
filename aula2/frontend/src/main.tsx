import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { Provider } from 'react-redux'
// import { store } from "./redux/store.aula1.ts";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { persistor, store } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";

import Login from './components/Login/index.tsx'

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/home", element: <App /> },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* <Provider store={store}>
      <App />
    </Provider> */}
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
  </React.StrictMode>,
)
