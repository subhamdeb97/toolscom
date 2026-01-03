import { useState } from 'react';
import { Lock, RefreshCw, Copy } from 'lucide-react';
import ToolLayout from '../../components/Tools/ToolLayout';
import Button from '../../components/UI/Button';
import { useAuth } from '../../context/AuthContext';
import styles from '../Developer/SharedToolStyles.module.css';

const PasswordGenerator = () => {
    const [len, setLen] = useState(16);
    const [opt, setOpt] = useState({ upper: true, lower: true, num: true, sym: true });
    const [pass, setPass] = useState('');
    const { saveHistory } = useAuth();

    const generate = () => {
        const chars = {
            lower: 'abcdefghijklmnopqrstuvwxyz',
            upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            num: '0123456789',
            sym: '!@#$%^&*()_+~`|}{[]:;?><,./-='
        };
        let pool = '';
        if (opt.lower) pool += chars.lower;
        if (opt.upper) pool += chars.upper;
        if (opt.num) pool += chars.num;
        if (opt.sym) pool += chars.sym;

        if (!pool) return;

        let res = '';
        const arr = new Uint32Array(len);
        crypto.getRandomValues(arr);
        for (let i = 0; i < len; i++) {
            res += pool[arr[i] % pool.length];
        }
        setPass(res);
        saveHistory('pass-gen', JSON.stringify({ length: len, options: opt }), res);
    };

    return (
        <ToolLayout title="Password Generator" description="Create strong, secure passwords." icon={Lock}>
            <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '2rem', borderRadius: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.5rem', fontFamily: 'monospace', wordBreak: 'break-all' }}>{pass || 'Click Generate'}</span>
                    <button onClick={() => navigator.clipboard.writeText(pass)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}><Copy /></button>
                </div>

                <div style={{ display: 'grid', gap: '1rem' }}>
                    <label>Length: {len}</label>
                    <input type="range" min="8" max="64" value={len} onChange={e => setLen(Number(e.target.value))} />

                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        {Object.keys(opt).map(k => (
                            <label key={k} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', cursor: 'pointer' }}>
                                <input type="checkbox" checked={opt[k]} onChange={() => setOpt(p => ({ ...p, [k]: !p[k] }))} />
                                {k.charAt(0).toUpperCase() + k.slice(1)}
                            </label>
                        ))}
                    </div>
                </div>

                <Button onClick={generate} variant="primary" style={{ width: '100%' }}><RefreshCw /> Generate Password</Button>
            </div>
        </ToolLayout>
    );
};

export default PasswordGenerator;
