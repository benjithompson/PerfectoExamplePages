/* TopNav Component – Navigation bar with mega menu */
function TopNav({ user, currentPage, onNavigate, onLogout, onSearch, onChat }) {
  const [megaOpen, setMegaOpen] = React.useState(false);
  const [profileOpen, setProfileOpen] = React.useState(false);
  const megaRef = React.useRef(null);

  React.useEffect(() => {
    if (!megaOpen) return;
    const handleKey = (e) => { if (e.key === 'Escape') setMegaOpen(false); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [megaOpen]);

  const handleInsuranceClick = (e) => {
    e.preventDefault();
    setMegaOpen(prev => !prev);
  };

  const closeMega = () => setMegaOpen(false);

  const navTo = (page) => { closeMega(); setProfileOpen(false); onNavigate(page); };

  return (
    <nav className="top-nav" style={{ position: 'sticky', top: 0 }}>
      <div className="top-nav-inner">
        <a href="../index.html" className="back-to-index" aria-label="Back to examples index">← Index</a>
        <a href="#" className="nav-logo" onClick={e => { e.preventDefault(); navTo('dashboard'); }}>
          <div className="shield">SS</div>
          <span>SecureShield</span>
        </a>
        <div className="nav-links">
          <a href="#" className={currentPage === 'dashboard' ? 'active' : ''} onClick={e => { e.preventDefault(); navTo('dashboard'); }}>Home</a>
          <div className="nav-link-wrap">
            <a href="#" className={(currentPage === 'auto' || currentPage === 'home-ins' ? 'active' : '') + (megaOpen ? ' mega-open' : '')} onClick={handleInsuranceClick}>Insurance</a>
          </div>
          <a href="#" className={currentPage === 'banking' ? 'active' : ''} onClick={e => { e.preventDefault(); navTo('banking'); }}>Banking</a>
          <a href="#" className={currentPage === 'rewards' ? 'active' : ''} onClick={e => { e.preventDefault(); navTo('rewards'); }}>Rewards</a>
          <a href="#" className={currentPage === 'perks' ? 'active' : ''} onClick={e => { e.preventDefault(); navTo('perks'); }}>Perks</a>
          <a href="#" className={currentPage === 'documents' ? 'active' : ''} onClick={e => { e.preventDefault(); navTo('documents'); }}>Documents</a>
        </div>
        <div className="nav-right">
          <button onClick={onSearch}>🔍 Search</button>
          <button onClick={onChat}>💬 Chat</button>
          <div className="nav-avatar-wrap">
            <div className="nav-avatar" title={user.fullName} onClick={() => setProfileOpen(!profileOpen)}>{user.name.charAt(0)}</div>
            {profileOpen && (
              <React.Fragment>
                <div className="claims-overlay" onClick={() => setProfileOpen(false)} />
                <div className="profile-dropdown">
                  <div className="profile-dropdown-header">
                    <div className="nav-avatar" style={{ width: 40, height: 40, fontSize: '.9rem' }}>{user.name.charAt(0)}</div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '.9rem' }}>{user.fullName}</div>
                      <div style={{ fontSize: '.75rem', color: '#6b7280' }}>Member ID: {user.memberId}</div>
                    </div>
                  </div>
                  <div className="profile-dropdown-body">
                    <a href="#" onClick={e => { e.preventDefault(); navTo('profile'); }}>⚙️ Profile &amp; Settings</a>
                    <a href="#" onClick={e => { e.preventDefault(); navTo('documents'); }}>📄 Documents &amp; Inbox</a>
                    <a href="#" onClick={e => { e.preventDefault(); navTo('rewards'); }}>🏆 Rewards Center</a>
                  </div>
                  <div className="profile-dropdown-footer">
                    <a href="#" onClick={e => { e.preventDefault(); onLogout(); }}>Log Off</a>
                  </div>
                </div>
              </React.Fragment>
            )}
          </div>
          <button onClick={onLogout}>Log Off</button>
        </div>
      </div>

      {megaOpen && (
        <React.Fragment>
          <div className="mega-overlay" onClick={closeMega} />
          <div className="mega-menu" ref={megaRef}>
            <div className="mega-menu-inner">
              <div className="mega-columns">
                {MEGA_MENU.columns.map((col, ci) => (
                  <div className="mega-col" key={ci}>
                    {col.links ? (
                      <React.Fragment>
                        <h5>{col.title}</h5>
                        <ul>
                          {col.links.map((l, li) => (
                            <li key={li}><a href="#" onClick={e => { e.preventDefault(); if (l === 'Auto') navTo('auto'); else if (l === 'Homeowners') navTo('home-ins'); }}>{l}</a></li>
                          ))}
                        </ul>
                        {col.viewAll && <a href="#" className="view-all" onClick={e => e.preventDefault()}>{col.viewAll}</a>}
                      </React.Fragment>
                    ) : col.sub ? (
                      col.sub.map((s, si) => (
                        <React.Fragment key={si}>
                          <h5>{s.heading}</h5>
                          {s.links.length > 0 && (
                            <ul>
                              {s.links.map((l, li) => (
                                <li key={li}><a href="#" onClick={e => e.preventDefault()}>{l}</a></li>
                              ))}
                            </ul>
                          )}
                        </React.Fragment>
                      ))
                    ) : null}
                  </div>
                ))}
              </div>
              <div className="mega-sidebar">
                {MEGA_MENU.sidebar.map((item, i) => (
                  <a href="#" key={i} onClick={e => {
                    e.preventDefault();
                    if (item.label === 'Claims') navTo('auto-claims');
                    else if (item.label === 'Auto ID Card') { closeMega(); /* handled by parent */ }
                  }}>
                    <span className="mega-icon">{item.icon}</span>
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </nav>
  );
}
