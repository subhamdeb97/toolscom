import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import ToolLayout from '../../components/Tools/ToolLayout';
import styles from './SharedToolStyles.module.css';

const TimestampConverter = () => {
    const [now, setNow] = useState(Math.floor(Date.now() / 1000));
    const [input, setInput] = useState('');
    const [result, setResult] = useState(null);

    useEffect(() => {
        const timer = setInterval(() => setNow(Math.floor(Date.now() / 1000)), 1000);
        return () => clearInterval(timer);
    }, []);

    const convert = (val) => {
        setInput(val);
        if (!val) {
            setResult(null);
            return;
        }

        // Check if ms or s
        let ts = Number(val);
        if (isNaN(ts)) {
            setResult('Invalid timestamp');
            return;
        }

        // Guess if it's seconds or millis
        // If < 10000000000 it's likely seconds (valid until year 2286)
        const isSeconds = ts < 10000000000;
        const date = new Date(isSeconds ? ts * 1000 : ts);

        setResult({
            iso: date.toISOString(),
            local: date.toLocaleString(),
            utc: date.toUTCString(),
            relative: isSeconds ? 'Seconds' : 'Milliseconds'
        });
    };

    return (
        <ToolLayout title="Timestamp Converter" description="Convert Unix timestamps to human dates." icon={Clock}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div className={styles.pane} style={{ padding: '1.5rem' }}>
                    <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Current Unix Timestamp</p>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--accent-primary)' }}>{now}</h2>
                    </div>
                </div>

                <div className={styles.pane} style={{ padding: '2rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Enter Timestamp</label>
                    <input
                        type="text"
                        className={styles.editor}
                        style={{ height: 'auto', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}
                        value={input}
                        onChange={(e) => convert(e.target.value)}
                        placeholder="e.g. 1672531200"
                    />

                    {result && typeof result === 'object' && (
                        <div style={{ marginTop: '2rem', display: 'grid', gap: '1rem', gridTemplateColumns: 'auto 1fr' }}>
                            <div style={{ color: 'var(--text-secondary)' }}>Format:</div>
                            <div>{result.relative} detected</div>

                            <div style={{ color: 'var(--text-secondary)' }}>UTC:</div>
                            <div style={{ fontFamily: 'monospace' }}>{result.utc}</div>

                            <div style={{ color: 'var(--text-secondary)' }}>ISO 8601:</div>
                            <div style={{ fontFamily: 'monospace' }}>{result.iso}</div>

                            <div style={{ color: 'var(--text-secondary)' }}>Local:</div>
                            <div style={{ fontFamily: 'monospace' }}>{result.local}</div>
                        </div>
                    )}
                </div>
            </div>
        </ToolLayout>
    );
};

export default TimestampConverter;
