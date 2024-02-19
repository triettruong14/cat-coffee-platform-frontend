import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { CoffeeShopDetail, Register, Search, SignIn } from './pages';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppLayout } from './components/Layout';
import { AppHeader } from './components/Header';
import { SignInSuccess } from './components/SignInSuccess';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/signin',
    element: <SignIn />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/search',
    element: (
      <AppLayout header={<AppHeader />}>
        <Search />
      </AppLayout>
    ),
  },
  {
    path: '/coffee-shop/:id',
    element: (
      <AppLayout header={<AppHeader />}>
        <CoffeeShopDetail />
      </AppLayout>
    ),
  },
  {
    path: 'signin-success',
    element: <SignInSuccess />,
  },
]);
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#ee4d2d',
            colorFillSecondary: '#0288d1',
          },
        }}
      >
        <ToastContainer />
        <RouterProvider router={router} />
      </ConfigProvider>
    </React.StrictMode>
  </Provider>,
);
