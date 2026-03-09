import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogOut } from 'lucide-react';

const titles = {
    '/': 'Dashboard',
    '/exercises': 'Exercises',
    '/plans': 'Workout Plans',
    '/checklist': 'Daily Checklist',
    '/stats': 'Statistics',
};

export default function TopBar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => { logout(); navigate('/login'); };
    const title = titles[location.pathname] || 'DailyFit';

    return (
        <header className="topbar">
            <div className="topbar-left">
                <div className="topbar-logo">DAILY<span>FIT</span></div>
                <div className="topbar-divider" />
                <div className="topbar-page">{title}</div>
            </div>
            <div className="topbar-right">
                <div className="topbar-user">
                    <div className="topbar-avatar">{user?.name?.[0]?.toUpperCase()}</div>
                    <span className="topbar-name">{user?.name}</span>
                </div>
                <button className="topbar-logout" onClick={handleLogout} title="Sign out">
                    <LogOut size={16} />
                </button>
            </div>
        </header>
    );
}