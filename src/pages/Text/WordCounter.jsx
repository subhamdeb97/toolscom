import { useState, useMemo } from 'react';
import { AlignLeft, Trash2 } from 'lucide-react';
import ToolLayout from '../../components/Tools/ToolLayout';
import styles from '../Developer/SharedToolStyles.module.css';

const WordCounter = () => {
    const [input, setInput] = useState('');

    const stats = useMemo(() => {
        const text = input.trim();
        if (!text) return { words: 0, chars: 0, charsNoSpace: 0, lines: 0, paragraphs: 0 };
        return {
            words: text.split(/\s+/).length,
            chars: input.length,
            charsNoSpace: input.replace(/\s/g, '').length,
            lines: input.split(/\n/).length,
            paragraphs: text.split(/\n\n+/).length
        };
    }, [input]);

    return (
        <ToolLayout title="Word Counter" description="Count words, characters, and lines." icon={AlignLeft}>
            <div className={styles.workspace} style={{ flexDirection: 'column', height: 'auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1rem', width: '100%' }}>
                    {Object.entries(stats).map(([key, val]) => (
                        <div key={key} style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
                            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent-primary)' }}>{val}</div>
                            <div style={{ textTransform: 'uppercase', fontSize: '0.75rem', color: '#888' }}>{key.replace(/([A-Z])/g, ' $1')}</div>
                        </div>
                    ))}
                </div>

                <div className={styles.pane} style={{ minHeight: '400px' }}>
                    <div className={styles.paneHeader}>
                        <span className={styles.paneTitle}>Input Text</span>
                        <button onClick={() => setInput('')} className={styles.iconBtn}><Trash2 size={18} /></button>
                    </div>
                    <textarea
                        className={styles.editor}
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder="Start typing or paste text here..."
                    />
                </div>
            </div>
        </ToolLayout>
    );
};

export default WordCounter;
