import { useState } from 'react';
import { FileCode, ArrowRight, Copy, Trash2 } from 'lucide-react';
import ToolLayout from '../../components/Tools/ToolLayout';
import Button from '../../components/UI/Button';
import styles from './SharedToolStyles.module.css';

const JsonToCsv = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState(null);

    const convertToCsv = () => {
        try {
            if (!input.trim()) return;
            const data = JSON.parse(input);

            const items = Array.isArray(data) ? data : [data];
            if (items.length === 0) throw new Error('Empty JSON array');

            // Get headers
            const headers = Object.keys(items[0]);

            // Create CSV rows
            const rows = items.map(item => {
                return headers.map(header => {
                    const val = item[header] ?? '';
                    return `"${String(val).replace(/"/g, '""')}"`;
                }).join(',');
            });

            setOutput([headers.join(','), ...rows].join('\n'));
            setError(null);
        } catch (err) {
            setError('Invalid JSON: ' + err.message);
            setOutput('');
        }
    };

    const copyOutput = () => {
        if (output) navigator.clipboard.writeText(output);
    };

    return (
        <ToolLayout
            title="JSON to CSV"
            description="Convert JSON arrays to CSV format instantly."
            icon={FileCode}
        >
            <div className={styles.workspace}>
                <div className={styles.pane}>
                    <div className={styles.paneHeader}>
                        <span className={styles.paneTitle}>Input JSON (Array)</span>
                        <button onClick={() => setInput('')} className={styles.iconBtn}><Trash2 size={18} /></button>
                    </div>
                    <textarea
                        className={`${styles.editor} ${error ? styles.errorInput : ''}`}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder='[{"name": "John", "age": 30}, {"name": "Jane", "age": 25}]'
                        spellCheck="false"
                    />
                    {error && <div className={styles.errorMessage}>{error}</div>}
                </div>

                <div className={styles.controls}>
                    <Button onClick={convertToCsv} variant="primary">
                        Convert <ArrowRight size={18} />
                    </Button>
                </div>

                <div className={styles.pane}>
                    <div className={styles.paneHeader}>
                        <span className={styles.paneTitle}>CSV Output</span>
                        <button onClick={copyOutput} className={styles.iconBtn}><Copy size={18} /></button>
                    </div>
                    <textarea
                        className={styles.editor}
                        value={output}
                        readOnly
                        placeholder="Resulting CSV..."
                        spellCheck="false"
                    />
                </div>
            </div>
        </ToolLayout>
    );
};

export default JsonToCsv;
