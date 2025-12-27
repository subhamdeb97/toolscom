import { useState } from 'react';
import { FileJson, Copy, Trash2, Minimize2, Maximize2 } from 'lucide-react';
import ToolLayout from '../../components/Tools/ToolLayout';
import Button from '../../components/UI/Button';
import styles from './SharedToolStyles.module.css';

const JsonFormatter = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState(null);

    const formatJson = () => {
        try {
            if (!input.trim()) return;
            const parsed = JSON.parse(input);
            setOutput(JSON.stringify(parsed, null, 2));
            setError(null);
        } catch (err) {
            setError('Invalid JSON: ' + err.message);
            setOutput('');
        }
    };

    const minifyJson = () => {
        try {
            if (!input.trim()) return;
            const parsed = JSON.parse(input);
            setOutput(JSON.stringify(parsed));
            setError(null);
        } catch (err) {
            setError('Invalid JSON: ' + err.message);
            setOutput('');
        }
    };

    const clearAll = () => {
        setInput('');
        setOutput('');
        setError(null);
    };

    const copyOutput = () => {
        if (output) {
            navigator.clipboard.writeText(output);
            // Optional: Add toast notification here
        }
    };

    return (
        <ToolLayout
            title="JSON Formatter"
            description="Format, validate, and minify your JSON data."
            icon={FileJson}
        >
            <div className={styles.workspace}>
                <div className={styles.pane}>
                    <div className={styles.paneHeader}>
                        <span className={styles.paneTitle}>Input JSON</span>
                        <div className={styles.paneActions}>
                            <button onClick={clearAll} className={styles.iconBtn} title="Clear">
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                    <textarea
                        className={`${styles.editor} ${error ? styles.errorInput : ''}`}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Paste your JSON here..."
                        spellCheck="false"
                    />
                    {error && <div className={styles.errorMessage}>{error}</div>}
                </div>

                <div className={styles.controls}>
                    <Button onClick={formatJson} variant="primary">
                        <Maximize2 size={18} /> Format
                    </Button>
                    <Button onClick={minifyJson} variant="secondary">
                        <Minimize2 size={18} /> Minify
                    </Button>
                </div>

                <div className={styles.pane}>
                    <div className={styles.paneHeader}>
                        <span className={styles.paneTitle}>Output</span>
                        <div className={styles.paneActions}>
                            <button onClick={copyOutput} className={styles.iconBtn} title="Copy">
                                <Copy size={18} />
                            </button>
                        </div>
                    </div>
                    <textarea
                        className={styles.editor}
                        value={output}
                        readOnly
                        placeholder="Formatted output will appear here..."
                        spellCheck="false"
                    />
                </div>
            </div>
        </ToolLayout>
    );
};

export default JsonFormatter;
