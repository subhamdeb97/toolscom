import { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Download, Link, Type } from 'lucide-react';
import Card from '../../components/UI/Card';
import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';
import styles from './QRCodePage.module.css';

const QRCodePage = () => {
    const [text, setText] = useState('https://example.com');
    const [size, setSize] = useState(256);
    const canvasRef = useRef();

    const handleDownload = (format) => {
        const canvas = canvasRef.current.querySelector('canvas');
        if (!canvas) return;

        const link = document.createElement('a');
        link.download = `qrcode-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    };

    return (
        <div className={styles.container}>
            <header>
                <h1 className="text-3xl font-bold mb-2">QR Code Generator</h1>
                <p className="text-gray-400">Generate high-quality QR codes for your projects.</p>
            </header>

            <div className={styles.content}>
                <div className={styles.configColumn}>
                    <Card className={styles.configCard}>
                        <div className={styles.cardHeader}>
                            <Link size={20} className="text-indigo-400" />
                            <h2>Content & Settings</h2>
                        </div>

                        <div className={styles.inputs}>
                            <Input
                                label="Content (URL or Text)"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="https://..."
                                rows={4}
                            />

                            <div className={styles.rangeWrapper}>
                                <label className={styles.label}>Size ({size}px)</label>
                                <input
                                    type="range"
                                    min="128"
                                    max="512"
                                    step="32"
                                    value={size}
                                    onChange={(e) => setSize(Number(e.target.value))}
                                    className={styles.range}
                                />
                            </div>
                        </div>
                    </Card>
                </div>

                <div className={styles.previewColumn}>
                    <Card className={styles.previewCard}>
                        <div className={styles.cardHeader}>
                            <Type size={20} className="text-emerald-400" />
                            <h2>Preview</h2>
                        </div>

                        <div className={styles.canvasWrapper} ref={canvasRef}>
                            <QRCodeCanvas
                                value={text}
                                size={size}
                                level={"H"}
                                includeMargin={true}
                                bgColor={"#ffffff"}
                                fgColor={"#000000"}
                            />
                        </div>

                        <div className={styles.actions}>
                            <Button onClick={() => handleDownload('png')}>
                                <Download size={18} />
                                Download PNG
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default QRCodePage;
