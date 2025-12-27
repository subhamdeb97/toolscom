import { useState } from 'react';
import { FileCode, ArrowRight, Copy, Trash2 } from 'lucide-react';
import ToolLayout from '../../components/Tools/ToolLayout';
import Button from '../../components/UI/Button';
import styles from './SharedToolStyles.module.css';

const JsonToXml = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState(null);

    const jsonToXml = (obj) => {
        let xml = '';
        for (const prop in obj) {
            xml += obj[prop] instanceof Array
                ? obj[prop].map(sub => jsonToXml({ [prop]: sub })).join('')
                : typeof obj[prop] === 'object'
                    ? `<${prop}>${jsonToXml(obj[prop])}</${prop}>`
                    : `<${prop}>${obj[prop]}</${prop}>`;
        }
        return xml.replace(/undefined/g, '');
    }

    const convertToXml = () => {
        try {
            if (!input.trim()) return;
            const data = JSON.parse(input);
            const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<root>\n${jsonToXml(data)}\n</root>`;
            setOutput(xml);
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
            title="JSON to XML"
            description="Transform JSON objects into XML structure."
            icon={FileCode}
        >
            <div className={styles.workspace}>
                <div className={styles.pane}>
                    <div className={styles.paneHeader}>
                        <span className={styles.paneTitle}>Input JSON</span>
                        <button onClick={() => setInput('')} className={styles.iconBtn}><Trash2 size={18} /></button>
                    </div>
                    <textarea
                        className={`${styles.editor} ${error ? styles.errorInput : ''}`}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder='{"person": {"name": "John"}}'
                        spellCheck="false"
                    />
                    {error && <div className={styles.errorMessage}>{error}</div>}
                </div>

                <div className={styles.controls}>
                    <Button onClick={convertToXml} variant="primary">
                        Convert <ArrowRight size={18} />
                    </Button>
                </div>

                <div className={styles.pane}>
                    <div className={styles.paneHeader}>
                        <span className={styles.paneTitle}>XML Output</span>
                        <button onClick={copyOutput} className={styles.iconBtn}><Copy size={18} /></button>
                    </div>
                    <textarea
                        className={styles.editor}
                        value={output}
                        readOnly
                        placeholder="<root>...</root>"
                        spellCheck="false"
                    />
                </div>
            </div>
        </ToolLayout>
    );
};

export default JsonToXml;
