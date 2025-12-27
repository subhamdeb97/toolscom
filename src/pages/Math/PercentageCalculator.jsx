import { useState, useMemo } from 'react';
import { Calculator } from 'lucide-react';
import ToolLayout from '../../components/Tools/ToolLayout';
import styles from '../Developer/SharedToolStyles.module.css';

const PercentageCalculator = () => {
    const [screen, setScreen] = useState('of'); // of, is, change
    const [val1, setVal1] = useState('');
    const [val2, setVal2] = useState('');

    const result = useMemo(() => {
        const v1 = parseFloat(val1);
        const v2 = parseFloat(val2);
        if (isNaN(v1) || isNaN(v2)) return '-';

        if (screen === 'of') return (v1 / 100) * v2;
        if (screen === 'is') return (v1 / v2) * 100;
        if (screen === 'change') return ((v2 - v1) / v1) * 100;
        return '-';
    }, [val1, val2, screen]);

    return (
        <ToolLayout title="Percentage Calculator" description="Calculate percentages easily." icon={Calculator}>
            <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <button onClick={() => setScreen('of')} style={{ padding: '0.5rem', background: screen === 'of' ? 'var(--accent-primary)' : 'transparent', border: '1px solid #444', color: 'white', borderRadius: '4px' }}>% of value</button>
                    <button onClick={() => setScreen('is')} style={{ padding: '0.5rem', background: screen === 'is' ? 'var(--accent-primary)' : 'transparent', border: '1px solid #444', color: 'white', borderRadius: '4px' }}>What % is</button>
                    <button onClick={() => setScreen('change')} style={{ padding: '0.5rem', background: screen === 'change' ? 'var(--accent-primary)' : 'transparent', border: '1px solid #444', color: 'white', borderRadius: '4px' }}>% Change</button>
                </div>

                <div className={styles.pane} style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {screen === 'of' && <>
                            <span>What is</span>
                            <input type="number" value={val1} onChange={e => setVal1(e.target.value)} style={{ width: '80px', padding: '0.5rem' }} placeholder="10" />
                            <span>% of</span>
                            <input type="number" value={val2} onChange={e => setVal2(e.target.value)} style={{ width: '80px', padding: '0.5rem' }} placeholder="500" />
                        </>}

                        {screen === 'is' && <>
                            <input type="number" value={val1} onChange={e => setVal1(e.target.value)} style={{ width: '80px', padding: '0.5rem' }} placeholder="25" />
                            <span>is what % of</span>
                            <input type="number" value={val2} onChange={e => setVal2(e.target.value)} style={{ width: '80px', padding: '0.5rem' }} placeholder="100" />
                        </>}

                        {screen === 'change' && <>
                            <span>From</span>
                            <input type="number" value={val1} onChange={e => setVal1(e.target.value)} style={{ width: '80px', padding: '0.5rem' }} placeholder="10" />
                            <span>to</span>
                            <input type="number" value={val2} onChange={e => setVal2(e.target.value)} style={{ width: '80px', padding: '0.5rem' }} placeholder="20" />
                        </>}
                    </div>

                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent-primary)' }}>
                        {result !== '-' ? Number(result).toFixed(2) + '%' : '-'}
                        {screen === 'of' && result !== '-' ? '' : '' /* Remove % for 'of'? No result is number */}
                        {/* Fix logic display */}
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
};

export default PercentageCalculator;
