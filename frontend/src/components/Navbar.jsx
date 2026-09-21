function Navbar({ user, onLogout }) {
    return (
        <nav className="navbar">
            <div className="nav-brand">✅ TaskFlow Pro</div>
            <div className="nav-right">
                <span className="nav-user">👤 {user.name}</span>
                <button className="logout-btn" onClick={onLogout}>Log Out</button>
            </div>
        </nav>
    );
}

export default Navbar;
