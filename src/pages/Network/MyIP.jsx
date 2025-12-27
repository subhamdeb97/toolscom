import { useState, useEffect } from 'react';
import { Globe, RefreshCw, Copy } from 'lucide-react';
import ToolLayout from '../../components/Tools/ToolLayout';
import Button from '../../components/UI/Button';
import styles from '../Developer/SharedToolStyles.module.css';

const MyIP = () => {
    const [ip, setIp] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchIP = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('https://api.ipify.org?format=json');
            if (!res.ok) throw new Error('Failed to fetch IP');
            const data = await res.json();
            setIp(data.ip);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchIP();
    }, []);

    return (
        <ToolLayout title="What Is My IP" description="Check your public IP address." icon={Globe}>
            <div className={styles.workspace} style={{ flexDirection: 'column', height: 'auto', alignItems: 'center' }}>
                <div style={{
                    background: 'rgba(255,255,255,0.05)',
                    padding: '3rem',
                    borderRadius: '1rem',
                    textAlign: 'center',
                    border: '1px solid var(--border-color)',
                    minWidth: '300px'
                }}>
                    {loading ? (
                        <div style={{ color: '#888' }}>Fetching IP...</div>
                    ) : error ? (
                        <div style={{ color: '#ef4444' }}>{error}</div>
                    ) : (
                        <>
                            <div style={{ fontSize: '0.9rem', color: '#888', marginBottom: '1rem' }}>Your Public IPv4 Address</div>
                            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--accent-primary)', marginBottom: '2rem', fontFamily: 'monospace' }}>
                                {ip}
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                                <Button onClick={() => navigator.clipboard.writeText(ip)} variant="secondary"><Copy size={16} /> Copy</Button>
                                <Button onClick={fetchIP} variant="primary"><RefreshCw size={16} /> Refresh</Button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </ToolLayout>
    );
};

export default MyIP;
