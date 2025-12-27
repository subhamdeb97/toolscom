import { useState } from 'react';
import { Type, RefreshCw, Copy } from 'lucide-react';
import ToolLayout from '../../components/Tools/ToolLayout';
import Button from '../../components/UI/Button';
import styles from '../Developer/SharedToolStyles.module.css';

const TEXT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const LoremIpsum = () => {
    const [paras, setParas] = useState(3);
    const [output, setOutput] = useState('');

    const generate = () => {
        const arr = [];
        for (let i = 0; i < paras; i++) {
            // Randomly slice the text to make it look slightly different (pseudo-random)
            const start = Math.floor(Math.random() * 50);
            arr.push(TEXT.substring(start) + " " + TEXT.substring(0, start));
        }
        setOutput(arr.join('\n\n'));
    };

    return (
        <ToolLayout title="Lorem Ipsum" description="Generate placeholder text." icon={Type}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <input
                        type="number"
                        min="1" max="50"
                        value={paras}
                        onChange={e => setParas(e.target.value)}
                        style={{ background: '#333', border: 'none', color: 'white', padding: '0.5rem', borderRadius: '4px', width: '80px' }}
                    />
                    <label>Paragraphs</label>
                    <Button onClick={generate} variant="primary"><RefreshCw size={18} /> Generate</Button>
                </div>
                <div className={styles.pane} style={{ height: '400px' }}>
                    <div className={styles.paneHeader}>
                        <span className={styles.paneTitle}>Output</span>
                        <button onClick={() => navigator.clipboard.writeText(output)} className={styles.iconBtn}><Copy size={18} /></button>
                    </div>
                    <textarea className={styles.editor} value={output} readOnly />
                </div>
            </div>
        </ToolLayout>
    );
};

export default LoremIpsum;
