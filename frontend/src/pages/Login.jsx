import { useState } from 'react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function Login({ onAuth, onSwitch }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); setLoading(true);
        try {
            const res = await fetch(`${API}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            onAuth(data.token, data.user);
        } catch (err) { setError(err.message); }
        finally { setLoading(false); }
    };

    return (
        <div className="auth-card">
            <div className="auth-logo">✅ TaskFlow Pro</div>
            <h2>Welcome Back</h2>
            <p className="auth-sub">Log in to manage your tasks</p>
            <form onSubmit={handleSubmit}>
                {error && <p className="error-msg">{error}</p>}
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                <button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Log In'}</button>
            </form>
            <p className="switch-link">Don't have an account? <span onClick={onSwitch}>Sign up</span></p>
        </div>
    );
}

export default Login;
