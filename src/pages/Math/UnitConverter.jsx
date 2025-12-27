import { useState } from 'react';
import { Calculator } from 'lucide-react';
import ToolLayout from '../../components/Tools/ToolLayout';
import styles from '../Developer/SharedToolStyles.module.css';

const UnitConverter = () => {
    const [val, setVal] = useState(1);
    const [from, setFrom] = useState('m');
    const [to, setTo] = useState('ft');
    const [cat, setCat] = useState('length');

    const basicConfig = {
        length: {
            units: { m: 1, top: 1000, cm: 0.01, mm: 0.001, ft: 0.3048, in: 0.0254, yd: 0.9144, mi: 1609.34 },
            names: { m: 'Meters', km: 'Kilometers', cm: 'Centimeters', ft: 'Feet', in: 'Inches', mi: 'Miles' }
        },
        weight: {
            units: { kg: 1, g: 0.001, mg: 0.000001, lb: 0.453592, oz: 0.0283495 },
            names: { kg: 'Kilograms', g: 'Grams', lb: 'Pounds', oz: 'Ounces' }
        }
    };

    // Normalize to base unit then convert to target
    const result = (val * (basicConfig[cat].units[from] || 1)) / (basicConfig[cat].units[to] || 1);

    return (
        <ToolLayout title="Unit Converter" description="Convert length and weight units." icon={Calculator}>
            <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                    <button onClick={() => setCat('length')} style={{ padding: '0.5rem 1rem', background: cat === 'length' ? 'var(--accent-primary)' : 'transparent', border: '1px solid var(--border-color)', color: 'white', borderRadius: '4px' }}>Length</button>
                    <button onClick={() => setCat('weight')} style={{ padding: '0.5rem 1rem', background: cat === 'weight' ? 'var(--accent-primary)' : 'transparent', border: '1px solid var(--border-color)', color: 'white', borderRadius: '4px' }}>Weight</button>
                </div>

                <div className={styles.pane} style={{ padding: '3rem', display: 'flex', alignItems: 'center', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <input type="number" value={val} onChange={e => setVal(e.target.value)} className={styles.editor} style={{ height: 'auto', fontSize: '1.5rem', width: '150px' }} />
                        <select value={from} onChange={e => setFrom(e.target.value)} style={{ padding: '0.5rem', background: '#333', color: 'white', border: 'none' }}>
                            {Object.keys(basicConfig[cat].units).map(u => <option key={u} value={u}>{u}</option>)}
                        </select>
                    </div>

                    <div style={{ fontSize: '2rem', color: 'var(--text-secondary)' }}>=</div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div style={{ fontSize: '1.5rem', padding: '0.5rem', borderBottom: '1px solid #444', minWidth: '150px' }}>
                            {Number(result.toPrecision(6))}
                        </div>
                        <select value={to} onChange={e => setTo(e.target.value)} style={{ padding: '0.5rem', background: '#333', color: 'white', border: 'none' }}>
                            {Object.keys(basicConfig[cat].units).map(u => <option key={u} value={u}>{u}</option>)}
                        </select>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
};

export default UnitConverter;
