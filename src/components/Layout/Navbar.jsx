import { LayoutDashboard, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = ({ onOpenProfile }) => {
    const navigate = useNavigate();

    return (
        <nav className={styles.navbar}>
            <div className={styles.brand} onClick={() => navigate('/')}>
                <LayoutDashboard size={24} className={styles.logoIcon} />
                <span className={styles.logoText}>UtilityKit</span>
            </div>

            <div className={styles.actions}>
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
