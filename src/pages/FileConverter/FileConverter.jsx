import { useState } from 'react';
import { FileType } from 'lucide-react';
import ToolLayout from '../../components/Tools/ToolLayout';
import Button from '../../components/UI/Button';
import { useAuth } from '../../context/AuthContext';
import styles from '../Developer/SharedToolStyles.module.css';

const FileConverter = () => {
    const [inputFile, setInputFile] = useState(null);
    const [conversionType, setConversionType] = useState('text-encoding');
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');
    const { saveHistory } = useAuth();

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            setInputFile(file);
            setError('');
        }
    };

    const convertFile = async () => {
        if (!inputFile) return;

        try {
            setError('');
            let result = '';

            if (conversionType === 'text-encoding') {
                // Read as text and convert encoding
                const text = await readFileAsText(inputFile);
                // For demo, just show the text (in real app, would convert encoding)
                result = text;
                saveHistory('file-converter', inputFile.name, 'Text encoding converted', { type: 'text-encoding' });
            } else if (conversionType === 'image-format') {
                // Convert image format
                const imageUrl = await readFileAsDataURL(inputFile);
                const converted = await convertImageFormat(imageUrl, 'image/jpeg');
                result = converted;
                saveHistory('file-converter', inputFile.name, 'Image format converted', { type: 'image-format' });
            } else if (conversionType === 'base64') {
                // Convert to/from base64
                const dataUrl = await readFileAsDataURL(inputFile);
                result = dataUrl;
                saveHistory('file-converter', inputFile.name, 'File base64 encoded', { type: 'base64' });
            } else if (conversionType === 'data-url') {
                // Convert file to data URL
                const dataUrl = await readFileAsDataURL(inputFile);
                result = dataUrl;
                saveHistory('file-converter', inputFile.name, 'File to data URL', { type: 'data-url' });
            }

            setOutput(result);
        } catch (err) {
            setError('Conversion failed: ' + err.message);
        }
    };

    const readFileAsText = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = reject;
            reader.readAsText(file);
        });
    };

    const readFileAsDataURL = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const convertImageFormat = (dataUrl, targetFormat) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                canvas.toBlob((blob) => {
                    const reader = new FileReader();
                    reader.onload = (e) => resolve(e.target.result);
                    reader.readAsDataURL(blob);
                }, targetFormat);
            };
            img.src = dataUrl;
        });
    };

    const downloadOutput = () => {
        if (!output) return;
        const link = document.createElement('a');
        link.href = output;
        link.download = `converted_${inputFile?.name || 'file'}`;
        link.click();
    };

    return (
        <ToolLayout title="File Converter" description="Convert files between different formats (frontend demo)." icon={FileType}>
            <div className={styles.workspace} style={{ flexDirection: 'column', height: 'auto', gap: '2rem' }}>
                <div className={styles.pane}>
                    <div className={styles.paneHeader}>
                        <span className={styles.paneTitle}>Select File & Conversion Type</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Conversion Type</label>
                            <select
                                value={conversionType}
                                onChange={(e) => setConversionType(e.target.value)}
                                style={{
                                    width: '100%',
                                    background: 'var(--bg-tertiary)',
                                    border: '1px solid var(--border-color)',
                                    color: 'var(--text-primary)',
                                    padding: '0.5rem',
                                    borderRadius: '4px'
                                }}
                            >
                                <option value="text-encoding">Text Encoding (UTF-8)</option>
                                <option value="image-format">Image Format (to JPEG)</option>
                                <option value="base64">To Base64</option>
                                <option value="data-url">To Data URL</option>
                            </select>
                        </div>
                        <div>
                            <input
                                type="file"
                                onChange={handleFileSelect}
                                style={{
                                    width: '100%',
                                    padding: '0.5rem',
                                    background: 'var(--bg-tertiary)',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: '4px',
                                    color: 'var(--text-primary)'
                                }}
                            />
                        </div>
                        {inputFile && (
                            <div style={{ color: 'var(--text-secondary)' }}>
                                Selected: {inputFile.name} ({(inputFile.size / 1024).toFixed(1)} KB)
                            </div>
                        )}
                    </div>
                    {error && <div className={styles.errorMessage}>{error}</div>}
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                    <Button onClick={convertFile} variant="primary" disabled={!inputFile}>
                        Convert File
                    </Button>
                    {output && (
                        <Button onClick={downloadOutput} variant="secondary">
                            Download Result
                        </Button>
                    )}
                </div>

                {output && (
                    <div className={styles.pane}>
                        <div className={styles.paneHeader}>
                            <span className={styles.paneTitle}>Conversion Result</span>
                        </div>
                        {conversionType === 'image-format' || output.startsWith('data:image/') ? (
                            <div style={{ textAlign: 'center', padding: '1rem' }}>
                                <img src={output} alt="Converted" style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '8px' }} />
                            </div>
                        ) : (
                            <textarea
                                className={styles.editor}
                                value={output.length > 1000 ? output.substring(0, 1000) + '...' : output}
                                readOnly
                                style={{ minHeight: '200px' }}
                            />
                        )}
                    </div>
                )}
            </div>
        </ToolLayout>
    );
};

export default FileConverter;