import { useState } from 'react';
import { Image, Copy } from 'lucide-react';
import ToolLayout from '../../components/Tools/ToolLayout';
import styles from '../Developer/SharedToolStyles.module.css';

const ColorPicker = () => {
    const [color, setColor] = useState('#6366f1');

    const hexToRgb = (hex) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return { r, g, b };
    };

    const { r, g, b } = hexToRgb(color);

    return (
        <ToolLayout title="Color Picker" description="Pick colors and get conversion codes." icon={Image}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
                <div style={{ position: 'relative', width: '200px', height: '200px', borderRadius: '50%', overflow: 'hidden', border: '4px solid var(--border-color)', boxShadow: `0 0 50px ${color}40` }}>
                    <input
                        type="color"
                        value={color}
                        onChange={e => setColor(e.target.value)}
                        style={{ position: 'absolute', top: '-10%', left: '-10%', width: '120%', height: '120%', cursor: 'pointer', border: 'none', padding: 0 }}
                    />
                </div>

                <div style={{ display: 'grid', width: '100%', maxWidth: '600px', gap: '1rem' }}>
                    {[
                        { label: 'HEX', val: color },
                        { label: 'RGB', val: `rgb(${r}, ${g}, ${b})` },
                        { label: 'CSS', val: `background-color: ${color};` }
                    ].map(item => (
                        <div key={item.label} className={styles.pane} style={{ padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ fontWeight: 'bold', width: '60px' }}>{item.label}</span>
                            <span style={{ fontFamily: 'monospace', color: 'var(--accent-primary)' }}>{item.val}</span>
                            <button onClick={() => navigator.clipboard.writeText(item.val)} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}><Copy size={16} /></button>
                        </div>
                    ))}
                </div>
            </div>
        </ToolLayout>
    );
};

export default ColorPicker;
