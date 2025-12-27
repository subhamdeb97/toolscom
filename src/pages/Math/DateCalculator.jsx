import { useState } from 'react';
import { Calendar } from 'lucide-react';
import ToolLayout from '../../components/Tools/ToolLayout';
import Button from '../../components/UI/Button';
import styles from '../Developer/SharedToolStyles.module.css';

const DateCalculator = () => {
    const [mode, setMode] = useState('diff'); // diff | add
    const [d1, setD1] = useState('');
    const [d2, setD2] = useState('');
    const [days, setDays] = useState(0);
    const [result, setResult] = useState('');

    const calculate = () => {
        if (mode === 'diff') {
            if (!d1 || !d2) return;
            const t1 = new Date(d1).getTime();
            const t2 = new Date(d2).getTime();
            const diff = Math.abs(t2 - t1);
            const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
            setResult(`${diffDays} days`);
        } else {
            if (!d1) return;
            const t = new Date(d1);
            t.setDate(t.getDate() + Number(days));
            setResult(t.toDateString());
        }
    };

    return (
        <ToolLayout title="Date Calculator" description="Calculate difference between dates or add duration." icon={Calendar}>
            <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <Button onClick={() => setMode('diff')} variant={mode === 'diff' ? 'primary' : 'secondary'}>Date Difference</Button>
                    <Button onClick={() => setMode('add')} variant={mode === 'add' ? 'primary' : 'secondary'}>Add/Subtract Days</Button>
                </div>

                <div className={styles.pane} style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
                        <label>Start Date</label>
                        <input type="date" value={d1} onChange={e => setD1(e.target.value)} className={styles.editor} style={{ height: 'auto' }} />

                        {mode === 'diff' ? (
                            <>
                                <label>End Date</label>
                                <input type="date" value={d2} onChange={e => setD2(e.target.value)} className={styles.editor} style={{ height: 'auto' }} />
                            </>
                        ) : (
                            <>
                                <label>Days to Add (negative to subtract)</label>
                                <input type="number" value={days} onChange={e => setDays(e.target.value)} className={styles.editor} style={{ height: 'auto' }} placeholder="e.g. 30" />
                            </>
                        )}

                        <Button onClick={calculate} variant="primary">Calculate</Button>
                    </div>

                    {result && <div style={{ fontSize: '2rem', color: 'var(--accent-primary)', fontWeight: 'bold' }}>{result}</div>}
                </div>
            </div>
        </ToolLayout>
    );
};

export default DateCalculator;
