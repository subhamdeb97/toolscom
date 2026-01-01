import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, Mail, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/UI/Button';
import styles from './LoginPage.module.css';

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const { login, register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (isLogin) {
                await login(formData.username, formData.password);
                navigate('/');
            } else {
                await register(formData.username, formData.password);
                setIsLogin(true); // Switch to login after success
                setError('Account created! Please log in.');
                setFormData({ username: '', password: '' });
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <h1 className={styles.title}>{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
                    <p className={styles.subtitle}>
                        {isLogin ? 'Enter your credentials to access your workspace.' : 'Sign up to start saving your tools and history.'}
                    </p>
                </div>

                {error && <div className={styles.error}>{error}</div>}

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <User size={18} className={styles.inputIcon} />
                        <input
                            type="text"
                            placeholder="Username"
                            className={styles.input}
                            value={formData.username}
                            onChange={e => setFormData({ ...formData, username: e.target.value })}
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <Lock size={18} className={styles.inputIcon} />
                        <input
                            type="password"
                            placeholder="Password"
                            className={styles.input}
                            value={formData.password}
                            onChange={e => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>

                    <Button type="submit" variant="primary" style={{ width: '100%', justifyContent: 'center' }}>
                        {isLogin ? 'Sign In' : 'Sign Up'} <ArrowRight size={18} />
                    </Button>
                </form>

                <div className={styles.footer}>
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button onClick={() => { setIsLogin(!isLogin); setError(''); }} className={styles.linkBtn}>
                        {isLogin ? 'Sign Up' : 'Sign In'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
