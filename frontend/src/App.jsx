import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import useIsMobile from './hooks/UseisMobile';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import BottomNav from './components/BottomNav';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ExercisesPage from './pages/ExercisesPage';
import PlansPage from './pages/PlansPage';
import ChecklistPage from './pages/ChecklistPage';
import StatsPage from './pages/StatsPage';

function ProtectedLayout({ children }) {
  const { user, loading } = useAuth();
  const isMobile = useIsMobile(768);

  if (loading) return <div className="loader" style={{marginTop: '40vh'}} />;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="app-layout">
      {isMobile ? (
        <>
          <TopBar />
          <main className="main-content animate-in">{children}</main>
          <BottomNav />
        </>
      ) : (
        <>
          <Sidebar />
          <main className="main-content animate-in">{children}</main>
        </>
      )}
    </div>
  );
}

function PublicRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="loader" style={{marginTop: '40vh'}} />;
  if (user) return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
          <Route path="/" element={<ProtectedLayout><DashboardPage /></ProtectedLayout>} />
          <Route path="/exercises" element={<ProtectedLayout><ExercisesPage /></ProtectedLayout>} />
          <Route path="/plans" element={<ProtectedLayout><PlansPage /></ProtectedLayout>} />
          <Route path="/checklist" element={<ProtectedLayout><ChecklistPage /></ProtectedLayout>} />
          <Route path="/stats" element={<ProtectedLayout><StatsPage /></ProtectedLayout>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}