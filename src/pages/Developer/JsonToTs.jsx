import { useState } from 'react';
import { Code, ArrowRight, Copy, Trash2 } from 'lucide-react';
import ToolLayout from '../../components/Tools/ToolLayout';
import Button from '../../components/UI/Button';
import styles from './SharedToolStyles.module.css';

const JsonToTs = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState(null);

    const inferType = (value) => {
        if (value === null) return 'any';
        if (Array.isArray(value)) {
            if (value.length === 0) return 'any[]';
            return `${inferType(value[0])}[]`;
        }
        if (typeof value === 'object') return 'Theme';
        return typeof value;
    };

    const generateInterface = (json, name = 'RootObject') => {
        if (typeof json !== 'object' || json === null) return '';

        let result = `interface ${name} {\n`;
        const pendingIntefaces = [];

        Object.entries(json).forEach(([key, value]) => {
            let type = typeof value;
            if (value === null) type = 'any';
            else if (Array.isArray(value)) {
                if (value.length > 0 && typeof value[0] === 'object') {
                    const subName = key.charAt(0).toUpperCase() + key.slice(1) + 'Item';
                    pendingIntefaces.push([value[0], subName]);
                    type = `${subName}[]`;
                } else {
                    type = `${inferType(value[0])}[]`;
                }
            } else if (typeof value === 'object') {
                const subName = key.charAt(0).toUpperCase() + key.slice(1);
                pendingIntefaces.push([value, subName]);
                type = subName;
            }

            result += `  ${key}: ${type};\n`;
        });

        result += '}\n\n';

        pendingIntefaces.forEach(([obj, title]) => {
            result += generateInterface(obj, title);
        });

        return result;
    };

    const convertToTs = () => {
        try {
            if (!input.trim()) return;
            const data = JSON.parse(input);
            const tsInfo = generateInterface(data);
            setOutput(tsInfo);
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
            title="JSON to TypeScript"
            description="Generate TypeScript interfaces from your JSON data."
            icon={Code}
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
                        placeholder='{"id": 1, "settings": {"isActive": true}}'
                        spellCheck="false"
                    />
                    {error && <div className={styles.errorMessage}>{error}</div>}
                </div>

                <div className={styles.controls}>
                    <Button onClick={convertToTs} variant="primary">
                        Generate <ArrowRight size={18} />
                    </Button>
                </div>

                <div className={styles.pane}>
                    <div className={styles.paneHeader}>
                        <span className={styles.paneTitle}>Typescript Interfaces</span>
                        <button onClick={copyOutput} className={styles.iconBtn}><Copy size={18} /></button>
                    </div>
                    <textarea
                        className={styles.editor}
                        value={output}
                        readOnly
                        placeholder="interface RootObject { ... }"
                        spellCheck="false"
                    />
                </div>
            </div>
        </ToolLayout>
    );
};

export default JsonToTs;
