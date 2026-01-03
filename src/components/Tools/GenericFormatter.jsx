import { useState } from 'react';
import { FileCode, ArrowRight, Copy, Trash2, Minimize2, Maximize2 } from 'lucide-react';
import ToolLayout from './ToolLayout';
import Button from '../UI/Button';
import { useAuth } from '../../context/AuthContext';
import styles from '../../pages/Developer/SharedToolStyles.module.css';

const GenericFormatter = ({
    title,
    description,
    icon: Icon = FileCode,
    onFormat,
    onMinify,
    toolId,
    inputPlaceholder = 'Paste your code here...',
    outputPlaceholder = 'Formatted code will appear here...'
}) => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState(null);
    const { saveHistory } = useAuth();

    const handleFormat = () => {
        try {
            if (!input.trim()) return;
            const result = onFormat(input);
            setOutput(result);
            setError(null);
            if (toolId) saveHistory(toolId, input, result, { action: 'format' });
        } catch (err) {
            setError('Error formatting: ' + err.message);
        }
    };

    const handleMinify = () => {
        if (!onMinify) return;
        try {
            if (!input.trim()) return;
            const result = onMinify(input);
            setOutput(result);
            setError(null);
            if (toolId) saveHistory(toolId, input, result, { action: 'minify' });
        } catch (err) {
            setError('Error minifying: ' + err.message);
        }
    };

    const copyOutput = () => {
        if (output) navigator.clipboard.writeText(output);
    };

    return (
        <ToolLayout title={title} description={description} icon={Icon}>
            <div className={styles.workspace}>
                <div className={styles.pane}>
                    <div className={styles.paneHeader}>
                        <span className={styles.paneTitle}>Input</span>
                        <button onClick={() => setInput('')} className={styles.iconBtn}><Trash2 size={18} /></button>
                    </div>
                    <textarea
                        className={`${styles.editor} ${error ? styles.errorInput : ''}`}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={inputPlaceholder}
                        spellCheck="false"
                    />
                    {error && <div className={styles.errorMessage}>{error}</div>}
                </div>

                <div className={styles.controls}>
                    <Button onClick={handleFormat} variant="primary">
                        <Maximize2 size={18} /> Format
                    </Button>
                    {onMinify && (
                        <Button onClick={handleMinify} variant="secondary">
                            <Minimize2 size={18} /> Minify
                        </Button>
                    )}
                </div>

                <div className={styles.pane}>
                    <div className={styles.paneHeader}>
                        <span className={styles.paneTitle}>Output</span>
                        <button onClick={copyOutput} className={styles.iconBtn}><Copy size={18} /></button>
                    </div>
                    <textarea
                        className={styles.editor}
                        value={output}
                        readOnly
                        placeholder={outputPlaceholder}
                        spellCheck="false"
                    />
                </div>
            </div>
        </ToolLayout>
    );
};

export default GenericFormatter;
