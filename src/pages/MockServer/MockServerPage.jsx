import { useState } from 'react';
import { Plus, Trash2, Activity } from 'lucide-react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import styles from './MockServerPage.module.css';

const MockServerPage = () => {
    const [mocks, setMocks] = useState([
        { id: 1, method: 'GET', path: '/api/users', status: 200, response: '{ "users": [] }' },
        { id: 2, method: 'POST', path: '/api/auth/login', status: 201, response: '{ "token": "xyz" }' }
    ]);

    const [form, setForm] = useState({
        method: 'GET',
        path: '',
        status: '200',
        response: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.path) return;

        const newMock = {
            id: Date.now(),
            ...form,
            status: parseInt(form.status)
        };

        setMocks([...mocks, newMock]);
        setForm({ method: 'GET', path: '', status: '200', response: '' });
    };

    const deleteMock = (id) => {
        setMocks(mocks.filter(m => m.id !== id));
    };

    const getMethodColor = (method) => {
        switch (method) {
            case 'GET': return styles.methodGet;
            case 'POST': return styles.methodPost;
            case 'PUT': return styles.methodPut;
            case 'DELETE': return styles.methodDelete;
            default: return styles.methodDefault;
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1 className="text-3xl font-bold mb-2">Mock Server</h1>
                    <p className="text-gray-400">Create and manage local API mocks for testing.</p>
                </div>
            </header>

            <div className={styles.grid}>
                {/* Create Form */}
                <div className={styles.column}>
                    <Card className={styles.formCard}>
                        <div className={styles.cardHeader}>
                            <Plus size={20} className="text-indigo-400" />
                            <h2>New Endpoint</h2>
                        </div>

                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.row}>
                                <div className={styles.selectWrapper}>
                                    <label className={styles.label}>Method</label>
                                    <select
                                        className={styles.select}
                                        value={form.method}
                                        onChange={(e) => setForm({ ...form, method: e.target.value })}
                                    >
                                        <option value="GET">GET</option>
                                        <option value="POST">POST</option>
                                        <option value="PUT">PUT</option>
                                        <option value="DELETE">DELETE</option>
                                        <option value="PATCH">PATCH</option>
                                    </select>
                                </div>

                                <div style={{ flex: 1 }}>
                                    <Input
                                        label="Path"
                                        placeholder="/api/resource"
                                        value={form.path}
                                        onChange={(e) => setForm({ ...form, path: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className={styles.row}>
                                <div style={{ width: '100px' }}>
                                    <Input
                                        label="Status"
                                        type="number"
                                        value={form.status}
                                        onChange={(e) => setForm({ ...form, status: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Response Body (JSON)</label>
                                <textarea
                                    className={styles.textarea}
                                    rows={6}
                                    value={form.response}
                                    onChange={(e) => setForm({ ...form, response: e.target.value })}
                                    placeholder='{ "key": "value" }'
                                />
                            </div>

                            <Button type="submit" style={{ width: '100%' }}>
                                <Plus size={18} />
                                Create Mock
                            </Button>
                        </form>
                    </Card>
                </div>

                {/* Mocks List */}
                <div className={styles.column}>
                    <div className={styles.listHeader}>
                        <Activity size={20} className="text-emerald-400" />
                        <h2>Active Mocks ({mocks.length})</h2>
                    </div>

                    <div className={styles.mockList}>
                        {mocks.map(mock => (
                            <Card key={mock.id} className={styles.mockItem}>
                                <div className={styles.mockHeader}>
                                    <div className={styles.mockInfo}>
                                        <span className={`${styles.methodBadge} ${getMethodColor(mock.method)}`}>
                                            {mock.method}
                                        </span>
                                        <span className={styles.path}>{mock.path}</span>
                                    </div>
                                    <div className={styles.statusBadge}>
                                        {mock.status}
                                    </div>
                                </div>

                                <div className={styles.responsePreview}>
                                    <pre>{mock.response || '// No body'}</pre>
                                </div>

                                <div className={styles.mockActions}>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => deleteMock(mock.id)}
                                    >
                                        <Trash2 size={16} />
                                    </Button>
                                </div>
                            </Card>
                        ))}

                        {mocks.length === 0 && (
                            <div className={styles.emptyState}>
                                <p>No active mocks. Create one to get started.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MockServerPage;
