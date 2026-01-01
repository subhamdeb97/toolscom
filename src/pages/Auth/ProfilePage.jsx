import { User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import ToolLayout from '../../components/Tools/ToolLayout';
import styles from '../Developer/SharedToolStyles.module.css';

const ProfilePage = () => {
    const { user } = useAuth();

    if (!user) return <div style={{ textAlign: 'center', padding: '4rem' }}>Please log in to view profile.</div>;

    return (
        <ToolLayout title="User Profile" description="Manage your account settings." icon={User}>
            <div className={styles.workspace} style={{ flexDirection: 'column', height: 'auto', gap: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', padding: '2rem', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-lg)' }}>
                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', fontWeight: 'bold' }}>
                        {user.username.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{user.username}</h2>
                        <span style={{ padding: '4px 8px', background: 'var(--bg-tertiary)', borderRadius: '4px', fontSize: '0.8rem', color: 'var(--text-secondary)', border: '1px solid var(--border-color)' }}>
                            Standard Plan
                        </span>
                    </div>
                </div>

                <div className={styles.pane} style={{ padding: '2rem' }}>
                    <h3 className={styles.paneTitle} style={{ marginBottom: '1.5rem' }}>Account Details</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '1rem 2rem', alignItems: 'center' }}>
                        <label style={{ color: 'var(--text-secondary)' }}>Username</label>
                        <div style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>{user.username}</div>

                        <label style={{ color: 'var(--text-secondary)' }}>Status</label>
                        <div style={{ color: '#22c55e' }}>Active</div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
};

export default ProfilePage;
