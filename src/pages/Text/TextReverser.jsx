import { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import ToolLayout from '../../components/Tools/ToolLayout';
import Button from '../../components/UI/Button';
import { useAuth } from '../../context/AuthContext';
import styles from '../Developer/SharedToolStyles.module.css';

const TextReverser = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const { saveHistory } = useAuth();

    const reverseText = () => {
        if (!input.trim()) return;
        const reversed = input.split('').reverse().join('');
        setOutput(reversed);
        saveHistory('text-reverser', input, reversed);
    };

    const reverseWords = () => {
        if (!input.trim()) return;
        const reversed = input.split(' ').reverse().join(' ');
        setOutput(reversed);
        saveHistory('text-reverser', input, reversed, { type: 'words' });
    };

    return (
        <ToolLayout title="Text Reverser" description="Reverse text characters or word order." icon={RotateCcw}>
            <div className={styles.workspace} style={{ flexDirection: 'column', height: 'auto', gap: '2rem' }}>
                <div className={styles.pane}>
                    <div className={styles.paneHeader}>
                        <span className={styles.paneTitle}>Input Text</span>
                    </div>
                    <textarea
                        className={styles.editor}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Enter text to reverse..."
                        spellCheck="false"
                    />
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                    <Button onClick={reverseText} variant="primary">
                        Reverse Characters
                    </Button>
                    <Button onClick={reverseWords} variant="secondary">
                        Reverse Words
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
                            placeholder="Reversed text will appear here..."
                            spellCheck="false"
                        />
                    </div>
                )}
            </div>
        </ToolLayout>
    );
};

export default TextReverser;