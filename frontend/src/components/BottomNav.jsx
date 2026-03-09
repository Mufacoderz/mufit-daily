import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Dumbbell, CalendarCheck, ClipboardList, BarChart3 } from 'lucide-react';

const navItems = [
    { to: '/', icon: LayoutDashboard, label: 'Home', end: true },
    { to: '/exercises', icon: Dumbbell, label: 'Exercises' },
    { to: '/plans', icon: CalendarCheck, label: 'Plans' },
    { to: '/checklist', icon: ClipboardList, label: 'Checklist' },
    { to: '/stats', icon: BarChart3, label: 'Stats' },
];

export default function BottomNav() {
    return (
        <nav className="bottom-nav">
            <div className="bottom-nav-inner">
                {navItems.map(({ to, icon: Icon, label, end }) => (
                    <NavLink
                        key={to}
                        to={to}
                        end={end}
                        className={({ isActive }) => `bnav-item ${isActive ? 'active' : ''}`}
                    >
                        {({ isActive }) => (
                            <>
                                <div className="bnav-icon-wrap">
                                    {isActive && <div className="bnav-glow" />}
                                    <Icon size={22} className="bnav-icon" />
                                </div>
                                <span className="bnav-label">{label}</span>
                            </>
                        )}
                    </NavLink>
                ))}
            </div>
        </nav>
    );
}