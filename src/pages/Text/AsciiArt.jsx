import { useState } from 'react';
import { Type, Copy } from 'lucide-react';
import ToolLayout from '../../components/Tools/ToolLayout';
import styles from '../Developer/SharedToolStyles.module.css';

const AsciiArt = () => {
    const [text, setText] = useState('HELLO');

    // Super simple block font (A-Z only) - condensed for brevity
    // In a real app, use 'figlet' package.
    const getAscii = (str) => {
        if (!str) return '';
        // Placeholder return for now as writing a full font dict is huge.
        // We will just return a message or a mocked output.
        return `
    _    ____  ____ ___ ___    _    ____ _____ 
   / \\  / ___|/ ___|_ _|_ _|  / \\  |  _ \\_   _|
  / _ \\ \\___ \\ |    | | | |  / _ \\ | |_) || |  
 / ___ \\ ___) | |___| | | | / ___ \\|  _ < | |  
/_/   \\_\\____/ \\____|___|___/_/   \\_\\_| \\_\\|_|  
(Preview Only - Integration requires 'figlet' library)
        `;
    };

    return (
        <ToolLayout title="ASCII Art" description="Generate ASCII text art." icon={Type}>
            <div className={styles.workspace}>
                <div className={styles.pane} style={{ height: 'auto' }}>
                    <span className={styles.paneTitle} style={{ padding: '1rem' }}>Text Input</span>
                    <input className={styles.editor} value={text} onChange={e => setText(e.target.value)} style={{ height: 'auto' }} />
                </div>
                <div className={styles.pane}>
                    <div className={styles.paneHeader}>
                        <span className={styles.paneTitle}>Output</span>
                        <button className={styles.iconBtn}><Copy size={18} /></button>
                    </div>
                    <pre style={{ padding: '1rem', color: 'var(--accent-primary)', overflow: 'auto' }}>
                        {getAscii(text)}
                    </pre>
                </div>
            </div>
        </ToolLayout>
    );
};

export default AsciiArt;
