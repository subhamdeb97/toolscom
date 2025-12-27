import { useNavigate } from 'react-router-dom';
import { User, LogOut, Settings, Bell, LayoutDashboard, X } from 'lucide-react';
import styles from './Sidebar.module.css';
import Button from '../UI/Button';

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

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
        <div className={styles.branding} onClick={() => {
          navigate('/');
          onClose();
        }}>
          <LayoutDashboard size={24} className={styles.logoIcon} />
          <span className={styles.logoText}>UtilityKit</span>
        </div>

        {/* User Profile Section */}
        <div className={styles.profileSection}>
          <div className={styles.avatar}>
            <User size={32} />
          </div>
          <div className={styles.userInfo}>
            <h3 className={styles.username}>John Doe</h3>
            <p className={styles.role}>Premium Member</p>
          </div>
        </div>

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

        {/* Profile Actions */}
        <nav className={styles.menu}>
          <button className={styles.menuItem}>
            <User size={18} />
            <span>Profile Settings</span>
          </button>
          <button className={styles.menuItem}>
            <Bell size={18} />
            <span>Notifications</span>
            <span className={styles.badge}>2</span>
          </button>
          <button className={styles.menuItem}>
            <Settings size={18} />
            <span>Preferences</span>
          </button>
        </nav>

        <div className={styles.footer}>
          <Button variant="danger" size="sm" className={styles.logoutBtn}>
            <LogOut size={16} />
            <span>Sign Out</span>
          </Button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
