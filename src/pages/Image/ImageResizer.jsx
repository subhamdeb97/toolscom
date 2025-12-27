import { useState, useRef } from 'react';
import { Image, Download, Upload } from 'lucide-react';
import ToolLayout from '../../components/Tools/ToolLayout';
import Button from '../../components/UI/Button';
import styles from '../Developer/SharedToolStyles.module.css';

const ImageResizer = () => {
    const [img, setImg] = useState(null);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const canvasRef = useRef(null);

    const handleFile = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            const image = new window.Image();
            image.onload = () => {
                setImg(image);
                setWidth(image.width);
                setHeight(image.height);
                drawImage(image, image.width, image.height);
            };
            image.src = ev.target.result;
        };
        reader.readAsDataURL(file);
    };

    const drawImage = (image, w, h) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0, w, h);
    };

    const handleResize = () => {
        if (img) drawImage(img, width, height);
    };

    const download = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const link = document.createElement('a');
            link.download = 'resized-image.png';
            link.href = canvas.toDataURL();
            link.click();
        }
    };

    return (
        <ToolLayout title="Image Resizer" description="Resize images entirely in your browser." icon={Image}>
            <div className={styles.workspace} style={{ flexDirection: 'column', height: 'auto', gap: '2rem' }}>
                <div style={{ textAlign: 'center' }}>
                    <input type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} id="upRes" />
                    <label htmlFor="upRes" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#333', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', cursor: 'pointer' }}>
                        <Upload size={18} /> Upload Image
                    </label>
                </div>

                {img && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                            <label>Width: <input type="number" value={width} onChange={e => setWidth(Number(e.target.value))} style={{ width: '80px', padding: '0.5rem', borderRadius: '4px', border: '1px solid #444', background: 'transparent', color: 'white' }} /></label>
                            <label>Height: <input type="number" value={height} onChange={e => setHeight(Number(e.target.value))} style={{ width: '80px', padding: '0.5rem', borderRadius: '4px', border: '1px solid #444', background: 'transparent', color: 'white' }} /></label>
                            <Button onClick={handleResize} variant="secondary">Apply</Button>
                            <Button onClick={download} variant="primary"><Download size={18} /> Download</Button>
                        </div>
                        <div className={styles.pane} style={{ width: '100%', overflow: 'auto', display: 'flex', justifyContent: 'center', padding: '1rem' }}>
                            <canvas ref={canvasRef} style={{ maxWidth: '100%', border: '1px solid #333' }} />
                        </div>
                    </div>
                )}
            </div>
        </ToolLayout>
    );
};

export default ImageResizer;
