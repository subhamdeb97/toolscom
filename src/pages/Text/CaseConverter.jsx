import { useState } from 'react';
import { Type, ArrowRight, Copy, Trash2 } from 'lucide-react';
import ToolLayout from '../../components/Tools/ToolLayout';
import Button from '../../components/UI/Button';
import styles from '../Developer/SharedToolStyles.module.css';

const CaseConverter = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const transform = (type) => {
        if (!input) return;
        let res = '';
        switch (type) {
            case 'upper': res = input.toUpperCase(); break;
            case 'lower': res = input.toLowerCase(); break;
            case 'title': res = input.toLowerCase().replace(/(?:^|\s)\w/g, a => a.toUpperCase()); break;
            case 'camel':
                res = input.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
                    index === 0 ? word.toLowerCase() : word.toUpperCase()
                ).replace(/\s+/g, '');
                break;
            case 'snake': res = input.toLowerCase().replace(/\s+/g, '_'); break;
            case 'kebab': res = input.toLowerCase().replace(/\s+/g, '-'); break;
            default: res = input;
        }
        setOutput(res);
    };

    return (
        <ToolLayout title="Case Converter" description="Convert text case styles." icon={Type}>
            <div className={styles.workspace}>
                <div className={styles.pane}>
                    <div className={styles.paneHeader}>
                        <span className={styles.paneTitle}>Input Text</span>
                        <button onClick={() => setInput('')} className={styles.iconBtn}><Trash2 size={18} /></button>
                    </div>
                    <textarea className={styles.editor} value={input} onChange={e => setInput(e.target.value)} placeholder="Type something..." />
                </div>

                <div className={`${styles.controls} ${styles.gridControls}`}>
                    <Button onClick={() => transform('upper')} variant="secondary">UPPERCASE</Button>
                    <Button onClick={() => transform('lower')} variant="secondary">lowercase</Button>
                    <Button onClick={() => transform('title')} variant="secondary">Title Case</Button>
                    <Button onClick={() => transform('camel')} variant="secondary">camelCase</Button>
                    <Button onClick={() => transform('snake')} variant="secondary">snake_case</Button>
                    <Button onClick={() => transform('kebab')} variant="secondary">kebab-case</Button>
                </div>

                <div className={styles.pane}>
                    <div className={styles.paneHeader}>
                        <span className={styles.paneTitle}>Result</span>
                        <button onClick={() => navigator.clipboard.writeText(output)} className={styles.iconBtn}><Copy size={18} /></button>
                    </div>
                    <textarea className={styles.editor} value={output} readOnly placeholder="Result..." />
                </div>
            </div>
        </ToolLayout>
    );
};

export default CaseConverter;
