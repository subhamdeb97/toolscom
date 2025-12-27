import { useState, useEffect } from 'react';
import { Clock, Copy, RefreshCw } from 'lucide-react';
import ToolLayout from '../../components/Tools/ToolLayout';
import Button from '../../components/UI/Button';
import styles from './SharedToolStyles.module.css';

const CronGenerator = () => {
    const [mode, setMode] = useState('quick'); // quick | advanced
    const [cron, setCron] = useState('* * * * *');

    // Advanced fields
    const [fields, setFields] = useState({
        min: '*', hour: '*', dom: '*', mon: '*', dow: '*'
    });

    // Quick settings
    const [quickType, setQuickType] = useState('minute');
    const [quickTime, setQuickTime] = useState('00:00');

    useEffect(() => {
        if (mode === 'advanced') {
            setCron(`${fields.min} ${fields.hour} ${fields.dom} ${fields.mon} ${fields.dow}`);
        }
    }, [fields, mode]);

    const updateQuick = (type, time) => {
        setQuickType(type);
        setQuickTime(time);

        const [hh, mm] = time.split(':');
        let newCron = '';

        switch (type) {
            case 'minute': newCron = '* * * * *'; break;
            case 'hour': newCron = `${mm} * * * *`; break;
            case 'day': newCron = `${mm} ${hh} * * *`; break;
            case 'week': newCron = `${mm} ${hh} * * 0`; break; // Sunday
            case 'month': newCron = `${mm} ${hh} 1 * *`; break; // 1st of month
            case 'year': newCron = `${mm} ${hh} 1 1 *`; break; // Jan 1st
            default: newCron = '* * * * *';
        }
        setCron(newCron);

        // Sync to advanced fields just in case
        const parts = newCron.split(' ');
        setFields({ min: parts[0], hour: parts[1], dom: parts[2], mon: parts[3], dow: parts[4] });
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(cron);
    };

    return (
        <ToolLayout title="Cron Generator" description="Generate cron schedules easily." icon={Clock}>
            <div className={styles.workspace} style={{ flexDirection: 'column', height: 'auto', alignItems: 'center', gap: '2rem' }}>

                {/* Result Display */}
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '1rem', width: '100%', maxWidth: '800px', textAlign: 'center', border: '1px solid var(--border-color)' }}>
                    <div style={{ fontSize: '3rem', fontFamily: 'monospace', fontWeight: 'bold', color: 'var(--accent-primary)', marginBottom: '1rem', wordBreak: 'break-all' }}>
                        {cron}
                    </div>
                    <Button onClick={handleCopy} variant="primary"><Copy size={18} /> Copy to Clipboard</Button>
                </div>

                {/* Controls */}
                <div className={styles.pane} style={{ width: '100%', maxWidth: '800px', padding: '0' }}>
                    <div className={styles.paneHeader} style={{ justifyContent: 'center', gap: '1rem' }}>
                        <button onClick={() => setMode('quick')} style={{ padding: '0.5rem 1rem', background: mode === 'quick' ? 'var(--bg-tertiary)' : 'transparent', border: 'none', color: 'white', cursor: 'pointer', borderBottom: mode === 'quick' ? '2px solid var(--accent-primary)' : 'none' }}>Quick Presets</button>
                        <button onClick={() => setMode('advanced')} style={{ padding: '0.5rem 1rem', background: mode === 'advanced' ? 'var(--bg-tertiary)' : 'transparent', border: 'none', color: 'white', cursor: 'pointer', borderBottom: mode === 'advanced' ? '2px solid var(--accent-primary)' : 'none' }}>Advanced</button>
                    </div>

                    <div style={{ padding: '2rem' }}>
                        {mode === 'quick' ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
                                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                                    {[
                                        { id: 'minute', label: 'Every Minute' },
                                        { id: 'hour', label: 'Hourly' },
                                        { id: 'day', label: 'Daily' },
                                        { id: 'week', label: 'Weekly' },
                                        { id: 'month', label: 'Monthly' },
                                        { id: 'year', label: 'Yearly' }
                                    ].map(opt => (
                                        <button
                                            key={opt.id}
                                            onClick={() => updateQuick(opt.id, quickTime)}
                                            style={{
                                                padding: '0.75rem 1.5rem',
                                                background: quickType === opt.id ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
                                                border: '1px solid var(--border-color)',
                                                color: 'white',
                                                borderRadius: 'var(--radius-md)',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>

                                {quickType !== 'minute' && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <label>At Time:</label>
                                        <input
                                            type="time"
                                            value={quickTime}
                                            onChange={e => updateQuick(quickType, e.target.value)}
                                            style={{ background: '#333', border: '1px solid #555', color: 'white', padding: '0.5rem', borderRadius: '4px' }}
                                        />
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '1rem' }}>
                                {['Minute', 'Hour', 'Day (Month)', 'Month', 'Day (Week)'].map((label, idx) => {
                                    const key = ['min', 'hour', 'dom', 'mon', 'dow'][idx];
                                    return (
                                        <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                            <label style={{ fontSize: '0.8rem', color: '#888' }}>{label}</label>
                                            <input
                                                type="text"
                                                value={fields[key]}
                                                onChange={e => setFields({ ...fields, [key]: e.target.value })}
                                                className={styles.editor}
                                                style={{ height: 'auto', textAlign: 'center' }}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
};

export default CronGenerator;
