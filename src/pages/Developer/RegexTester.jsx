import { useState, useMemo } from 'react';
import { Search, Info } from 'lucide-react';
import ToolLayout from '../../components/Tools/ToolLayout';
import styles from './SharedToolStyles.module.css';

const RegexTester = () => {
    const [pattern, setPattern] = useState(String.raw`\b\w+\b`);
    const [flags, setFlags] = useState('g');
    const [text, setText] = useState('Hello world, this is a test.');
    const [error, setError] = useState(null);

    const matches = useMemo(() => {
        if (!pattern) return [];
        try {
            const regex = new RegExp(pattern, flags);
            const items = [];
            let match;

            // Prevent infinite loops with global regexes that match empty strings
            // Copy regex to ensure we don't mess with state if we were using it elsewhere
            const localRegex = new RegExp(pattern, flags.includes('g') ? flags : flags + 'g');

            while ((match = localRegex.exec(text)) !== null) {
                // Determine if we should stop (zero-width match protection)
                if (match.index === localRegex.lastIndex) {
                    localRegex.lastIndex++;
                }

                items.push({
                    index: match.index,
                    match: match[0],
                    groups: match.slice(1)
                });

                // If original wasn't global, break after first
                if (!flags.includes('g')) break;
            }
            if (setError) setError(null);
            return items;
        } catch (err) {
            setError(err.message);
            return [];
        }
    }, [pattern, flags, text]);

    // Simple highlighter
    const highlightedText = useMemo(() => {
        if (error || matches.length === 0) return text;

        // Split text by matches to insert highlights
        let lastIndex = 0;
        const parts = [];

        matches.forEach((m, i) => {
            // Text before match
            if (m.index > lastIndex) {
                parts.push(<span key={`text-${i}`}>{text.slice(lastIndex, m.index)}</span>);
            }
            // Match
            parts.push(
                <span key={`match-${i}`} style={{ backgroundColor: 'rgba(99, 102, 241, 0.4)', borderRadius: '2px', borderBottom: '2px solid var(--accent-primary)' }}>
                    {m.match}
                </span>
            );
            lastIndex = m.index + m.match.length;
        });

        // Remaining text
        if (lastIndex < text.length) {
            parts.push(<span key="text-end">{text.slice(lastIndex)}</span>);
        }

        return parts;
    }, [text, matches, error]);

    const handleFlagChange = (flag) => {
        setFlags(prev => prev.includes(flag) ? prev.replace(flag, '') : prev + flag);
    };

    return (
        <ToolLayout title="Regex Tester" description="Test and debug JavaScript regular expressions." icon={Search}>
            <div className={styles.workspace} style={{ flexDirection: 'column', height: 'auto', gap: '2rem' }}>

                {/* Controls */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-md)', border: `1px solid ${error ? '#ef4444' : 'var(--border-color)'}`, overflow: 'hidden' }}>
                            <span style={{ padding: '0.75rem', color: '#888', background: 'rgba(255,255,255,0.02)', borderRight: '1px solid var(--border-color)' }}>/</span>
                            <input
                                type="text"
                                value={pattern}
                                onChange={e => setPattern(e.target.value)}
                                style={{ flex: 1, background: 'transparent', border: 'none', color: 'white', padding: '0.75rem', outline: 'none', fontFamily: 'monospace', fontSize: '1.1rem' }}
                                placeholder="Regex Pattern"
                            />
                            <span style={{ padding: '0.75rem', color: '#888', background: 'rgba(255,255,255,0.02)', borderLeft: '1px solid var(--border-color)' }}>/{flags}</span>
                        </div>
                    </div>
                    {error && <div style={{ color: '#ef4444', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Info size={16} /> {error}</div>}

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <span style={{ color: '#888', fontSize: '0.9rem', alignSelf: 'center' }}>Flags:</span>
                        {[
                            { f: 'g', label: 'Global' },
                            { f: 'i', label: 'Case Insensitive' },
                            { f: 'm', label: 'Multiline' },
                            { f: 's', label: 'Dot All' },
                            { f: 'u', label: 'Unicode' },
                            { f: 'y', label: 'Sticky' }
                        ].map(opt => (
                            <label key={opt.f} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.85rem', cursor: 'pointer', userSelect: 'none' }}>
                                <input type="checkbox" checked={flags.includes(opt.f)} onChange={() => handleFlagChange(opt.f)} />
                                {opt.label} ({opt.f})
                            </label>
                        ))}
                    </div>
                </div>

                {/* Editor Split */}
                <div className={styles.workspace} style={{ height: '500px' }}>
                    {/* Test String Input */}
                    <div className={styles.pane}>
                        <div className={styles.paneHeader}>
                            <span className={styles.paneTitle}>Test String</span>
                        </div>
                        <textarea
                            className={styles.editor}
                            value={text}
                            onChange={e => setText(e.target.value)}
                            spellCheck="false"
                            style={{ resize: 'none' }}
                        />
                    </div>

                    {/* Results / Highlight */}
                    <div className={styles.pane}>
                        <div className={styles.paneHeader}>
                            <span className={styles.paneTitle}>Match Preview</span>
                            <span style={{ fontSize: '0.8rem', color: 'var(--accent-primary)' }}>{matches.length} matches</span>
                        </div>
                        <div className={styles.editor} style={{ overflowY: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-word', color: '#ccc' }}>
                            {highlightedText}
                        </div>
                    </div>
                </div>

                {/* Match Details */}
                {matches.length > 0 && (
                    <div className={styles.pane} style={{ padding: '0', overflow: 'hidden' }}>
                        <div className={styles.paneHeader}>
                            <span className={styles.paneTitle}>Match Details</span>
                        </div>
                        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                                <thead style={{ background: 'rgba(255,255,255,0.05)', position: 'sticky', top: 0 }}>
                                    <tr>
                                        <th style={{ padding: '0.75rem 1rem' }}>#</th>
                                        <th style={{ padding: '0.75rem 1rem' }}>Match</th>
                                        <th style={{ padding: '0.75rem 1rem' }}>Index</th>
                                        <th style={{ padding: '0.75rem 1rem' }}>Groups</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {matches.map((m, i) => (
                                        <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                            <td style={{ padding: '0.5rem 1rem', color: '#888' }}>{i + 1}</td>
                                            <td style={{ padding: '0.5rem 1rem', fontFamily: 'monospace', color: 'var(--accent-primary)' }}>{m.match}</td>
                                            <td style={{ padding: '0.5rem 1rem' }}>{m.index}</td>
                                            <td style={{ padding: '0.5rem 1rem', fontFamily: 'monospace' }}>
                                                {m.groups.length > 0 ? (
                                                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                                        {m.groups.map((g, gi) => (
                                                            <span key={gi} style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '4px' }}>${gi + 1}: {g}</span>
                                                        ))}
                                                    </div>
                                                ) : <span style={{ color: '#555' }}>-</span>}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </ToolLayout>
    );
};

export default RegexTester;
