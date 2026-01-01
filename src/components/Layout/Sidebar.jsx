import { useNavigate } from 'react-router-dom';
import { User, LogOut, Settings, Bell, LayoutDashboard, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import styles from './Sidebar.module.css';
import Button from '../UI/Button';

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleAuthAction = () => {
    if (user) {
      logout();
    } else {
      navigate('/login');
    }
    onClose();
  };

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className={styles.overlay}
          onClick={onClose}
        />
      )}

      {/* Sidebar Drawer */}
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <div className={styles.sidebarHeader}>
          <button onClick={onClose} className={styles.closeBtn}>
            <X size={24} />
          </button>
        </div>

        {/* App Branding */}
        <div className={styles.branding} onClick={() => handleNavigation('/')}>
          <LayoutDashboard size={24} className={styles.logoIcon} />
          <span className={styles.logoText}>UtilityKit</span>
        </div>

        {/* User Profile Section */}
        <div className={styles.profileSection}>
          <div className={styles.avatar}>
            <User size={32} />
          </div>
          <div className={styles.userInfo}>
            <h3 className={styles.username}>{user ? user.username : 'Guest User'}</h3>
            <p className={styles.role}>{user ? 'Premium Member' : 'Standard Access'}</p>
          </div>
        </div>

        {user && (
          <div className={styles.stats}>
            <div className={styles.statItem}>
              <span className={styles.statValue}>12</span>
              <span className={styles.statLabel}>Saved</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>45</span>
              <span className={styles.statLabel}>Used</span>
            </div>
          </div>
        )}

        {/* Profile Actions */}
        <nav className={styles.menu}>
          {user && (
            <button className={styles.menuItem} onClick={() => handleNavigation('/profile')}>
              <User size={18} />
              <span>Profile</span>
            </button>
          )}
          <button className={styles.menuItem} onClick={() => handleNavigation('/settings')}>
            <Settings size={18} />
            <span>Settings</span>
          </button>
          <button className={styles.menuItem}>
            <Bell size={18} />
            <span>Notifications</span>
            {user && <span className={styles.badge}>2</span>}
          </button>
        </nav>

        <div className={styles.footer}>
          <Button
            variant={user ? "danger" : "primary"}
            size="sm"
            className={styles.logoutBtn}
            onClick={handleAuthAction}
          >
            {user ? <LogOut size={16} /> : <User size={16} />}
            <span>{user ? 'Sign Out' : 'Sign In'}</span>
          </Button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
