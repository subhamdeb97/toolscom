import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        if (token && username) {
            setUser({ username, token });
        }
        setLoading(false);
    }, []);

    const login = async (username, password) => {
        try {
            const res = await fetch('/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Login failed');

            localStorage.setItem('token', data.token);
            localStorage.setItem('username', data.username);
            setUser({ username: data.username, token: data.token });
            return true;
        } catch (err) {
            throw err;
        }
    };

    const register = async (username, password) => {
        try {
            const res = await fetch('/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Registration failed');
            return true;
        } catch (err) {
            throw err;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
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
