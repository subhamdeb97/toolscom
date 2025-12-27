import { useState } from 'react';
import { Hash, Copy } from 'lucide-react';
import ToolLayout from '../../components/Tools/ToolLayout';
import styles from '../Developer/SharedToolStyles.module.css';

const HashGenerator = () => {
    const [text, setText] = useState('');
    const [hashes, setHashes] = useState({ sha1: '', sha256: '', sha384: '', sha512: '' });

    const updateHashes = async (val) => {
        setText(val);
        if (!val) { setHashes({ sha1: '', sha256: '', sha384: '', sha512: '' }); return; }

        const encode = new TextEncoder().encode(val);
        const algos = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'];
        const res = {};

        for (const algo of algos) {
            const buf = await crypto.subtle.digest(algo, encode);
            const arr = Array.from(new Uint8Array(buf));
            res[algo.toLowerCase().replace('-', '')] = arr.map(b => b.toString(16).padStart(2, '0')).join('');
        }
        setHashes(res);
    };

    return (
        <ToolLayout title="Hash Generator" description="Generate SHA hashes for any text." icon={Hash}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div className={styles.pane}>
                    <span className={styles.paneTitle} style={{ padding: '1rem' }}>Input Text</span>
                    <textarea className={styles.editor} value={text} onChange={e => updateHashes(e.target.value)} style={{ height: '100px' }} />
                </div>

                <div style={{ display: 'grid', gap: '1rem' }}>
                    {Object.entries(hashes).map(([algo, hash]) => (
                        <div key={algo} className={styles.pane} style={{ padding: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>{algo}</span>
                                <button onClick={() => navigator.clipboard.writeText(hash)} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}><Copy size={16} /></button>
                            </div>
                            <div style={{ fontFamily: 'monospace', wordBreak: 'break-all', color: 'var(--accent-primary)' }}>{hash || '...'}</div>
                        </div>
                    ))}
                </div>
            </div>
        </ToolLayout>
    );
};

export default HashGenerator;
