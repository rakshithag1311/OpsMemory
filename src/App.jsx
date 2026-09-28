import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import LoadingState from './components/ui/LoadingState';

const Landing     = lazy(() => import('./pages/Landing'));
const Login       = lazy(() => import('./pages/Login'));
const Dashboard   = lazy(() => import('./pages/Dashboard'));
const Incidents   = lazy(() => import('./pages/Incidents'));
const NewIncident = lazy(() => import('./pages/NewIncident'));
const Investigation = lazy(() => import('./pages/Investigation'));
const Memory      = lazy(() => import('./pages/Memory'));
const Settings    = lazy(() => import('./pages/Settings'));

// ── Route guard: redirect to /login if not authenticated ──
function RequireAuth({ children }) {
  const location = useLocation();
  const auth = localStorage.getItem('ops_auth');
  if (!auth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Landing page — public root */}
        <Route
          path="/"
          element={
            <Suspense fallback={<LoadingState title="Loading..." />}>
              <Landing />
            </Suspense>
          }
        />

        {/* Login — public */}
        <Route
          path="/login"
          element={
            <Suspense fallback={<LoadingState title="Loading..." />}>
              <Login />
            </Suspense>
          }
        />

        {/* Protected app routes under /app */}
        <Route
          path="/app"
          element={
            <RequireAuth>
              <AppShell />
            </RequireAuth>
          }
        >
          <Route
            index
            element={
              <Suspense fallback={<LoadingState title="Loading dashboard..." />}>
                <Dashboard />
              </Suspense>
            }
          />
          <Route
            path="incidents"
            element={
              <Suspense fallback={<LoadingState title="Loading incidents..." />}>
                <Incidents />
              </Suspense>
            }
          />
          <Route
            path="incidents/new"
            element={
              <Suspense fallback={<LoadingState title="Loading incident report form..." />}>
                <NewIncident />
              </Suspense>
            }
          />
          <Route
            path="incidents/:id"
            element={
              <Suspense fallback={<LoadingState title="Querying Hindsight memory bank..." isMemory={true} />}>
                <Investigation />
              </Suspense>
            }
          />
          <Route
            path="memory"
            element={
              <Suspense fallback={<LoadingState title="Accessing Hindsight memory..." isMemory={true} />}>
                <Memory />
              </Suspense>
            }
          />
          <Route
            path="settings"
            element={
              <Suspense fallback={<LoadingState title="Loading settings..." />}>
                <Settings />
              </Suspense>
            }
          />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
