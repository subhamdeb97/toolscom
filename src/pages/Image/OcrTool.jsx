import { useState, useRef } from 'react';
import Tesseract from 'tesseract.js';
import { Scan, Copy, Download, FileImage, RefreshCw } from 'lucide-react';
import ToolLayout from '../../components/Tools/ToolLayout';
import Button from '../../components/UI/Button';
import styles from '../Developer/SharedToolStyles.module.css';

const OcrTool = () => {
    const [image, setImage] = useState(null);
    const [text, setText] = useState('');
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const fileInputRef = useRef(null);

    const handleImageUpload = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(URL.createObjectURL(e.target.files[0]));
            setText('');
            setProgress(0);
            setStatus('');
        }
    };

    const processImage = async () => {
        if (!image) return;

        setIsProcessing(true);
        setText('');

        try {
            const result = await Tesseract.recognize(
                image,
                'eng',
                {
                    logger: m => {
                        if (m.status === 'recognizing text') {
                            setProgress(Math.round(m.progress * 100));
                            setStatus(`Recognizing Text... ${Math.round(m.progress * 100)}%`);
                        } else {
                            setStatus(m.status);
                        }
                    }
                }
            );

            setText(result.data.text);
            setStatus('Completed!');
        } catch (err) {
            console.error(err);
            setStatus('Error occurred during processing.');
        } finally {
            setIsProcessing(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(text);
    };

    const downloadText = () => {
        const element = document.createElement('a');
        const file = new Blob([text], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = 'extracted_text.txt';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    return (
        <ToolLayout
            title="OCR (Image to Text)"
            description="Extract text from images, documents, or screenshots using Optical Character Recognition."
            icon={Scan}
        >
            <div className={styles.workspace}>
                {/* Input Pane - Image View */}
                <div className={styles.pane}>
                    <div className={styles.paneHeader}>
                        <span className={styles.paneTitle}>Source Image</span>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <Button
                                size="sm"
                                variant="secondary"
                                onClick={() => fileInputRef.current?.click()}
                                disabled={isProcessing}
                            >
                                <FileImage size={16} /> Upload
                            </Button>
                            <Button
                                size="sm"
                                variant="primary"
                                onClick={processImage}
                                disabled={!image || isProcessing}
                            >
                                {isProcessing ? <RefreshCw size={16} class="spin" /> : <Scan size={16} />}
                                {isProcessing ? ' Scanning...' : ' Extract Text'}
                            </Button>
                        </div>
                    </div>

                    <div style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '1rem',
                        background: 'var(--bg-tertiary)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageUpload}
                            accept="image/*"
                            style={{ display: 'none' }}
                        />

                        {image ? (
                            <img
                                src={image}
                                alt="Source"
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '100%',
                                    objectFit: 'contain',
                                    borderRadius: 'var(--radius-md)',
                                    opacity: isProcessing ? 0.5 : 1
                                }}
                            />
                        ) : (
                            <div style={{ textAlign: 'center', color: 'var(--text-tertiary)' }}>
                                <FileImage size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                                <p>Upload an image to start</p>
                            </div>
                        )}

                        {isProcessing && (
                            <div style={{
                                position: 'absolute',
                                bottom: '2rem',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                background: 'rgba(0,0,0,0.8)',
                                padding: '0.5rem 1rem',
                                borderRadius: '20px',
                                color: 'white',
                                fontSize: '0.9rem'
                            }}>
                                {status}
                            </div>
                        )}
                    </div>
                </div>

                {/* Output Pane - Text Result */}
                <div className={styles.pane}>
                    <div className={styles.paneHeader}>
                        <span className={styles.paneTitle}>Extracted Text</span>
                        <div className={styles.controls} style={{ flexDirection: 'row', padding: 0 }}>
                            <button className={styles.iconBtn} onClick={copyToClipboard} title="Copy">
                                <Copy size={18} />
                            </button>
                            <button className={styles.iconBtn} onClick={downloadText} title="Download">
                                <Download size={18} />
                            </button>
                        </div>
                    </div>
                    <textarea
                        className={styles.editor}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Extracted text will appear here..."
                    />
                </div>
            </div>
            <style>{`
                .spin { animation: spin 1s linear infinite; }
                @keyframes spin { 100% { transform: rotate(360deg); } }
            `}</style>
        </ToolLayout>
    );
};

export default OcrTool;
