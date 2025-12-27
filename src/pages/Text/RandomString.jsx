import { useState } from 'react';
import { Shuffle, RefreshCw, Copy } from 'lucide-react';
import ToolLayout from '../../components/Tools/ToolLayout';
import Button from '../../components/UI/Button';
import styles from '../Developer/SharedToolStyles.module.css';

const RandomString = () => {
    const [len, setLen] = useState(32);
    const [result, setResult] = useState('');

    const generate = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let res = '';
        for (let i = 0; i < len; i++) res += chars.charAt(Math.floor(Math.random() * chars.length));
        setResult(res);
    };

    return (
        <ToolLayout title="Random String" description="Generate random alphanumeric strings." icon={Shuffle}>
            <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <label>Length</label>
                    <input type="number" value={len} onChange={e => setLen(e.target.value)} style={{ background: '#333', border: 'none', color: 'white', padding: '0.5rem', borderRadius: '4px' }} />
                    <Button onClick={generate} variant="primary"><RefreshCw /> Generate</Button>
                </div>

                <div className={styles.pane} style={{ padding: '2rem' }}>
                    <div style={{ wordBreak: 'break-all', fontSize: '1.2rem', fontFamily: 'monospace', marginBottom: '1rem' }}>
                        {result}
                    </div>
                    {result && <Button onClick={() => navigator.clipboard.writeText(result)} variant="secondary" size="sm"><Copy size={16} /> Copy</Button>}
                </div>
            </div>
        </ToolLayout>
    );
};

export default RandomString;
