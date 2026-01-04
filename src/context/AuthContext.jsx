import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');
        if (token && email) {
            setUser({ email, token });
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const res = await fetch('/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Login failed');

            localStorage.setItem('token', data.token);
            localStorage.setItem('email', data.email);
            setUser({ email: data.email, token: data.token });
            return true;
        } catch (err) {
            throw err;
        }
    };

    const register = async (email, mobile, password) => {
        try {
            console.log('Registering with:', { email, mobile, password });
            const res = await fetch('/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, mobile, password })
            });
            const data = await res.json();
            console.log('Register response:', res.status, data);
            if (!res.ok) throw new Error(data.error || 'Registration failed');
            return true;
        } catch (err) {
            throw err;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        setUser(null);
    };

    const saveHistory = async (toolId, input, output, metadata = {}) => {
        if (!user) return; // Only save if logged in
        try {
            const res = await fetch('/api/history', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ toolId, input, output, metadata })
            });
            if (!res.ok) {
                console.error('Failed to save history:', await res.text());
            }
        } catch (err) {
            console.error('Error saving history:', err);
        }
    };

    const getHistory = async () => {
        if (!user) return [];
        try {
            const res = await fetch('/api/history', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            if (!res.ok) return [];
            const data = await res.json();
            return data;
        } catch (err) {
            console.error('Error fetching history:', err);
            return [];
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, saveHistory, getHistory, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
