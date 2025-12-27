import { useState } from 'react';
import { Image, Copy, Upload } from 'lucide-react';
import ToolLayout from '../../components/Tools/ToolLayout';
import Button from '../../components/UI/Button';
import styles from '../Developer/SharedToolStyles.module.css';

const ImageToBase64 = () => {
    const [b64, setB64] = useState('');

    const handleFile = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => setB64(ev.target.result);
        reader.readAsDataURL(file);
    };

    return (
        <ToolLayout title="Image to Base64" description="Convert images to Base64 strings." icon={Image}>
            <div className={styles.workspace} style={{ flexDirection: 'column', height: 'auto', gap: '2rem' }}>
                <div style={{ textAlign: 'center' }}>
                    <input type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} id="upB64" />
                    <label htmlFor="upB64" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#333', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', cursor: 'pointer' }}>
                        <Upload size={18} /> Select Image
                    </label>
                </div>

                {b64 && (
                    <div className={styles.pane}>
                        <div className={styles.paneHeader}>
                            <span className={styles.paneTitle}>Base64 String</span>
                            <button onClick={() => navigator.clipboard.writeText(b64)} className={styles.iconBtn}><Copy size={18} /></button>
                        </div>
                        <textarea className={styles.editor} value={b64} readOnly style={{ minHeight: '300px' }} />
                    </div>
                )}
            </div>
        </ToolLayout>
    );
};

export default ImageToBase64;
