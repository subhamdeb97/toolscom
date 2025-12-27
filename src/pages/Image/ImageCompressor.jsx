import { useState, useRef } from 'react';
import { Image, Download, Upload } from 'lucide-react';
import ToolLayout from '../../components/Tools/ToolLayout';
import Button from '../../components/UI/Button';
import styles from '../Developer/SharedToolStyles.module.css';

const ImageCompressor = () => {
    const [img, setImg] = useState(null);
    const [quality, setQuality] = useState(0.8);
    const [preview, setPreview] = useState(null);
    const [size, setSize] = useState({ orig: 0, new: 0 });

    const handleFile = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setSize(p => ({ ...p, orig: file.size }));
        const reader = new FileReader();
        reader.onload = (ev) => {
            const image = new window.Image();
            image.onload = () => {
                setImg(image);
                compress(image, quality);
            };
            image.src = ev.target.result;
        };
        reader.readAsDataURL(file);
    };

    const compress = (image, q) => {
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0);

        canvas.toBlob((blob) => {
            if (blob) {
                setSize(p => ({ ...p, new: blob.size }));
                setPreview(URL.createObjectURL(blob));
            }
        }, 'image/jpeg', q);
    };

    return (
        <ToolLayout title="Image Compressor" description="Compress images (JPEG) in the browser." icon={Image}>
            <div className={styles.workspace} style={{ flexDirection: 'column', height: 'auto', gap: '2rem' }}>
                <div style={{ textAlign: 'center' }}>
                    <input type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} id="upComp" />
                    <label htmlFor="upComp" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#333', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', cursor: 'pointer' }}>
                        <Upload size={18} /> Select Image
                    </label>
                </div>

                {img && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <label>Quality: {Math.round(quality * 100)}%</label>
                            <input
                                type="range" min="0.1" max="1" step="0.1"
                                value={quality}
                                onChange={e => {
                                    setQuality(Number(e.target.value));
                                    compress(img, Number(e.target.value));
                                }}
                            />
                        </div>
                        <div style={{ display: 'flex', gap: '2rem', fontSize: '0.9rem', color: '#aaa' }}>
                            <span>Original: {(size.orig / 1024).toFixed(1)} KB</span>
                            <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>New: {(size.new / 1024).toFixed(1)} KB</span>
                        </div>

                        {preview && (
                            <>
                                <img src={preview} alt="Compressed" style={{ maxWidth: '100%', maxHeight: '400px', borderRadius: '8px', border: '1px solid #444' }} />
                                <a href={preview} download="compressed-image.jpg" style={{ textDecoration: 'none' }}>
                                    <Button variant="primary"><Download size={18} /> Download</Button>
                                </a>
                            </>
                        )}
                    </div>
                )}
            </div>
        </ToolLayout>
    );
};

export default ImageCompressor;
