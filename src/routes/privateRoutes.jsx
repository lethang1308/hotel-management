import React from 'react';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { ProtectedRoute } from './ProtectedRoute';
import { Dashboard } from '@/pages/Dashboard';

import CheckoutPage from '@/pages/staynest/checkout.$bookingId';
import BookingsIndexPage from '@/pages/staynest/bookings.index';
import BookingDetailsPage from '@/pages/staynest/bookings.$bookingId';
import GuestsPage from '@/pages/staynest/guests';
import ProfilePage from '@/pages/staynest/profile';

import ManageLayout from '@/pages/staynest/manage';
import ManageHotelsIndex from '@/pages/staynest/manage.hotels.index';
import ManageHotelsNew from '@/pages/staynest/manage.hotels.new';
import ManageHotelDetail from '@/pages/staynest/manage.hotels.$hotelId';
import ManageBookings from '@/pages/staynest/manage.bookings';
import ManageRefunds from '@/pages/staynest/manage.refunds';
import ManageReports from '@/pages/staynest/manage.reports';
import ManageSettings from '@/pages/staynest/manage.settings';

/**
 * Private / Protected routes requiring authentication
 */
export const privateRoutes = [
  {
    path: ROUTES.DASHBOARD,
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.CHECKOUT,
    element: (
      <ProtectedRoute>
        <CheckoutPage />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.BOOKINGS,
    element: (
      <ProtectedRoute>
        <BookingsIndexPage />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.BOOKING_DETAIL,
    element: (
      <ProtectedRoute>
        <BookingDetailsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.GUESTS,
    element: (
      <ProtectedRoute>
        <GuestsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.PROFILE,
    element: (
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.MANAGE,
    element: <ManageLayout />,
    children: [
      { index: true, element: <Navigate to="/manage/hotels" replace /> },
      { path: 'hotels', element: <ManageHotelsIndex /> },
      { path: 'hotels/new', element: <ManageHotelsNew /> },
      { path: 'hotels/:hotelId', element: <ManageHotelDetail /> },
      { path: 'bookings', element: <ManageBookings /> },
      { path: 'refunds', element: <ManageRefunds /> },
      { path: 'reports', element: <ManageReports /> },
      { path: 'settings', element: <ManageSettings /> },
    ],
  },
];

export default privateRoutes;
