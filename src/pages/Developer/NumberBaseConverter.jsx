import { useState } from 'react';
import { Hash } from 'lucide-react';
import ToolLayout from '../../components/Tools/ToolLayout';
import Button from '../../components/UI/Button';
import { useAuth } from '../../context/AuthContext';
import styles from '../Developer/SharedToolStyles.module.css';

const NumberBaseConverter = () => {
    const [input, setInput] = useState('');
    const [fromBase, setFromBase] = useState('10');
    const [toBase, setToBase] = useState('16');
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');
    const { saveHistory } = useAuth();

    const convert = () => {
        if (!input.trim()) return;
        try {
            // Convert from input base to decimal first
            const decimal = parseInt(input, parseInt(fromBase));
            if (isNaN(decimal)) throw new Error('Invalid number for the given base');

            // Convert decimal to target base
            const result = decimal.toString(parseInt(toBase));
            setOutput(result.toUpperCase());
            setError('');
            saveHistory('number-base-converter', `${input} (base ${fromBase})`, `${result} (base ${toBase})`);
        } catch (err) {
            setError(err.message);
            setOutput('');
        }
    };

    return (
        <ToolLayout title="Number Base Converter" description="Convert numbers between different bases (binary, decimal, hex, etc.)." icon={Hash}>
            <div className={styles.workspace} style={{ flexDirection: 'column', height: 'auto', gap: '2rem' }}>
                <div className={styles.pane}>
                    <div className={styles.paneHeader}>
                        <span className={styles.paneTitle}>Input Number</span>
                    </div>
                    <textarea
                        className={`${styles.editor} ${error ? styles.errorInput : ''}`}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Enter number to convert..."
                        spellCheck="false"
                    />
                    {error && <div className={styles.errorMessage}>{error}</div>}
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>From Base</label>
                        <select
                            value={fromBase}
                            onChange={(e) => setFromBase(e.target.value)}
                            style={{
                                background: 'var(--bg-tertiary)',
                                border: '1px solid var(--border-color)',
                                color: 'var(--text-primary)',
                                padding: '0.5rem',
                                borderRadius: '4px',
                                minWidth: '100px'
                            }}
                        >
                            <option value="2">Binary (2)</option>
                            <option value="8">Octal (8)</option>
                            <option value="10">Decimal (10)</option>
                            <option value="16">Hexadecimal (16)</option>
                        </select>
                    </div>

                    <div style={{ fontSize: '1.5rem', color: 'var(--text-secondary)' }}>→</div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>To Base</label>
                        <select
                            value={toBase}
                            onChange={(e) => setToBase(e.target.value)}
                            style={{
                                background: 'var(--bg-tertiary)',
                                border: '1px solid var(--border-color)',
                                color: 'var(--text-primary)',
                                padding: '0.5rem',
                                borderRadius: '4px',
                                minWidth: '100px'
                            }}
                        >
                            <option value="2">Binary (2)</option>
                            <option value="8">Octal (8)</option>
                            <option value="10">Decimal (10)</option>
                            <option value="16">Hexadecimal (16)</option>
                        </select>
                    </div>

                    <Button onClick={convert} variant="primary" style={{ alignSelf: 'flex-end' }}>
                        Convert
                    </Button>
                </div>

                {output && (
                    <div className={styles.pane}>
                        <div className={styles.paneHeader}>
                            <span className={styles.paneTitle}>Output</span>
                        </div>
                        <textarea
                            className={styles.editor}
                            value={output}
                            readOnly
                            placeholder="Converted number will appear here..."
                            spellCheck="false"
                        />
                    </div>
                )}
            </div>
        </ToolLayout>
    );
};

export default NumberBaseConverter;