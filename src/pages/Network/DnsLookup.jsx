import { useState } from 'react';
import { Globe, Search, ArrowRight } from 'lucide-react';
import ToolLayout from '../../components/Tools/ToolLayout';
import Button from '../../components/UI/Button';
import styles from '../Developer/SharedToolStyles.module.css';

const DnsLookup = () => {
    const [domain, setDomain] = useState('');
    const [type, setType] = useState('A');
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const lookup = async () => {
        if (!domain) return;
        setLoading(true);
        setError(null);
        setResults(null);
        try {
            // Using Cloudflare DNS-over-HTTPS
            const res = await fetch(`https://cloudflare-dns.com/dns-query?name=${domain}&type=${type}`, {
                headers: { 'Accept': 'application/dns-json' }
            });
            if (!res.ok) throw new Error('DNS Query failed');
            const data = await res.json();
            setResults(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ToolLayout title="DNS Lookup" description="Query DNS records via Cloudflare DoH." icon={Globe}>
            <div className={styles.workspace} style={{ flexDirection: 'column', height: 'auto', gap: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <input
                        className={styles.editor}
                        style={{ flex: 1, height: 'auto', minHeight: '42px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}
                        placeholder="example.com"
                        value={domain}
                        onChange={e => setDomain(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && lookup()}
                    />
                    <select
                        value={type}
                        onChange={e => setType(e.target.value)}
                        style={{ background: '#333', color: 'white', padding: '0 1rem', borderRadius: 'var(--radius-md)', border: 'none' }}
                    >
                        {['A', 'AAAA', 'CNAME', 'MX', 'TXT', 'NS'].map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    <Button onClick={lookup} variant="primary"><Search size={18} /> Lookup</Button>
                </div>

                <div className={styles.pane} style={{ minHeight: '300px', padding: '1rem' }}>
                    {loading && <div>Querying DNS...</div>}
                    {error && <div style={{ color: '#ef4444' }}>{error}</div>}
                    {results && (
                        <div style={{ overflowX: 'auto' }}>
                            {results.Answer ? (
                                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                    <thead>
                                        <tr style={{ borderBottom: '1px solid #444' }}>
                                            <th style={{ padding: '0.5rem' }}>Name</th>
                                            <th style={{ padding: '0.5rem' }}>Type</th>
                                            <th style={{ padding: '0.5rem' }}>TTL</th>
                                            <th style={{ padding: '0.5rem' }}>Data</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {results.Answer.map((rec, i) => (
                                            <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                                <td style={{ padding: '0.5rem' }}>{rec.name}</td>
                                                <td style={{ padding: '0.5rem' }}>{type} ({rec.type})</td>
                                                <td style={{ padding: '0.5rem' }}>{rec.TTL}</td>
                                                <td style={{ padding: '0.5rem', fontFamily: 'monospace' }}>{rec.data}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div>No records found (Status: {results.Status})</div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </ToolLayout>
    );
};

export default DnsLookup;
