const PRIORITY_COLORS = { high: '#ef4444', medium: '#f59e0b', low: '#22c55e' };
const STATUS_LABELS = { todo: 'To Do', 'in-progress': 'In Progress', done: 'Done' };

function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
    const date = new Date(task.createdAt).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric',
    });

    const nextStatus = { todo: 'in-progress', 'in-progress': 'done', done: 'todo' };

    return (
        <div className={`task-card ${task.status === 'done' ? 'done' : ''}`}>
            <div className="task-card-top">
                <div className="task-badges">
                    <span className="priority-badge" style={{ background: PRIORITY_COLORS[task.priority] }}>
                        {task.priority}
                    </span>
                    <span className="status-badge">{STATUS_LABELS[task.status]}</span>
                </div>
                <div className="task-actions">
                    <button className="btn-icon" onClick={() => onEdit(task)} title="Edit">✏️</button>
                    <button className="btn-icon btn-delete" onClick={() => onDelete(task._id)} title="Delete">🗑️</button>
                </div>
            </div>
            <h3 className="task-title">{task.title}</h3>
            {task.description && <p className="task-desc">{task.description}</p>}
            <div className="task-card-bottom">
                <span className="task-date">{date}</span>
                <button
                    className="status-toggle"
                    onClick={() => onStatusChange(task._id, nextStatus[task.status])}
                    title="Advance status"
                >
                    {task.status === 'done' ? '↩ Reopen' : '→ Next'}
                </button>
            </div>
        </div>
    );
}

export default TaskCard;
