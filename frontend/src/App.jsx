import { useState, useEffect } from 'react';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import FilterBar from './components/FilterBar';
import TaskCard from './components/TaskCard';
import TaskForm from './components/TaskForm';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function App() {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState({ status: 'all', priority: 'all' });
    const [showForm, setShowForm] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showSignup, setShowSignup] = useState(false);

    const authHeaders = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

    const handleAuth = (token, user) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setToken(token); setUser(user);
    };

    const handleLogout = () => {
        localStorage.clear();
        setToken(null); setUser(null); setTasks([]);
    };

    useEffect(() => {
        if (!token) return;
        setLoading(true);
        const params = new URLSearchParams();
        if (filter.status !== 'all') params.append('status', filter.status);
        if (filter.priority !== 'all') params.append('priority', filter.priority);

        fetch(`${API}/api/tasks?${params}`, { headers: authHeaders })
            .then(res => { if (res.status === 401) { handleLogout(); return; } return res.json(); })
            .then(data => { if (data) setTasks(data); setLoading(false); })
            .catch(() => { setError('Could not connect to server.'); setLoading(false); });
    }, [token, filter]);

    const handleSave = async (data) => {
        try {
            const url = editingTask ? `${API}/api/tasks/${editingTask._id}` : `${API}/api/tasks`;
            const method = editingTask ? 'PUT' : 'POST';
            const res = await fetch(url, { method, headers: authHeaders, body: JSON.stringify(data) });
            const saved = await res.json();
            if (!res.ok) throw new Error(saved.error);
            if (editingTask) {
                setTasks(tasks.map(t => t._id === saved._id ? saved : t));
            } else {
                setTasks([saved, ...tasks]);
            }
            setShowForm(false); setEditingTask(null);
        } catch (err) { alert(err.message); }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this task?')) return;
        try {
            await fetch(`${API}/api/tasks/${id}`, { method: 'DELETE', headers: authHeaders });
            setTasks(tasks.filter(t => t._id !== id));
        } catch { alert('Failed to delete task'); }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            const res = await fetch(`${API}/api/tasks/${id}`, {
                method: 'PUT', headers: authHeaders, body: JSON.stringify({ status: newStatus }),
            });
            const updated = await res.json();
            setTasks(tasks.map(t => t._id === id ? updated : t));
        } catch { alert('Failed to update status'); }
    };

    const openEdit = (task) => { setEditingTask(task); setShowForm(true); };
    const openAdd = () => { setEditingTask(null); setShowForm(true); };
    const closeForm = () => { setShowForm(false); setEditingTask(null); };

    if (!token) {
        return (
            <div className="auth-page">
                {showSignup
                    ? <Signup onAuth={handleAuth} onSwitch={() => setShowSignup(false)} />
                    : <Login onAuth={handleAuth} onSwitch={() => setShowSignup(true)} />}
            </div>
        );
    }

    const stats = {
        total: tasks.length,
        done: tasks.filter(t => t.status === 'done').length,
        inProgress: tasks.filter(t => t.status === 'in-progress').length,
    };

    return (
        <div>
            <Navbar user={user} onLogout={handleLogout} />
            <div className="app">
                <div className="page-header">
                    <div className="stats">
                        <div className="stat"><span>{stats.total}</span> Total</div>
                        <div className="stat in-progress"><span>{stats.inProgress}</span> In Progress</div>
                        <div className="stat done"><span>{stats.done}</span> Done</div>
                    </div>
                    <button className="add-btn" onClick={openAdd}>+ New Task</button>
                </div>

                <FilterBar filter={filter} onChange={setFilter} />

                {loading && <p className="status-msg">Loading tasks...</p>}
                {error && <p className="status-msg error">{error}</p>}
                {!loading && !error && tasks.length === 0 && (
                    <p className="status-msg empty">No tasks found. Add one!</p>
                )}

                <div className="task-grid">
                    {tasks.map(task => (
                        <TaskCard
                            key={task._id}
                            task={task}
                            onEdit={openEdit}
                            onDelete={handleDelete}
                            onStatusChange={handleStatusChange}
                        />
                    ))}
                </div>
            </div>

            {showForm && (
                <TaskForm
                    onClose={closeForm}
                    onSave={handleSave}
                    initial={editingTask}
                />
            )}
        </div>
    );
}

export default App;
