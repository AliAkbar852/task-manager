import { useState } from 'react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function Signup({ onAuth, onSwitch }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); setLoading(true);
        try {
            const res = await fetch(`${API}/api/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
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
            <h2>Create Account</h2>
            <p className="auth-sub">Start managing your tasks today</p>
            <form onSubmit={handleSubmit}>
                {error && <p className="error-msg">{error}</p>}
                <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} required />
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password (min 6 chars)" value={password} onChange={e => setPassword(e.target.value)} required />
                <button type="submit" disabled={loading}>{loading ? 'Creating account...' : 'Sign Up'}</button>
            </form>
            <p className="switch-link">Already have an account? <span onClick={onSwitch}>Log in</span></p>
        </div>
    );
}

export default Signup;
