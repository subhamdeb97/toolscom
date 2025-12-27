import { useState } from 'react';
import { Cpu, ArrowRight, ArrowLeft } from 'lucide-react';
import ToolLayout from '../../components/Tools/ToolLayout';
import Button from '../../components/UI/Button';
import styles from '../Developer/SharedToolStyles.module.css';

const TextToBinary = () => {
    const [text, setText] = useState('');
    const [binary, setBinary] = useState('');

    const toBinary = () => {
        setBinary(text.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' '));
    };

    const toText = () => {
        setText(binary.split(' ').map(bin => String.fromCharCode(parseInt(bin, 2))).join(''));
    };

    return (
        <ToolLayout title="Text to Binary" description="Convert text to binary and vice versa." icon={Cpu}>
            <div className={styles.workspace}>
                <div className={styles.pane}>
                    <span className={styles.paneTitle} style={{ padding: '1rem' }}>Text</span>
                    <textarea className={styles.editor} value={text} onChange={e => setText(e.target.value)} />
                </div>
                <div className={styles.controls}>
                    <Button onClick={toBinary} variant="primary">To Binary <ArrowRight size={18} /></Button>
                    <Button onClick={toText} variant="secondary"><ArrowLeft size={18} /> To Text</Button>
                </div>
                <div className={styles.pane}>
                    <span className={styles.paneTitle} style={{ padding: '1rem' }}>Binary</span>
                    <textarea className={styles.editor} value={binary} onChange={e => setBinary(e.target.value)} placeholder="01001000 01100101..." />
                </div>
            </div>
        </ToolLayout>
    );
};

export default TextToBinary;
