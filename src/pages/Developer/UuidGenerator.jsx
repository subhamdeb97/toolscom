import { useState } from 'react';
import { Shuffle, Copy, RefreshCw } from 'lucide-react';
import ToolLayout from '../../components/Tools/ToolLayout';
import Button from '../../components/UI/Button';
import { useAuth } from '../../context/AuthContext';
import styles from './SharedToolStyles.module.css';

const UuidGenerator = () => {
    const [uuids, setUuids] = useState([]);
    const [count, setCount] = useState(1);
    const { saveHistory } = useAuth();

    const generateUuid = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };

    const generate = () => {
        const newUuids = Array(Number(count)).fill(0).map(generateUuid);
        setUuids(newUuids);
        saveHistory('uuid-gen', count.toString(), newUuids.join('\n'));
    };

    return (
        <ToolLayout
            title="UUID Generator"
            description="Generate version-4 UUIDs / GUIDs."
            icon={Shuffle}
        >
            <div className={styles.workspace} style={{ flexDirection: 'column', height: 'auto', gap: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <label>How many?</label>
                    <input
                        type="number"
                        min="1"
                        max="50"
                        value={count}
                        onChange={(e) => setCount(e.target.value)}
                        style={{
                            background: 'var(--bg-tertiary)',
                            border: '1px solid var(--border-color)',
                            color: 'white',
                            padding: '0.5rem',
                            borderRadius: '4px',
                            width: '80px'
                        }}
                    />
                    <Button onClick={generate} variant="primary">
                        <RefreshCw size={18} /> Generate
                    </Button>
                </div>

                <div className={styles.pane}>
                    <div className={styles.paneHeader}>
                        <span className={styles.paneTitle}>Generated UUIDs</span>
                        <button
                            onClick={() => navigator.clipboard.writeText(uuids.join('\n'))}
                            className={styles.iconBtn}
                        >
                            <Copy size={18} />
                        </button>
                    </div>
                    <textarea
                        className={styles.editor}
                        value={uuids.join('\n')}
                        readOnly
                        style={{ minHeight: '300px' }}
                    />
                </div>
            </div>
        </ToolLayout>
    );
};

export default UuidGenerator;
