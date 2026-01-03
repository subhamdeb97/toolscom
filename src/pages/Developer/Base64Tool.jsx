import { useState } from 'react';
import { Hash, ArrowDownUp } from 'lucide-react';
import GenericFormatter from '../../components/Tools/GenericFormatter';

const Base64Tool = () => {
    const [mode, setMode] = useState('encode'); // encode | decode

    const process = (input) => {
        if (mode === 'encode') {
            return btoa(input);
        } else {
            return atob(input);
        }
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
                title={`Base64 ${mode === 'encode' ? 'Encoder' : 'Decoder'}`}
                description="Encode text to Base64 or decode Base64 strings."
                icon={Hash}
                onFormat={process}
                toolId="base64"
                inputPlaceholder={mode === 'encode' ? "Text to encode..." : "Base64 string..."}
            />
        </div>
    );
};

export default Base64Tool;
