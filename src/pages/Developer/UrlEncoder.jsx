import { useState } from 'react';
import { Globe, ArrowDownUp } from 'lucide-react';
import GenericFormatter from '../../components/Tools/GenericFormatter';

const UrlEncoder = () => {
    const [mode, setMode] = useState('encode');

    const process = (input) => {
        return mode === 'encode' ? encodeURIComponent(input) : decodeURIComponent(input);
    };

    return (
        <div>
            <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                <button
                    onClick={() => setMode(m => m === 'encode' ? 'decode' : 'encode')}
                    style={{
                        background: 'var(--bg-tertiary)',
                        border: '1px solid var(--border-color)',
                        color: 'var(--text-primary)',
                        padding: '0.5rem 1rem',
                        borderRadius: 'var(--radius-md)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}
                >
                    <ArrowDownUp size={16} />
                    Switch to {mode === 'encode' ? 'Decode' : 'Encode'} Mode
                </button>
            </div>
            <GenericFormatter
                title={`URL ${mode === 'encode' ? 'Encoder' : 'Decoder'}`}
                description="Encode special characters or decode URL strings."
                icon={Globe}
                onFormat={process}
                toolId="url-encoder"
                inputPlaceholder={mode === 'encode' ? "URL to encode..." : "URL to decode..."}
            />
        </div>
    );
};

export default UrlEncoder;
