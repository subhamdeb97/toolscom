import { LayoutDashboard, User, Sun, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import styles from './Navbar.module.css';

const Navbar = ({ onOpenProfile }) => {
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className={styles.navbar}>
            <div className={styles.brand} onClick={() => navigate('/')}>
                <LayoutDashboard size={24} className={styles.logoIcon} />
                <span className={styles.logoText}>UtilityKit</span>
            </div>

            <div className={styles.actions}>
                <button
                    className={styles.profileBtn}
                    onClick={toggleTheme}
                    aria-label="Toggle Theme"
                    style={{ marginRight: '0.5rem' }}
                >
                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                <button
                    className={styles.profileBtn}
                    onClick={onOpenProfile}
                    aria-label="Open Profile"
                >
                    <div className={styles.avatar}>
                        <User size={20} />
                    </div>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
