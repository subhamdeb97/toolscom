import { useState } from 'react';
import { Image, Download } from 'lucide-react';
import ToolLayout from '../../components/Tools/ToolLayout';
import Button from '../../components/UI/Button';
import { useAuth } from '../../context/AuthContext';
import styles from '../Developer/SharedToolStyles.module.css';

const Base64ToImage = () => {
    const [input, setInput] = useState('');
    const [imageSrc, setImageSrc] = useState('');
    const [error, setError] = useState('');
    const { saveHistory } = useAuth();

    const convertToImage = () => {
        if (!input.trim()) return;
        try {
            // Check if it's a data URL
            if (input.startsWith('data:image/')) {
                setImageSrc(input);
                setError('');
                saveHistory('base64-to-image', input, 'Image displayed', { type: 'data-url' });
            } else {
                // Assume it's base64, try to create data URL
                // This is a simple check, in reality might need to detect format
                const dataUrl = `data:image/png;base64,${input}`;
                setImageSrc(dataUrl);
                setError('');
                saveHistory('base64-to-image', input, 'Image displayed', { type: 'base64' });
            }
        } catch (err) {
            setError('Invalid Base64 or data URL');
            setImageSrc('');
        }
    };

    const downloadImage = () => {
        if (!imageSrc) return;
        const link = document.createElement('a');
        link.href = imageSrc;
        link.download = 'converted-image.png';
        link.click();
    };

    return (
        <ToolLayout title="Base64 to Image" description="Convert Base64 strings or data URLs to images." icon={Image}>
            <div className={styles.workspace} style={{ flexDirection: 'column', height: 'auto', gap: '2rem' }}>
                <div className={styles.pane}>
                    <div className={styles.paneHeader}>
                        <span className={styles.paneTitle}>Base64 Input</span>
                    </div>
                    <textarea
                        className={`${styles.editor} ${error ? styles.errorInput : ''}`}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Paste your Base64 string or data URL here..."
                        spellCheck="false"
                    />
                    {error && <div className={styles.errorMessage}>{error}</div>}
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                    <Button onClick={convertToImage} variant="primary">
                        Convert to Image
                    </Button>
                    {imageSrc && (
                        <Button onClick={downloadImage} variant="secondary">
                            <Download size={18} /> Download Image
                        </Button>
                    )}
                </div>

                {imageSrc && (
                    <div className={styles.pane} style={{ textAlign: 'center', padding: '2rem' }}>
                        <img src={imageSrc} alt="Converted" style={{ maxWidth: '100%', maxHeight: '400px', borderRadius: '8px' }} />
                    </div>
                )}
            </div>
        </ToolLayout>
    );
};

export default Base64ToImage;