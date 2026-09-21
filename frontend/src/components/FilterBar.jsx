function FilterBar({ filter, onChange }) {
    const statuses = ['all', 'todo', 'in-progress', 'done'];
    const priorities = ['all', 'high', 'medium', 'low'];

    return (
        <div className="filter-bar">
            <div className="filter-group">
                <span className="filter-label">Status:</span>
                {statuses.map(s => (
                    <button
                        key={s}
                        className={`filter-btn ${filter.status === s ? 'active' : ''}`}
                        onClick={() => onChange({ ...filter, status: s })}
                    >
                        {s === 'in-progress' ? 'In Progress' : s.charAt(0).toUpperCase() + s.slice(1)}
                    </button>
                ))}
            </div>
            <div className="filter-group">
                <span className="filter-label">Priority:</span>
                {priorities.map(p => (
                    <button
                        key={p}
                        className={`filter-btn priority-${p} ${filter.priority === p ? 'active' : ''}`}
                        onClick={() => onChange({ ...filter, priority: p })}
                    >
                        {p.charAt(0).toUpperCase() + p.slice(1)}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default FilterBar;
