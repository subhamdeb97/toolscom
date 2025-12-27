import { useState, useEffect } from 'react';
import { Terminal, Copy } from 'lucide-react';
import ToolLayout from '../../components/Tools/ToolLayout';
import styles from '../Developer/SharedToolStyles.module.css';

const UserAgent = () => {
    const [ua, setUa] = useState('');
    const [info, setInfo] = useState({});

    useEffect(() => {
        const userAgent = navigator.userAgent;
        setUa(userAgent);

        // Simple parsing
        const getBrowser = () => {
            if (userAgent.includes("Firefox")) return "Firefox";
            if (userAgent.includes("SamsungBrowser")) return "Samsung Internet";
            if (userAgent.includes("Opera") || userAgent.includes("OPR")) return "Opera";
            if (userAgent.includes("Trident")) return "Internet Explorer";
            if (userAgent.includes("Edge")) return "Edge";
            if (userAgent.includes("Chrome")) return "Chrome";
            if (userAgent.includes("Safari")) return "Safari";
            return "Unknown";
        };

        const getOS = () => {
            if (userAgent.indexOf("Win") !== -1) return "Windows";
            if (userAgent.indexOf("Mac") !== -1) return "MacOS";
            if (userAgent.indexOf("Linux") !== -1) return "Linux";
            if (userAgent.indexOf("Android") !== -1) return "Android";
            if (userAgent.indexOf("like Mac") !== -1) return "iOS";
            return "Unknown";
        };

        setInfo({
            browser: getBrowser(),
            os: getOS(),
            platform: navigator.platform,
            language: navigator.language
        });
    }, []);

    return (
        <ToolLayout title="User Agent" description="View and parse your User Agent string." icon={Terminal}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div className={styles.pane} style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span className={styles.paneTitle}>Raw User Agent String</span>
                        <button onClick={() => navigator.clipboard.writeText(ua)} className={styles.iconBtn}><Copy size={16} /></button>
                    </div>
                    <div style={{ fontFamily: 'monospace', wordBreak: 'break-all', fontSize: '1.1rem', color: '#ddd', background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '4px' }}>
                        {ua}
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                    {Object.entries(info).map(([k, v]) => (
                        <div key={k} className={styles.pane} style={{ padding: '1.5rem', textAlign: 'center' }}>
                            <div style={{ color: '#888', textTransform: 'uppercase', fontSize: '0.8rem', marginBottom: '0.5rem' }}>{k}</div>
                            <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{v}</div>
                        </div>
                    ))}
                </div>
            </div>
        </ToolLayout>
    );
};

export default UserAgent;
