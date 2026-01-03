import { User, History } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import ToolLayout from '../../components/Tools/ToolLayout';
import styles from '../Developer/SharedToolStyles.module.css';

const ProfilePage = () => {
    const { user, getHistory, logout } = useAuth();
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const fetchHistory = async () => {
            if (!user) return;
            try {
                const res = await fetch('/api/history', {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                if (res.ok) {
                    const data = await res.json();
                    setHistory(data);
                } else {
                    setHistory([]);
                }
            } catch (err) {
                console.error('Error fetching history:', err);
                setHistory([]);
            }
        };
        fetchHistory();
    }, [user]);

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
                    <button onClick={logout} style={{ marginTop: '1rem', padding: '0.5rem 1rem', background: 'var(--accent-primary)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                        Logout
                    </button>
                </div>

                <div className={styles.pane} style={{ padding: '2rem' }}>
                    <h3 className={styles.paneTitle} style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <History size={18} /> Recent Activity
                    </h3>
                    {history.length === 0 ? (
                        <p style={{ color: 'var(--text-secondary)' }}>No activity yet. Start using tools to see your history here.</p>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {history.slice(0, 10).map(item => (
                                <div key={item.id} style={{ padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                                    <div style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>{item.toolId}</div>
                                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                                        Input: {item.input.length > 50 ? item.input.substring(0, 50) + '...' : item.input}
                                    </div>
                                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                        Output: {item.output.length > 50 ? item.output.substring(0, 50) + '...' : item.output}
                                    </div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                                        {(() => {
                                            try {
                                                return new Date(item.createdAt).toLocaleString();
                                            } catch {
                                                return 'Unknown time';
                                            }
                                        })()}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </ToolLayout>
    );
};

export default ProfilePage;
