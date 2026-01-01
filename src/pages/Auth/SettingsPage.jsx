import { useState } from 'react';
import { Settings, Moon, Sun, Trash2, Shield, Bell } from 'lucide-react';
import ToolLayout from '../../components/Tools/ToolLayout';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/UI/Button';
import styles from '../Developer/SharedToolStyles.module.css';

const SettingsPage = () => {
    const { theme, toggleTheme } = useTheme();
    const { user, logout } = useAuth();
    const [notifications, setNotifications] = useState(true);

    const SettingSection = ({ title, children }) => (
        <div style={{ paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--text-primary)' }}>{title}</h3>
            {children}
        </div>
    );

    const SettingRow = ({ icon: Icon, label, description, action }) => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 0' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ padding: '8px', background: 'var(--bg-tertiary)', borderRadius: '8px', color: 'var(--text-secondary)' }}>
                    <Icon size={20} />
                </div>
                <div>
                    <div style={{ fontWeight: '500', color: 'var(--text-primary)', marginBottom: '4px' }}>{label}</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{description}</div>
                </div>
            </div>
            <div>{action}</div>
        </div>
    );

    return (
        <ToolLayout title="Settings" description="Customize your experience." icon={Settings}>
            <div className={styles.workspace} style={{ flexDirection: 'column', height: 'auto', padding: '0', background: 'transparent', border: 'none' }}>
                <div className={styles.pane} style={{ padding: '2rem' }}>

                    <SettingSection title="Appearance">
                        <SettingRow
                            icon={theme === 'dark' ? Moon : Sun}
                            label="Theme Mode"
                            description={`Currently using ${theme} mode`}
                            action={
                                <Button variant="secondary" onClick={toggleTheme}>
                                    Switch to {theme === 'dark' ? 'Light' : 'Dark'}
                                </Button>
                            }
                        />
                    </SettingSection>

                    <SettingSection title="Notifications">
                        <SettingRow
                            icon={Bell}
                            label="Email Notifications"
                            description="Receive updates and alerts."
                            action={
                                <div
                                    onClick={() => setNotifications(!notifications)}
                                    style={{
                                        width: '48px', height: '24px', background: notifications ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
                                        borderRadius: '12px', position: 'relative', cursor: 'pointer', transition: '0.3s'
                                    }}
                                >
                                    <div style={{
                                        width: '20px', height: '20px', background: 'white', borderRadius: '50%',
                                        position: 'absolute', top: '2px', left: notifications ? '26px' : '2px', transition: '0.3s'
                                    }} />
                                </div>
                            }
                        />
                    </SettingSection>

                    {user && (
                        <SettingSection title="Account">
                            <SettingRow
                                icon={Shield}
                                label="Change Password"
                                description="Update your security credentials."
                                action={<Button variant="secondary" disabled>Edit</Button>}
                            />
                            <SettingRow
                                icon={Trash2}
                                label="Clear History"
                                description="Delete all your saved tool iterations."
                                action={<Button variant="danger">Clear All</Button>}
                            />
                        </SettingSection>
                    )}

                </div>
            </div>
        </ToolLayout>
    );
};

export default SettingsPage;
