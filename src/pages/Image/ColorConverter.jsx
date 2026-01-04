import { useState } from 'react';
import { Palette } from 'lucide-react';
import ToolLayout from '../../components/Tools/ToolLayout';
import Button from '../../components/UI/Button';
import { useAuth } from '../../context/AuthContext';
import styles from '../Developer/SharedToolStyles.module.css';

const ColorConverter = () => {
    const [input, setInput] = useState('#ff0000');
    const [format, setFormat] = useState('hex');
    const [output, setOutput] = useState({});
    const { saveHistory } = useAuth();

    const hexToRgb = (hex) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    };

    const rgbToHex = (r, g, b) => {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    };

    const rgbToHsl = (r, g, b) => {
        r /= 255;
        g /= 255;
        b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        return {
            h: Math.round(h * 360),
            s: Math.round(s * 100),
            l: Math.round(l * 100)
        };
    };

    const convert = () => {
        if (!input.trim()) return;
        let rgb, hex, hsl;

        try {
            if (format === 'hex') {
                rgb = hexToRgb(input);
                if (!rgb) throw new Error('Invalid hex color');
                hex = input.startsWith('#') ? input : '#' + input;
                hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
            } else if (format === 'rgb') {
                const match = input.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/i);
                if (!match) throw new Error('Invalid RGB format. Use: rgb(r,g,b)');
                rgb = { r: parseInt(match[1]), g: parseInt(match[2]), b: parseInt(match[3]) };
                hex = rgbToHex(rgb.r, rgb.g, rgb.b);
                hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
            } else if (format === 'hsl') {
                const match = input.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/i);
                if (!match) throw new Error('Invalid HSL format. Use: hsl(h,s%,l%)');
                hsl = { h: parseInt(match[1]), s: parseInt(match[2]), l: parseInt(match[3]) };
                // Convert HSL to RGB (simplified)
                const h = hsl.h / 360;
                const s = hsl.s / 100;
                const l = hsl.l / 100;
                const c = (1 - Math.abs(2 * l - 1)) * s;
                const x = c * (1 - Math.abs((h * 6) % 2 - 1));
                const m = l - c / 2;
                let r, g, b;
                if (0 <= h && h < 1/6) { r = c; g = x; b = 0; }
                else if (1/6 <= h && h < 2/6) { r = x; g = c; b = 0; }
                else if (2/6 <= h && h < 3/6) { r = 0; g = c; b = x; }
                else if (3/6 <= h && h < 4/6) { r = 0; g = x; b = c; }
                else if (4/6 <= h && h < 5/6) { r = x; g = 0; b = c; }
                else { r = c; g = 0; b = x; }
                rgb = { r: Math.round((r + m) * 255), g: Math.round((g + m) * 255), b: Math.round((b + m) * 255) };
                hex = rgbToHex(rgb.r, rgb.g, rgb.b);
            }

            setOutput({ hex, rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` });
            saveHistory('color-converter', input, JSON.stringify({ hex, rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` }), { format });
        } catch (err) {
            setOutput({ error: err.message });
        }
    };

    return (
        <ToolLayout title="Color Converter" description="Convert between HEX, RGB, and HSL color formats." icon={Palette}>
            <div className={styles.workspace} style={{ flexDirection: 'column', height: 'auto', gap: '2rem' }}>
                <div className={styles.pane}>
                    <div className={styles.paneHeader}>
                        <span className={styles.paneTitle}>Input Color</span>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
                        <select
                            value={format}
                            onChange={(e) => setFormat(e.target.value)}
                            style={{
                                background: 'var(--bg-tertiary)',
                                border: '1px solid var(--border-color)',
                                color: 'var(--text-primary)',
                                padding: '0.5rem',
                                borderRadius: '4px'
                            }}
                        >
                            <option value="hex">HEX (#ff0000)</option>
                            <option value="rgb">RGB (rgb(255,0,0))</option>
                            <option value="hsl">HSL (hsl(0,100%,50%))</option>
                        </select>
                    </div>
                    <textarea
                        className={styles.editor}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={`Enter color in ${format.toUpperCase()} format...`}
                        spellCheck="false"
                    />
                </div>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button onClick={convert} variant="primary">
                        Convert
                    </Button>
                </div>

                {output.hex && (
                    <div className={styles.pane}>
                        <div className={styles.paneHeader}>
                            <span className={styles.paneTitle}>Converted Formats</span>
                        </div>
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ width: '50px', height: '30px', background: output.hex, border: '1px solid var(--border-color)', borderRadius: '4px' }}></div>
                                <div>
                                    <strong>HEX:</strong> {output.hex}
                                </div>
                            </div>
                            <div><strong>RGB:</strong> {output.rgb}</div>
                            <div><strong>HSL:</strong> {output.hsl}</div>
                        </div>
                    </div>
                )}

                {output.error && (
                    <div className={styles.pane}>
                        <div className={styles.paneHeader}>
                            <span className={styles.paneTitle}>Error</span>
                        </div>
                        <div style={{ color: 'var(--accent-primary)' }}>{output.error}</div>
                    </div>
                )}
            </div>
        </ToolLayout>
    );
};

export default ColorConverter;