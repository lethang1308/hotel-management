import React from 'react';
import { ROUTES } from '@/constants/routes';
import { Home } from '@/pages/Home';
import { Login } from '@/pages/Login';
import { Forbidden } from '@/pages/Forbidden';
import { NotFound } from '@/pages/NotFound';

import SignupPage from '@/pages/staynest/signup';
import ForgotPasswordPage from '@/pages/staynest/forgot-password';
import ResetPasswordPage from '@/pages/staynest/reset-password';
import SearchPage from '@/pages/staynest/search';
import HotelDetailsPage from '@/pages/staynest/hotels.$hotelId';
import WishlistPage from '@/pages/staynest/wishlist';
import PaymentSuccessPage from '@/pages/staynest/payments.success';
import PaymentFailurePage from '@/pages/staynest/payments.failure';

/**
 * Public routes accessible without authentication
 */
export const publicRoutes = [
  {
    path: ROUTES.HOME,
    element: <Home />,
  },
  {
    path: ROUTES.LOGIN,
    element: <Login />,
  },
  {
    path: ROUTES.AUTH,
    element: <Login />,
  },
  {
    path: ROUTES.SIGNUP,
    element: <SignupPage />,
  },
  {
    path: '/register',
    element: <SignupPage />,
  },
  {
    path: ROUTES.FORGOT_PASSWORD,
    element: <ForgotPasswordPage />,
  },
  {
    path: ROUTES.RESET_PASSWORD,
    element: <ResetPasswordPage />,
  },
  {
    path: ROUTES.SEARCH,
    element: <SearchPage />,
  },
  {
    path: ROUTES.HOTEL_DETAIL,
    element: <HotelDetailsPage />,
  },
  {
    path: ROUTES.WISHLIST,
    element: <WishlistPage />,
  },
  {
    path: ROUTES.PAYMENT_SUCCESS,
    element: <PaymentSuccessPage />,
  },
  {
    path: ROUTES.PAYMENT_FAILURE,
    element: <PaymentFailurePage />,
  },
  {
    path: ROUTES.FORBIDDEN,
    element: <Forbidden />,
  },
  {
    path: ROUTES.NOT_FOUND,
    element: <NotFound />,
  },
];

export default publicRoutes;
