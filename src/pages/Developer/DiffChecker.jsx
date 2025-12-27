import { useState } from 'react';
import { Activity, Play } from 'lucide-react';
import ToolLayout from '../../components/Tools/ToolLayout';
import Button from '../../components/UI/Button';
import styles from './SharedToolStyles.module.css';

const DiffChecker = () => {
    const [original, setOriginal] = useState('');
    const [modified, setModified] = useState('');
    const [diffResult, setDiffResult] = useState(null);

    const compare = () => {
        // Simple line-by-line comparison
        const origLines = original.split('\n');
        const modLines = modified.split('\n');
        const maxLines = Math.max(origLines.length, modLines.length);

        const result = [];
        for (let i = 0; i < maxLines; i++) {
            const o = origLines[i] || '';
            const m = modLines[i] || '';
            if (o !== m) {
                result.push({ line: i + 1, type: 'diff', o, m });
            } else {
                result.push({ line: i + 1, type: 'same', val: o });
            }
        }
        setDiffResult(result);
    };

    return (
        <ToolLayout
            title="Diff Checker"
            description="Compare two text blocks and see the differences."
            icon={Activity}
        >
            <div className={styles.workspace}>
                <div className={styles.pane}>
                    <div className={styles.paneHeader}>
                        <span className={styles.paneTitle}>Original Text</span>
                    </div>
                    <textarea
                        className={styles.editor}
                        value={original}
                        onChange={(e) => setOriginal(e.target.value)}
                        placeholder="Paste original text..."
                        spellCheck="false"
                    />
                </div>

                <div className={styles.pane}>
                    <div className={styles.paneHeader}>
                        <span className={styles.paneTitle}>Modified Text</span>
                    </div>
                    <textarea
                        className={styles.editor}
                        value={modified}
                        onChange={(e) => setModified(e.target.value)}
                        placeholder="Paste modified text..."
                        spellCheck="false"
                    />
                </div>
            </div>

            <div style={{ margin: '1rem 0' }}>
                <Button onClick={compare} variant="primary">
                    <Play size={18} /> Compare
                </Button>
            </div>

            {diffResult && (
                <div className={styles.pane} style={{ marginTop: '1rem', minHeight: 'auto' }}>
                    <div className={styles.paneHeader}>
                        <span className={styles.paneTitle}>Comparison Result</span>
                    </div>
                    <div style={{ padding: '1rem', fontFamily: 'monospace', fontSize: '0.9rem', overflowX: 'auto' }}>
                        {diffResult.map((row, idx) => (
                            <div key={idx} style={{
                                display: 'flex',
                                backgroundColor: row.type === 'diff' ? 'rgba(239, 68, 68, 0.1)' : 'transparent',
                                padding: '2px 0'
                            }}>
                                <span style={{ width: '40px', color: '#666', userSelect: 'none' }}>{row.line}</span>
                                {row.type === 'diff' ? (
                                    <div style={{ display: 'flex', width: '100%' }}>
                                        <span style={{ width: '50%', color: '#ef4444', paddingRight: '1rem' }}>- {row.o}</span>
                                        <span style={{ width: '50%', color: '#22c55e' }}>+ {row.m}</span>
                                    </div>
                                ) : (
                                    <span style={{ color: '#aaa' }}>  {row.val}</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </ToolLayout>
    );
};

export default DiffChecker;
