import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider, Routes } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { CoffeeShopDetail, Home, Register, Search, SignIn } from './pages';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppLayout } from './components/Layout';
import { AppHeader } from './components/Header';
import { SignInSuccess } from './components/SignInSuccess';
import { Protected } from './components/ProtectedRoute';
import { BookingHistory } from './pages/BookingHistory/booking-history.page';
import { Staff } from './pages/Staff/staff.page';
import { BookingDetail } from './pages/BookingDetail/booking-detail.page';
import { ShopManagement } from './pages/ShopManagement/shop-management.page';
import { RegisterShop } from './pages/RegisterShop/register-shop.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AppLayout header={<AppHeader />}>
        <Home />
      </AppLayout>
    ),
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
    element: (
      <Protected>
        <AppLayout header={<AppHeader />}>
          <SignInSuccess />
        </AppLayout>
      </Protected>
    ),
  },
  {
    path: '/booking-history',
    element: (
      <Protected>
        <AppLayout header={<AppHeader />}>
          <BookingHistory />
        </AppLayout>
      </Protected>
    ),
  },
  {
    path: '/booking-history/detail/:id',
    element: (
      <Protected>
        <AppLayout header={<AppHeader />}>
          <BookingDetail />
        </AppLayout>
      </Protected>
    ),
  },
  {
    path: '/staff',
    element: (
      <Protected>
        <Staff />
      </Protected>
    ),
  },
  {
    path: '/shop-management',
    element: (
      <Protected>
        <AppLayout header={<AppHeader />}>
          <ShopManagement />
        </AppLayout>
      </Protected>
    ),
  },
  // {
  //   path: '/register-shop',
  //   element: <RegisterShop />,
  // },
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
