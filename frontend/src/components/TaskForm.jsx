import { useState } from 'react';

function TaskForm({ onClose, onSave, initial }) {
    const [title, setTitle] = useState(initial?.title || '');
    const [description, setDescription] = useState(initial?.description || '');
    const [priority, setPriority] = useState(initial?.priority || 'medium');
    const [status, setStatus] = useState(initial?.status || 'todo');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) { setError('Title is required'); return; }
        onSave({ title, description, priority, status });
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>{initial ? 'Edit Task' : 'New Task'}</h3>
                    <button className="modal-close" onClick={onClose}>✕</button>
                </div>
                <form onSubmit={handleSubmit}>
                    {error && <p className="error-msg">{error}</p>}
                    <input
                        type="text"
                        placeholder="Task title *"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea
                        placeholder="Description (optional)"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <div className="form-row">
                        <div className="form-group">
                            <label>Priority</label>
                            <select value={priority} onChange={e => setPriority(e.target.value)}>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Status</label>
                            <select value={status} onChange={e => setStatus(e.target.value)}>
                                <option value="todo">To Do</option>
                                <option value="in-progress">In Progress</option>
                                <option value="done">Done</option>
                            </select>
                        </div>
                    </div>
                    <button type="submit">{initial ? 'Save Changes' : 'Add Task'}</button>
                </form>
            </div>
        </div>
    );
}

export default TaskForm;
